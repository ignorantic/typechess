export function rect(id) {
  const {
    left, top, right, width,
  } = document.getElementById(id).getBoundingClientRect();
  const size = width || right - left;
  return { left, top, size };
}

export function convCoord(id, flip, x, y) {
  const { left, top, size } = rect(id);
  const file = flip
    ? Math.floor((size - (x - left)) / (size / 8))
    : Math.floor((x - left) / (size / 8));
  const rank = flip
    ? Math.floor((y - top) / (size / 8))
    : Math.floor((size - (y - top)) / (size / 8));
  return { file, rank };
}
