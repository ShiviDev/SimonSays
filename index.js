var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var gameStart=false;
var level=0;

$(document).keypress(function() {
    if (!gameStart) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      gameStart = true;
    }
  });

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
}); 

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
            $("body").removeClass("game-over");
        },200);
    }
 
}

function startOver(){
    gameStart=false;
    level=0;
    userClickedPattern=[];
    gamePattern=[];
}

function nextSequence(){

    userClickedPattern=[];
    
    $("#level-title").text("Level "+level);
    level++;

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var sound= new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);  
}


