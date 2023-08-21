export default function createPosition(curPosition, boardSize) {
  let newPosition = Math.floor(Math.random() * boardSize ** 2);

  while (newPosition === curPosition) {
    newPosition = Math.floor(Math.random() * boardSize ** 2);
  }

  return newPosition;
}
