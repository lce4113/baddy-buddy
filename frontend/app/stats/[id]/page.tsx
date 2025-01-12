import React from 'react';

function StatsPage() {
  return (
    <div className="font-sans bg-gray-900 text-white min-h-screen p-5">
      <header className="text-center mb-10">
        <a href="/" className="absolute top-5 left-5 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
        ◀ Back
        </a>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Game Stats
        </h1>
        <p className="text-gray-400">In-depth Analytics for Your Game</p>
      </header>

      <main className="space-y-10">
        {/* Shot Heatmap Section */}
        <section className="bg-gray-800 p-6 rounded shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Shot Heatmap</h2>
          <p className="text-gray-400 mb-4">Visualize where you lost your points during the game.</p>
          <div className="bg-gray-700 h-64 flex items-center justify-center rounded">
            <span className="text-gray-500">[Heatmap Visualization Placeholder]</span>
          </div>
        </section>

        {/* Point Differential Section */}
        <section className="bg-gray-800 p-6 rounded shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Point Differential</h2>
          <p className="text-gray-400 mb-4">Track your winning and losing streaks.</p>
          <div className="bg-gray-700 h-64 flex items-center justify-center rounded">
            <span className="text-gray-500">[Point Differential Chart Placeholder]</span>
          </div>
        </section>

        {/* Shot Classifier Section */}
        <section className="bg-gray-800 p-6 rounded shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Shot Classifier</h2>
          <p className="text-gray-400 mb-4">Analyze the type of shots you played most frequently.</p>
          <div className="bg-gray-700 h-64 flex items-center justify-center rounded">
            <span className="text-gray-500">[Shot Classifier Visualization Placeholder]</span>
          </div>
        </section>

        {/* Movement Tracking Section */}
        <section className="bg-gray-800 p-6 rounded shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Movement Tracking</h2>
          <p className="text-gray-400 mb-4">Observe your movement patterns.</p>
          <div className="bg-gray-700 h-64 flex items-center justify-center rounded">
            <span className="text-gray-500">[Movement Tracking Visualization Placeholder]</span>
          </div>
        </section>

        <img
        src="/birdie-baddie.png"
        alt="Decorative Graphic"
        className="fixed bottom-5 right-5 w-20 h-20 object-contain max-w-xs transition duration-300 ease-in-out hover:scale-150"
        />
      </main>
    </div>
  );
}

export default StatsPage;