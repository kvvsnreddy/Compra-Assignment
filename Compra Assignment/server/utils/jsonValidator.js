export function validateLayout(layout) {
  if (!layout) throw new Error('Layout root payload missing.');
  if (!Array.isArray(layout.rootNodes)) throw new Error('Root structure node list array mismatch.');
  if (typeof layout.nodes !== 'object' || layout.nodes === null) throw new Error('Node list must be a key-value object structural mapping.');
  
  for (const id of layout.rootNodes) {
    if (!layout.nodes[id]) throw new Error(`Target root node descriptor ID reference "${id}" missing.`);
  }
  return true;
}
