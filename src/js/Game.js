import createPosition from './position';

export default class Game {
  constructor() {
    this.cells = [];
    this.boardSize = 4;
    this.board = null;
    this.position = null;

    this.drawGoblin = this.drawGoblin.bind(this);
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
    this.init();
  }

  init() {
    this.drawBoard();
    this.drawGoblin();
  }

  drawBoard() {
    const board = document.createElement('div');
    board.classList.add('game-board');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('game-board-cell');
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
      this.cells.push(cellEl);
      board.append(cellEl);
    }
    this.container.append(board);
    this.board = board;
  }

  drawGoblin() {
    if (this.goblin) {
      this.goblin.remove();
    }

    const goblin = document.createElement('img');
    goblin.classList.add('game-goblin');

    const goblinPosition = createPosition(this.goblinPosition, this.boardSize);
    this.goblinPosition = goblinPosition;
    this.goblin = goblin;
    this.cells[goblinPosition].append(goblin);

    this.timer = setTimeout(() => {
      this.fail += 1;
      if (this.fail >= 5) {
        this.showGameOver();
        this.fail = 0;
        clearTimeout(this.timer);
      } else {
        this.drawGoblin();
      }
    }, 1000);
  }
}
