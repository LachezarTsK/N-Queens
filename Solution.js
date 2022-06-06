
/**
 * @param {number} boardSize
 * @return {string[][]}
 */
var solveNQueens = function (boardSize) {
    this.QUEEN = 'Q';
    this.EMPTY_POSITION = '.';
    this.boardSize = boardSize;
    this.uniqueConfigurations = [];

    const board = Array.from(new Array(boardSize), () => new Array(boardSize).fill(this.EMPTY_POSITION));
    const column = new Array(boardSize).fill(false);
    const diagonalOne = new Array(2 * boardSize).fill(false);
    const diagonalTwo = new Array(2 * boardSize).fill(false);

    findUniqueConfigurations(0, board, column, diagonalOne, diagonalTwo);
    return this.uniqueConfigurations;
};


/**
 * @param {number} row
 * @param {character[][]} board 
 * @param {boolean[]} column 
 * @param {boolean[]} diagonalOne 
 * @param {boolean[]} diagonalTwo 
 * @return {void}
 */
function findUniqueConfigurations(row, board, column, diagonalOne, diagonalTwo) {
    if (row === this.boardSize) {
        addUniqueConfiguration(board);
        return;
    }

    for (let c = 0; c < this.boardSize; ++c) {
        let positionDiagonalOne = row + c;
        let positionDiagonalTwo = this.boardSize + row - c;
        if (column[c] || diagonalOne[positionDiagonalOne] || diagonalTwo[positionDiagonalTwo]) {
            continue;
        }

        column[c] = true;
        diagonalOne[positionDiagonalOne] = true;
        diagonalTwo[positionDiagonalTwo] = true;
        board[row][c] = this.QUEEN;

        findUniqueConfigurations(row + 1, board, column, diagonalOne, diagonalTwo);

        column[c] = false;
        diagonalOne[positionDiagonalOne] = false;
        diagonalTwo[positionDiagonalTwo] = false;
        board[row][c] = this.EMPTY_POSITION;
    }
}

/**
 * @param {character[][]} board 
 * @return {void}
 */
function addUniqueConfiguration(board) {
    const currentConfiguration = [];
    for (let r = 0; r < this.boardSize; ++r) {
        currentConfiguration.push(board[r].join(''));
    }
    this.uniqueConfigurations.push(currentConfiguration);
}
