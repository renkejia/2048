function showCreateNumberAnimation(randX,randY,randomNumber){
    var numberCell = $('#board__cell__number-'+randX+'-'+randY);
    numberCell.css('background-color', getNumberBackgroundColor(randomNumber));
    numberCell.css('color', getNumberColor(randomNumber));
    numberCell.text(randomNumber);
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(randX, randY),
        left:getPosLeft(randX, randY),
    },50);
};

function showMoveAnimation(fromX,fromY,toX,toY){
    var number = $('#board__cell__number-'+fromX+'-'+fromY);
    number.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY),
    },200);
};
function updataScore(score){
    $('.header__score__number').text(score);
};