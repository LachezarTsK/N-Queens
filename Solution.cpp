
#include <string>
#include <vector>
using namespace std;

class Solution {
    
    inline static const char QUEEN = 'Q';
    inline static const char EMPTY_POSITION = '.';
    size_t boardSize;
    vector<vector<string>> uniqueConfigurations;

public:
    vector<vector<string>> solveNQueens(int boardSize) {
        this->boardSize = boardSize;
        vector<string> board(boardSize, string(boardSize, EMPTY_POSITION));
        vector<bool> column(boardSize);
        vector<bool> diagonalOne(2 * boardSize);
        vector<bool> diagonalTwo(2 * boardSize);

        findUniqueConfigurations(0, board, column, diagonalOne, diagonalTwo);
        return uniqueConfigurations;
    }

private:
    void findUniqueConfigurations(int row, vector<string>& board, vector<bool>& column, vector<bool>& diagonalOne, vector<bool>& diagonalTwo) {
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

    void addUniqueConfiguration(const vector<string>& board) {
        vector<string> currentConfiguration;
        for (int r = 0; r < boardSize; ++r) {
            currentConfiguration.push_back(board[r]);
        }
        uniqueConfigurations.push_back(currentConfiguration);
    }
};
