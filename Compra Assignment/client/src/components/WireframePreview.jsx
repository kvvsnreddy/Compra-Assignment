import React from 'react';

export default function WireframePreview({ layout }) {
  const rootId = layout?.rootNodes?.[0];
  const artboard = layout?.nodes?.[rootId];

  if (!artboard) return <div className="p-4 text-center text-gray-400">No active design artboard found.</div>;

  const canvasAspectRatio = artboard.height / artboard.width;

  const nodeColorPalette = (type) => {
    const maps = {
      image: 'rgba(59, 130, 246, 0.25) border border-blue-400 text-blue-700',
      text: 'rgba(245, 158, 11, 0.25) border border-amber-400 text-amber-800 font-semibold',
      shape: 'rgba(239, 68, 68, 0.25) border border-red-400 text-red-700',
    };
    return maps[type] || 'bg-gray-100 border border-gray-300';
  };

  return (
    <div className="w-full flex justify-center items-center p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
      <div
        className="relative w-full max-w-md transition-all duration-300 overflow-hidden rounded shadow-lg shadow-gray-300"
        style={{
          paddingBottom: `${canvasAspectRatio * 100}%`,
          backgroundColor: artboard.data?.backgroundColor || '#ffffff',
        }}
      >
        {artboard.children.map((id) => {
          const node = layout.nodes[id];
          if (!node) return null;
          return (
            <div
              key={id}
              className={`absolute flex flex-col justify-center items-center text-center p-1 overflow-hidden transition-all duration-300 ${nodeColorPalette(node.type)}`}
              style={{
                left: `${node.nx * 100}%`,
                top: `${node.ny * 100}%`,
                width: `${node.nw * 100}%`,
                height: `${node.nh * 100}%`,
                fontSize: node.style?.fontSize ? `${Math.max(node.style.fontSize * 0.25, 9)}px` : '11px',
              }}
            >
              <span className="text-[9px] uppercase tracking-wider opacity-60 block">{node.name}</span>
              <p className="truncate w-full max-w-full px-1">{node.data?.content || node.data?.url || ''}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
