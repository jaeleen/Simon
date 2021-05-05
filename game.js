
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false; //keep track of the game has started.
var level = 0;


$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click (function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); //to get index of the last answer in user sequence.
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000); 
        }
    }
    else {
        console.log("Wrong");

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        // console.log("Wrong");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = []; //reset the userClickedPattern to an empty array ready for the next level.
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4); // random number 0 - 3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var playAudio = new Audio("sounds/" + name + ".mp3");
    playAudio.play();
    // console.log(playAudio);
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100); 
}


function startOver(){
    gamePattern = [];
    started = false; //keep track of the game has started.
    level = 0;
    // var userClickedPattern = [];

}