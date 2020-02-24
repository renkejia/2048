var board = new Array();
var score = 0;
var hasCollide = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
$(document).ready(function () {
    //为移动端做准备工作
    prepareForMoble();
    newGame();
});

function prepareForMoble() {

    if (documentWidth > 500) {
        boardContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    // 一个cellSpace(格子的间距)为4%,因为容器的宽度占screen的8%,
    $('#board-container').css('width', boardContainerWidth - 2 * cellSpace);
    // 正方形所以高度同理
    $('#board-container').css('height', boardContainerWidth - 2 * cellSpace);
    $('#board-container').css('padding', cellSpace);
    $('#board-container').css('border-radius', 0.02 * boardContainerWidth);

    $('.board__cell').css('width', cellSideLength);
    $('.board__cell').css('height', cellSideLength);
    $('.board__cell').css('border-radius', 0.02 * cellSideLength);
}

function newGame() {
    //初始化
    init();
    createOneNumber();
    createOneNumber();
    updataBoardView();
}

function init() {
    //初始化棋盘
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            var boardCell = $('#board__cell-' + row + '-' + col);
            boardCell.css('top', getPosTop(row, col));
            boardCell.css('left', getPosLeft(row, col));
        }
    }
    //初始化棋盘内容(数字)
    for (var row = 0; row < 4; row++) {
        board[row] = new Array();
        hasCollide[row] = new Array();
        for (var col = 0; col < 4; col++) {
            board[row][col] = 0;
            hasCollide[row][col] = false;
        }
    }
    updataBoardView();
}
function updataBoardView() {
    //添加数字容器
    $('.board__cell__number').remove();
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            $('#board-container').append('<div class="board__cell__number" id="board__cell__number-' + row + '-' + col + '"></div>');
            var theNumberCell = $('#board__cell__number-' + row + '-' + col);
            if (board[row][col] == 0) {
                theNumberCell.css("width", 0);
                theNumberCell.css("height", 0);
                theNumberCell.css("top", getPosTop(row, col) + cellSideLength / 2);
                theNumberCell.css("left", getPosLeft(row, col) + cellSideLength / 2);
            } else {
                theNumberCell.css("width", cellSideLength);
                theNumberCell.css("height", cellSideLength);
                theNumberCell.css('background-color', getNumberBackgroundColor(board[row][col]));
                theNumberCell.css('color', getNumberColor(board[row][col]));
                theNumberCell.css("top", getPosTop(row, col));
                theNumberCell.css("left", getPosLeft(row, col));
                theNumberCell.text(board[row][col]);
            }
            hasCollide[row][col] = false;
        }
    }
    $('.board__cell__number').css('line-height', cellSideLength + 'px');
    $('.board__cell__number').css('font-size', 0.6 * cellSideLength + 'px');
}
//添加随机数
function createOneNumber() {
    if (noSpace(board)) return false;
    //随机坐标
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));
    console.log('randX=' + randX + '  randY=' + randY);
    while (true) {
        if (board[randX][randY] == 0) {
            break;
        }
        randX = Math.floor(Math.random() * 4);
        randY = Math.floor(Math.random() * 4);
    }
    // console.log('randX='+randX+' randY='+randY);
    //随机数
    var randomNumber = Math.random() < 0.5 ? 2 : 4;
    board[randX][randY] = randomNumber;
    showCreateNumberAnimation(randX, randY, randomNumber);
    return true;
}

$(document).keydown(function (event) {

    switch (event.keyCode) {
        case 37:
            event.preventDefault();
            if (moveLeft(board)) {
                setTimeout(createOneNumber(), 210);
                setTimeout(isGameover(), 300);
            }
            break;
        case 38:
            event.preventDefault();
            if (moveUp(board)) {
                setTimeout(createOneNumber(), 210);
                setTimeout(isGameover(), 300);
            }
            break;
        case 39:
            event.preventDefault();
            if (moveRight(board)) {
                setTimeout(createOneNumber(), 210);
                setTimeout(isGameover(), 300);
            }
            break;
        case 40:
            if (moveDown(board)) {
                event.preventDefault();
                setTimeout(createOneNumber(), 210);
                setTimeout(isGameover(), 300);
            }
            break;
        default:
            break;
    }
})

document.addEventListener('touchstart', function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend', function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    var valueX = endx - startx;
    var valueY = endy - starty;
    //防止设别将点击事件当作滑动事件处理
    if(Math.abs(valueX) < 0.3*documentWidth && Math.abs(valueY) < 0.3*this.documentElement){
        return;
    }
    //x轴方向移动
    if (Math.abs(valueX) >= Math.abs(valueY)) {
        if (valueX > 0) {
            //右
            if (moveRight(board)) {
                setTimeout(createOneNumber(), 210);
                setTimeout(isGameover(), 300);
            }
        } else {
            //左
            if (moveLeft(board)) {
                setTimeout(createOneNumber(), 210);
                setTimeout(isGameover(), 300);
            }
        }

    } else {
        //在屏幕坐标中Y轴是向下的
        if (valueY > 0) {
            //down
            if (moveDown(board)) {
                setTimeout(createOneNumber(), 210);
                setTimeout(isGameover(), 300);
            }
        } else {
            //down
            if (moveUp(board)) {
                setTimeout(createOneNumber(), 210);
                setTimeout(isGameover(), 300);
            }
        }
    }
});

function isGameover() {
    if (noSpace(board) && noMove(board)) {
        console.log('aaaaa');
        gameover();
    }
}
function gameover() {
    setTimeout(
        alert('GameOver!'),
        300)
}
//能否向左移
function moveLeft() {
    if (!canMoveLeft(board))
        return false;

    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            if (board[row][col] != 0) {

                for (var k = 0; k < col; k++) {
                    if (board[row][k] == 0 && noBlockHorizontal(row, k, col, board)) {
                        showMoveAnimation(row, col, row, k);
                        board[row][k] = board[row][col];
                        board[row][col] = 0;
                        continue;
                    }
                    else if (board[row][k] == board[row][col] && noBlockHorizontal(row, k, col, board) && !hasCollide[row][k]) {
                        showMoveAnimation(row, col, row, k);
                        board[row][k] += board[row][col];
                        score += board[row][k];
                        updataScore(score);
                        hasCollide[row][k] = true;
                        board[row][col] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updataBoardView(), 200);
    return true;
}


function moveRight() {
    if (!canMoveRight(board))
        return false;

    //moveRight
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {

                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasCollide[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] *= 2;
                        score += board[i][k];
                        updataScore(score);
                        hasCollide[i][k] = true;
                        board[i][j] = 0;

                        continue;
                    }
                }
            }
        }
    setTimeout(updataBoardView(), 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board))
        return false;
    for (var col = 0; col < 4; col++) {
        for (var row = 1; row < 4; row++) {
            if (board[row][col] != 0) {
                for (var k = 0; k < row; k++) {

                    if (board[k][col] == 0 && noBlockLine(col, k, row, board)) {
                        showMoveAnimation(row, col, k, col);
                        board[k][col] = board[row][col];
                        board[row][col] = 0;
                        continue;
                    } else if (board[row][col] == board[k][col] && noBlockLine(col, k, row, board) && !hasCollide[k][col]) {
                        showMoveAnimation(row, col, k, col);
                        board[k][col] *= 2;
                        score += board[k][col];
                        updataScore(score);
                        hasCollide[k][col] = true;
                        board[row][col] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updataBoardView(), 200);
    return true;
}


function moveDown() {
    if (!canMoveDown(board))
        return false;
    for (var col = 0; col < 4; col++) {
        for (var row = 2; row >= 0; row--) {
            if (board[row][col] != 0) {
                for (var k = 3; k > row; k--) {

                    if (board[k][col] == 0 && noBlockLine(col, row, k, board)) {
                        showMoveAnimation(row, col, k, col);
                        board[k][col] = board[row][col];
                        board[row][col] = 0;
                        continue;
                    } else if (board[row][col] == board[k][col] && noBlockLine(col, row, k, board) && !hasCollide[k][col]) {
                        showMoveAnimation(row, col, k, col);
                        //add
                        board[k][col] *= 2;
                        //score
                        score += board[k][col];
                        updataScore(score);
                        hasCollide[k][col] = true;
                        board[row][col] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updataBoardView(), 200);
    return true;
}
