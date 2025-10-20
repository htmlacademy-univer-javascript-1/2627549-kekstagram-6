export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}
