export function resizeArtboard(layout, newWidth, newHeight) {
  const updated = structuredClone(layout);
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];
  
  artboard.width = newWidth;
  artboard.height = newHeight;

  // Recompute every child's absolute dimensions via its normalized scale factors
  artboard.children.forEach((childId) => {
    const node = updated.nodes[childId];
    node.x = Math.round(node.nx * newWidth);
    node.y = Math.round(node.ny * newHeight);
    node.width = Math.round(node.nw * newWidth);
    node.height = Math.round(node.nh * newHeight);
  });

  return updated;
}
