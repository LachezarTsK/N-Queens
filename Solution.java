
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {

    private static final char QUEEN = 'Q';
    private static final char EMPTY_POSITION = '.';
    private int boardSize;
    private List<List<String>> uniqueConfigurations;

    public List<List<String>> solveNQueens(int boardSize) {
        this.boardSize = boardSize;
        char[][] board = new char[boardSize][boardSize];
        for (int r = 0; r < boardSize; ++r) {
            Arrays.fill(board[r], EMPTY_POSITION);
        }

        boolean[] column = new boolean[boardSize];
        boolean[] diagonalOne = new boolean[2 * boardSize];
        boolean[] diagonalTwo = new boolean[2 * boardSize];

        uniqueConfigurations = new ArrayList<>();
        findUniqueConfigurations(0, board, column, diagonalOne, diagonalTwo);
        return uniqueConfigurations;
    }

    public void findUniqueConfigurations(int row, char[][] board, boolean[] column, boolean[] diagonalOne, boolean[] diagonalTwo) {
        if (row == boardSize) {
            addUniqueConfiguration(board);
            return;
        }

        for (int c = 0; c < boardSize; ++c) {
            int positionDiagonalOne = row + c;
            int positionDiagonalTwo = boardSize + row - c;
            if (column[c] || diagonalOne[positionDiagonalOne] || diagonalTwo[positionDiagonalTwo]) {
                continue;
            }

            column[c] = true;
            diagonalOne[positionDiagonalOne] = true;
            diagonalTwo[positionDiagonalTwo] = true;
            board[row][c] = QUEEN;

            findUniqueConfigurations(row + 1, board, column, diagonalOne, diagonalTwo);

            column[c] = false;
            diagonalOne[positionDiagonalOne] = false;
            diagonalTwo[positionDiagonalTwo] = false;
            board[row][c] = EMPTY_POSITION;
        }
    }

    private void addUniqueConfiguration(char[][] board) {
        List<String> currentConfiguration = new ArrayList<>();
        for (int r = 0; r < boardSize; ++r) {
            currentConfiguration.add(String.valueOf(board[r]));
        }
        uniqueConfigurations.add(currentConfiguration);
    }
}
