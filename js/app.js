var ticTacToe = function(){

//set variables    
var setPlayer1 = []; //array of stones placed by player 1
var setPlayer2 = []; //array of stones placed by player 2
var victory = false;
var playerWin, playerName, playerName2;    
var turn = 0;

//inject start page into html
var opening = '<div class="screen screen-start" id="start">';
opening +=  '<header> <h1>Tic Tac Toe</h1> <form>';
opening +=  '<input type="text" name="pname1" id="pName" placeholder="Enter Player O">';
opening +=  '<input type="text" name="pname2" id="pName2" placeholder="Enter Player X">';
opening +=  '</form> <a href="#" class="button">Start game</a> </header> </div>';

//inject winner page into HTML
function injectWinner(){
var winner = '<div class="screen" id="finish">';
winner +=  '<header> <h1>Tic Tac Toe</h1> <p class="message"></p> <a href="#" class="button">New game</a> </header></div>';
$(winner).insertAfter(".board");
$(".screen").addClass(playerWin);
}

//inject tie page into HTML
function injectTie(){
var tie = '<div class="screen screen-tie" id="tie">';
tie +=  '<header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">Start game</a></header></div>';
$(tie).insertAfter(".board");
}

//show start page and hide board
window.onload=function(){
$(".board").css("display","none");
$(opening).insertAfter(".board");
}

//on button click hide start page and show board/OR restart game after previous one has ended
$(document).on("click",".button", function(){
     
    if($("#pName").val() !== undefined){ //append name of Player O to box on top left
        playerName = $("#pName").val();
        $("head").append('<style>#player1::before {content: "' + playerName + '"}</style>');
    };
    
    if($("#pName2").val() !== undefined){ //append name of Player X to box on top right
        playerName2 = $("#pName2").val();
        $("head").append('<style>#player2::before {content: "' + playerName2 + '"}</style>');
    };
    
    $("#start").remove();
    $(".screen-win-one").remove();
    $(".screen-win-two").remove();
    $(".screen-tie").remove();
    $(".board").css("display","block");
    $("#player1").addClass("active");
    
    //reset game board
    turn = 0;
    setPlayer1 = [];
    setPlayer2 = [];
    victory = false;
    $("li").removeClass("box-filled-1").css('background-image', 'none');
    $("li").removeClass("box-filled-2").css('background-image', 'none');
    
    //start new game
    player1();
     });

//Add one dimensional grid coordinates:
var grid = [11, 12, 13, 21, 22, 23, 31, 32, 33];
for (var i = 0;i <9;i++){
    $(".box").slice(i).attr("id",grid[i]);
}

//Player One gameplay functionality
var player1 = function(){

//Show o when hovering over empty field
if ($("#player1").hasClass("active")){
$(document).on("mouseover",".box", function(){
    if(!($(this).hasClass("box-filled-2"))&&!($(this).hasClass("box-filled-1"))){
    $(this).css('background-image', 'url(img/o.svg)');
    }});

$(document).on("mouseout",".box", function(){
    if(!($(this).hasClass("box-filled-2"))&&!($(this).hasClass("box-filled-1"))){
    $(this).css('background-image', 'none');   
    }});

}
    
//Selecting a field to place the "x", check victory conditions and either declare winner, tie or handover to player 1
$(document).on("click",".box", function(){
    if(!($(this).hasClass("box-filled-2"))&&!($(this).hasClass("box-filled-1"))){
        $(this).addClass("box-filled-1");
    $(document).off("mouseover",".box");
    $(document).off("click",".box");
    $("#player1").removeClass("active");
    $("#player2").addClass("active");
    setPlayer1.push($(this).attr("id"));
    turn += 1;
    victoryCheck1();
    if(victory===true)
    {
$(".board").css("display","none");
playerWin = 'screen-win-one';
var playerNameWin = playerName + " Wins!";
$("head").append('<style>.screen-win-one p:before {content: "' + playerNameWin + '"}</style>')
injectWinner();}
        else if(turn === 9)
        {
        $(".board").css("display","none");
        injectTie();}
        else {player2()};
}});  
}

//Player Two gameplay function
var player2 = function(){

//Show "x" when hovering over empty field
if ($("#player2").hasClass("active")){
$(document).on("mouseover",".box", function(){
    if(!($(this).hasClass("box-filled-2"))&&!($(this).hasClass("box-filled-1"))){
    $(this).css('background-image', 'url(img/x.svg)');
    }});

$(document).on("mouseout",".box", function(){
    if(!($(this).hasClass("box-filled-2"))&&!($(this).hasClass("box-filled-1"))){
    $(this).css('background-image', 'none');   
    }});
}
    
//Selecting a field to place the "x", check victory conditions and either declare winner, tie or handover to player 1
$(document).on("click",".box", function(){
    if(!($(this).hasClass("box-filled-2"))&&!($(this).hasClass("box-filled-1"))){
        $(this).addClass("box-filled-2");
    $(document).off("mouseover",".box");
    $(document).off("click",".box");
    $("#player2").removeClass("active");
    $("#player1").addClass("active");
    setPlayer2.push($(this).attr("id"));
    turn += 1;
    victoryCheck2();
    if(victory===true){
        $(".board").css("display","none");
        playerWin = 'screen-win-two';
var playerNameWin = playerName2 + " Wins!";
$("head").append('<style>.screen-win-two p:before {content: "' + playerNameWin + '"}</style>');
        
        injectWinner()}else if(turn === 9)
        {
        $(".board").css("display","none");         
        injectTie();}
        else {player1()};
}});
}

//function that checks for victory conditions
var vc = [["11","12","13"],["21","22","23"],["31","32","33"],["11","21","31"],["12","22","32"],["13","23","33"],["11","22","33"],["31","22","13"]];
    
function victoryCheck1(){//check if player one wins
for (var i = 0;i<8;i++){
var isSuperset = vc[i].every(function (val) { return setPlayer1.indexOf(val) >= 0; });    
if(isSuperset){victory = isSuperset;}    
}}

function victoryCheck2(){//check if player two wins
for (var i = 0;i<8;i++){
var isSuperset = vc[i].every(function (val) { return setPlayer2.indexOf(val) >= 0; });    
if(isSuperset){victory = isSuperset;}    
}}
    
}()
