class TicTacToe {
  constructor() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.cells = [];
    this.createUI();
  }

  createUI() {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(3, 100px)';
    container.style.gridTemplateRows = 'repeat(3, 100px)';
    container.style.gap = '5px';
    document.body.appendChild(container);

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.style.width = '100px';
      cell.style.height = '100px';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.fontSize = '2em';
      cell.style.border = '1px solid black';
      cell.style.cursor = 'pointer';
      cell.dataset.index = i.toString();
      cell.addEventListener('click', () => this.makeMove(i));
      container.appendChild(cell);
      this.cells.push(cell);
    }
  }

  makeMove(index) {
    if (!this.isValidMove(index)) {
      return;
    }
    this.board[index] = this.currentPlayer;
    this.cells[index].textContent = this.currentPlayer;
    if (this.checkWinner()) {
      alert(`Player ${this.currentPlayer} wins!`);
      this.resetGame();
    } else if (this.board.every((cell) => cell !== null)) {
      alert("It's a draw!");
      this.resetGame();
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  isValidMove(index) {
    return index >= 0 && index < 9 && this.board[index] === null;
  }

  checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [i, j, k] of winningCombinations) {
      if (
        this.board[i] !== null &&
        this.board[i] === this.board[j] &&
        this.board[i] === this.board[k]
      ) {
        return true;
      }
    }
    return false;
  }

  resetGame() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.cells.forEach((cell) => (cell.textContent = ''));
  }
}

window.onload = () => {
  new TicTacToe();
};