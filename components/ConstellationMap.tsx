'use client';

import { useMemo, useState } from "react";
import Link from "next/link";

type StoryNode = {
  id: string;
  title: string;
  note: string;
  x: number;
  y: number;
};

const generateNodes = () => {
  const seeds = [
    { id: "1", title: "East London Clinic", note: "My abortion saved my life." },
    { id: "2", title: "Cork storytellers", note: "Shared our ritual under the stars." },
    { id: "3", title: "Care collective", note: "We raised funds overnight." },
    { id: "4", title: "Midwife notes", note: "Planting seeds of care in Bristol." },
    { id: "5", title: "Mutual aid", note: "Left pills at the train station." },
  ];
  return seeds.map((seed, index) => ({
    ...seed,
    x: 80 + index * 160 + Math.random() * 40,
    y: 80 + (index % 2) * 120 + Math.random() * 80,
  }));
};

export default function ConstellationMap() {
  const [nodes, setNodes] = useState<StoryNode[]>(() => generateNodes());
  const connections = useMemo(() => {
    const edges: Array<[StoryNode, StoryNode]> = [];
    for (let i = 0; i < nodes.length; i += 1) {
      const next = nodes[(i + 1) % nodes.length];
      edges.push([nodes[i], next]);
      const skip = nodes[(i + 2) % nodes.length];
      edges.push([nodes[i], skip]);
    }
    return edges;
  }, [nodes]);
  const [activeNode, setActiveNode] = useState<StoryNode | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (node: StoryNode) => (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setDraggingId(node.id);
  };

  const handleDragMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!draggingId) return;
    const isTouch = "touches" in event;
    const clientX = isTouch ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const clientY = isTouch ? event.touches[0].clientY : (event as React.MouseEvent).clientY;
    const svgElement = document.querySelector("svg");
    if (!svgElement) return;
    const rect = svgElement.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setNodes((current) =>
      current.map((node) => (node.id === draggingId ? { ...node, x, y } : node)),
    );
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden rounded-none border border-white/30 bg-gradient-to-b from-pink-50 via-pink-100 to-rose-200">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 600"
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fdd0e8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
          </radialGradient>
        </defs>
        {connections.map(([start, end], index) => (
          <line
            key={`${start.id}-${end.id}-${index}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="#f9a8d4"
            strokeOpacity="0.35"
            strokeWidth={0.8}
          />
        ))}
        {nodes.map((node) => (
          <g
            key={node.id}
            onMouseEnter={() => setActiveNode(node)}
            onFocus={() => setActiveNode(node)}
            onMouseLeave={() => setActiveNode(null)}
            onMouseDown={handleDragStart(node)}
            onTouchStart={handleDragStart(node)}
            style={{ cursor: "grab" }}
          >
            <path
              d={`M ${node.x} ${node.y - 18} L ${node.x + 4} ${node.y - 4} L ${node.x + 18} ${node.y} L ${node.x + 4} ${node.y + 4} L ${node.x} ${node.y + 18} L ${node.x - 4} ${node.y + 4} L ${node.x - 18} ${node.y} L ${node.x - 4} ${node.y - 4} Z`}
              fill="url(#glow)"
            />
            <path
              d={`M ${node.x} ${node.y - 10} L ${node.x + 3} ${node.y} L ${node.x + 10} ${node.y} L ${node.x + 3} ${node.y + 3} L ${node.x} ${node.y + 10} L ${node.x - 3} ${node.y + 3} L ${node.x - 10} ${node.y} L ${node.x - 3} ${node.y}`}
              fill="#be185d"
            />
          </g>
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-sm uppercase tracking-[0.5em] text-rose-200">
            Constellations of care
          </h2>
          <p className="mt-2 text-lg text-rose-100">
            Hover over a star to read a story.
          </p>
        </div>
      </div>

      {activeNode && (
        <div className="pointer-events-auto absolute bottom-6 left-1/2 w-80 -translate-x-1/2 rounded-3xl border border-rose-200 bg-white/95 p-4 text-rose-700 shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-400">
            {activeNode.title}
          </p>
          <p className="mt-2 font-serif text-lg text-rose-800">{activeNode.note}</p>
          <div className="mt-3 text-right">
            <Link href="/archiving-abortion" className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-600">
              Read more
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
