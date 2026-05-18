import React, { useState } from 'react';
import { useLayoutAgent } from './hooks/useLayoutAgent';
import WireframePreview from './components/WireframePreview';

export default function App() {
  const { layout, messages, loading, sendMessage } = useLayoutAgent();
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 text-gray-800 font-sans overflow-hidden">
      {/* Left Interface Layer: Conversational Control */}
      <div className="w-1/3 flex flex-col border-r border-gray-200 bg-white shadow-xl z-10">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h1 className="font-bold text-lg">Layout Intelligence Engine</h1>
          <p className="text-xs opacity-80">Transform blueprints using natural language strings</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.length === 0 && (
            <div className="text-sm text-gray-400 text-center py-8">
              Try instructing the assistant: <br />
              <span className="italic block mt-2 text-indigo-500 font-medium">"Convert this design to 9:16 and move the headline to the top"</span>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 text-gray-400 rounded-2xl px-4 py-2 text-sm animate-pulse">
                Computing transformation changes...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type design transformation instructions..."
            disabled={loading}
            className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>

      {/* Right Interface Layer: Output Blueprint & Visualization Canvas */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4">
          <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Live Wireframe Engine</h2>
          <WireframePreview layout={layout} />
        </div>
        
        <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 bg-gray-900 flex flex-col overflow-hidden text-gray-300 font-mono text-xs">
          <div className="p-3 border-b border-gray-800 bg-gray-950 flex justify-between items-center text-gray-400">
            <span>JSON State Matrix</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-emerald-400 border border-gray-700">Reactive Data Tree</span>
          </div>
          <pre className="flex-1 overflow-auto p-4 select-all leading-relaxed whitespace-pre-wrap selection:bg-indigo-500 selection:text-white">
            {JSON.stringify(layout, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
