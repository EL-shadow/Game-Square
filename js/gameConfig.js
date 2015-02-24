/**
 * Created by EL.
 * Date: 16.10.12
 * Time: 13:39
 * Description: Configuration file to game Square
 */
var gameButtonsWidthCount = 20;
var gameButtonsHeightCount = 20;

var gameFieldWidth=500;
var gameFieldHeight=500;

//скругление углов квадратиков
/*
0 - без скругления
1 - скругление четверти
2 - максимальное скругление (делает круг из квадрата)
 */
var gameButtonsRounded=0;

//на чем рендерить
/*
0 - DOM
1 - Canvas
 */
var gameRenderMode=1;

var maxGameScore=100000;



//Не указывать больше 5 (canvas отобразит пустые поля)
var gameButtonsColourCount = 4;
