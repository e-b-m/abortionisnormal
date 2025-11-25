// app/page.tsx

// 1. IMPORT the wrapper component at the top of the file
import MapWrapper from '../components/MapWrapper'; 

// 2. Define and EXPORT the main component
export default function Home() {
  return (
    // 3. The JSX/HTML starts here
    <main className="min-h-screen p-8">
      {/* Project Title */}
      <h1 className="text-4xl font-bold mb-4">🏳️‍🌈 Queering the Map Project</h1>
      <p className="text-lg text-gray-600 mb-8">
        Share your story by clicking on the map!
      </p>
      
      {/* This is where the map component renders */}
      <MapWrapper /> 

    </main>
    // 4. The JSX/HTML ends here
  );
}