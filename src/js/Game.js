export default class Game {
  constructor() {
    this.cells = null;
    this.boardSize = 4;
    this.board = null;
    this.position = null;

    this.createGoblin = this.createGoblin.bind(this);
    this.createPosition = this.createPosition.bind(this);
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
    this.init();
  }

  init() {
    this.createField();
    this.createGoblin();
  }

  createField() {
    const board = document.createElement('div');
    board.classList.add('game-board');
    this.container.append(board);
    this.board = board;

    for (let i = 0; i < this.boardSize; i += 1) {
      const row = document.createElement('div');
      row.classList.add('board-row');
      for (let j = 0; j < this.boardSize; j += 1) {
        const field = document.createElement('div');
        field.classList.add('board-cell');
        row.append(field);
      }
      board.append(row);
    }
    this.container.append(board);
  }

  createGoblin() {
    const goblin = document.createElement('img');
    goblin.classList.add('game-goblin');
    let position = this.createPosition();
    this.goblin = goblin;
    this.board.children[position.row].children[position.column].append(goblin);

    setInterval(() => {
      this.removeGoblin();
      position = this.createPosition();
      this.goblin = goblin;
      this.position = position;
      this.board.children[position.row].children[position.column].append(goblin);
    }, 1000);
  }

  * generatePosition() {
    while (true) {
      const row = Math.floor(Math.random() * this.boardSize);
      const column = Math.floor(Math.random() * this.boardSize);
      const id = `${row}${column}`;

      yield { row, column, id };
    }
  }

  createPosition() {
    const iterator = this.generatePosition();
    let newPosition = iterator.next().value;

    if (!this.position) {
      return newPosition;
    }

    while (newPosition.id === this.position.id) {
      newPosition = iterator.next().value;
    }

    return newPosition;
  }

  removeGoblin() {
    this.goblin.remove();
  }
}
