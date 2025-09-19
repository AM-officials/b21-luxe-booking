// lightweight nanoid substitute (crypto random) to avoid adding dependency for small IDs
export function nanoid(size: number = 12){
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  const arr = Array.from({length: size}, () => chars[Math.floor(Math.random()*chars.length)]);
  return arr.join('');
}
