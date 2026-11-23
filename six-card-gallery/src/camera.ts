import samples from './camera.json';

const sampleInterval = 3;

function sampleAt(index: number) {
  return samples[Math.max(0, Math.min(index, samples.length - 1))];
}

export function cameraTransform(frame: number) {
  const sample = frame / sampleInterval;
  const index = Math.floor(sample);
  const fraction = sample - index;
  // Smooth the pixel quantization in the measured corner positions.
  const filtered = (position: number, axis: number) =>
    (sampleAt(position - 1)[axis] + 2 * sampleAt(position)[axis] + sampleAt(position + 1)[axis]) / 4;
  const [a, c, x, b, d, y] = sampleAt(index).map((_, axis) =>
    filtered(index, axis) * (1 - fraction) + filtered(index + 1, axis) * fraction,
  );
  return `matrix(${2 * a}, ${2 * b}, ${2 * c}, ${2 * d}, ${2 * x}, ${2 * y})`;
}
