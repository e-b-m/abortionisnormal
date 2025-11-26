import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

type MediaPayload = {
  name: string;
  type: string;
  url: string; // base64 data URL from client
};

const sanitizeBuffer = (file: MediaPayload) => {
  if (!file.url?.includes(",")) return null;
  const [, base64Data] = file.url.split(",");
  return Buffer.from(base64Data, "base64");
};

const uploadMediaFiles = async (
  media: MediaPayload[],
  supabase: ReturnType<typeof createSupabaseServerClient>,
) => {
  const uploadedMedia = [] as Array<{ name: string; type: string; url: string }>;
  for (const file of media) {
    const buffer = sanitizeBuffer(file);
    if (!buffer) continue;
    const objectPath = `entries/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("archive-media")
      .upload(objectPath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });
    if (uploadError) {
      throw uploadError;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("archive-media").getPublicUrl(objectPath);
    uploadedMedia.push({ name: file.name, type: file.type, url: publicUrl });
  }
  return uploadedMedia;
};

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("archive_entries")
      .select("id, title, type, description, meta, href, media, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return NextResponse.json({ entries: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, type, description, meta, href, media = [] } = body as {
      title: string;
      type: string;
      description: string;
      meta: string;
      href?: string;
      media?: MediaPayload[];
    };

    if (!title || !description || !meta) {
      return NextResponse.json(
        { error: "Title, description, and context are required." },
        { status: 400 },
      );
    }

    const supabase = createSupabaseServerClient();

    const uploadedMedia = await uploadMediaFiles(media, supabase);

    const { error: insertError } = await supabase.from("archive_entries").insert({
      title,
      type,
      description,
      meta,
      href,
      media: uploadedMedia,
    });
    if (insertError) {
      throw insertError;
    }

    const { data: entries, error: fetchError } = await supabase
      .from("archive_entries")
      .select("id, title, type, description, meta, href, media, created_at")
      .order("created_at", { ascending: false });
    if (fetchError) {
      throw fetchError;
    }

    return NextResponse.json({ entries });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, title, type, description, meta, href, media = [], removeMediaKeys = [] } =
      body as {
        id: string;
        title?: string;
        type?: string;
        description?: string;
        meta?: string;
        href?: string;
        media?: MediaPayload[];
        removeMediaKeys?: string[];
      };

    if (!id) {
      return NextResponse.json({ error: "Entry id is required." }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();
    const { data: existingEntries, error: fetchError } = await supabase
      .from("archive_entries")
      .select("id, media")
      .eq("id", id)
      .limit(1);
    if (fetchError || !existingEntries?.length) {
      throw fetchError ?? new Error("Entry not found");
    }

    const existingMedia = (existingEntries[0].media ?? []) as Array<{
      name: string;
      type: string;
      url: string;
    }>;
    const retainedMedia = existingMedia.filter(
      (item) => !removeMediaKeys.includes(item.url),
    );
    const uploadedMedia = await uploadMediaFiles(media, supabase);
    const mediaPayload = [...uploadedMedia, ...retainedMedia];

    const updatePayload: Record<string, unknown> = { media: mediaPayload };
    if (title !== undefined) updatePayload.title = title;
    if (type !== undefined) updatePayload.type = type;
    if (description !== undefined) updatePayload.description = description;
    if (meta !== undefined) updatePayload.meta = meta;
    if (href !== undefined) updatePayload.href = href;

    const { error: updateError } = await supabase
      .from("archive_entries")
      .update(updatePayload)
      .eq("id", id);
    if (updateError) {
      throw updateError;
    }

    // Remove deleted media from storage
    for (const mediaUrl of removeMediaKeys) {
      const [, path] = mediaUrl.split("/storage/v1/object/public/archive-media/");
      if (path) {
        await supabase.storage.from("archive-media").remove([path]);
      }
    }

    const { data: entries, error: refreshError } = await supabase
      .from("archive_entries")
      .select("id, title, type, description, meta, href, media, created_at")
      .order("created_at", { ascending: false });
    if (refreshError) throw refreshError;

    return NextResponse.json({ entries });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = (await request.json()) as { id: string };
    if (!id) {
      return NextResponse.json({ error: "Entry id is required." }, { status: 400 });
    }
    const supabase = createSupabaseServerClient();
    const { data: existingEntries } = await supabase
      .from("archive_entries")
      .select("media")
      .eq("id", id)
      .limit(1);
    const mediaList = (existingEntries?.[0]?.media ?? []) as Array<{
      name: string;
      type: string;
      url: string;
    }>;
    const deleteTargets = mediaList
      .map((entry) => entry.url.split("/storage/v1/object/public/archive-media/")[1])
      .filter(Boolean);
    if (deleteTargets.length) {
      await supabase.storage.from("archive-media").remove(deleteTargets as string[]);
    }
    const { error: deleteError } = await supabase
      .from("archive_entries")
      .delete()
      .eq("id", id);
    if (deleteError) throw deleteError;
    const { data: entries, error: refreshError } = await supabase
      .from("archive_entries")
      .select("id, title, type, description, meta, href, media, created_at")
      .order("created_at", { ascending: false });
    if (refreshError) throw refreshError;
    return NextResponse.json({ entries });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
