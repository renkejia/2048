//获取屏幕大小
documentWidth = window.screen.availWidth;
//设置显示容器大小
boardContainerWidth = 0.92 * documentWidth;
//每一个小格子的宽度
cellSideLength = 0.18 * documentWidth;
//每个小格子的间距
cellSpace = 0.04 * documentWidth;

function getPosTop(row, col) {
    return cellSpace + row * (cellSideLength + cellSpace);
}
function getPosLeft(row, col) {
    return cellSpace + col * (cellSideLength + cellSpace);
}
var color = {
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b174",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#9c0",
    1024: "#33b5e5",
    2048: "#09c",
    4096: "#a6c",
    8192: "#93c",
}
function getNumberBackgroundColor(number) {
    return color[number];
}
function getNumberColor(number) {
    if (number <= 4) {
        return '#776e65';
    }
    return 'white';
}
function noSpace() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}


function canMoveLeft(board) {
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            // 当前格子有数字
            if (board[row][col] != 0) {
                // 左边没有数字或者与左边数字相等
                if (board[row][col - 1] == board[row][col] || board[row][col - 1] == 0) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveRight(board) {
    for (var row = 0; row < 4; row++) {
        for (var col = 2; col >= 0; col--) {
            // 当前格子有数字
            if (board[row][col] != 0) {
                // 右边没有数字或者与左边数字相等
                if (board[row][col + 1] == board[row][col] || board[row][col + 1] == 0) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveUp(board) {
    for (var col = 0; col < 4; col++) {
        for (var row = 1; row < 4; row++) {
            if (board[row][col] != 0) {
                if (board[row][col] == board[row - 1][col] || board[row - 1][col] == 0) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveDown(board) {
    for (var col = 0; col < 4; col++) {
        for (var row = 2; row >= 0; row--) {
            if (board[row][col] != 0) {
                if (board[row][col] == board[row + 1][col] || board[row + 1][col] == 0)
                    return true;
            }
        }
    }
    return false;
}
function noBlockHorizontal(row, k, col, board) {
    for (var i = k + 1; i < col; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}
function noBlockLine(col, k, row, board) {
    for (var i = k + 1; i < row; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

function noMove(board) {
    if (canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)) {
        return false;
    }
    return true;
}