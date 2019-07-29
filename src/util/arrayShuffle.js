export default function arrayShuffle(array) {
  const [shuffle, dup] = [[], Array.from(array)];
  while(dup.length > 0) {
    const randN = Math.floor(Math.random() * Math.floor(dup.length));
    shuffle.push(dup.splice(randN, 1)[0]);
  }
  return shuffle;
}