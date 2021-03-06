
let moves = 0;
var itemShape = "";
var itemColor = "";
var itemSize = "";
var id = 0;
var alreadyPlaced = "";
var currentUserEmail = "";

var correct = new Audio("../images/correct.mp3");
var wrong = new Audio("../images/wrong.mp3");
var blackholesound = new Audio("../images/blackhole.mp3");

function getUserEmail() {
    currentUserEmail = $("#userEmail").val();
}

// This shuffles and picks 2 rules to use to play
function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
	    j = Math.floor(Math.random() * i);
	    x = a[i - 1];
	    a[i - 1] = a[j];
	    a[j] = x;
	}	
}
var allRules = ["red", "blue", "green", "satellite", "alien", "sun", "big", "small"];
shuffle(allRules);
checkRules();

// This checks to make sure no 2 rules are the same type (ie, both cannot be colors)
function checkRules() {
    if (allRules[1] === "red" || allRules[1] === "blue" || allRules[1] === "green") {
        if (allRules[2] != "red" && allRules[2] != "blue" && allRules[2] != "green") {
            return;
        } else {
            shuffle(allRules);
            checkRules();
        }
    }

    if (allRules[1] === "satellite" || allRules[1] === "alien" || allRules[1] === "sun") {
        if (allRules[2] != "satellite" && allRules[2] != "alien" && allRules[2] != "sun") {
            return;
        } else {
            shuffle(allRules);
            checkRules();
        }
    }

    if (allRules[1] === "big" || allRules[1] === "small") {
        if (allRules[2] != "big" && allRules[2] != "small") {
            return;
        } else {
            shuffle(allRules);
            checkRules();
        }
    }
}

function startGame() {
    moves = 0;
    // This allows pieces to be draggable/droppable
    $(function() {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("FINAL - RULE 1 is " + allRules[1]);
        console.log("FINAL - RULE 2 is " + allRules[2]);

        $("#category1").attr("data-rule", allRules[1]);
        $("#category2").attr("data-rule", allRules[2]);

        rule1 = $("#category1").attr("data-rule");
        rule2 = $("#category2").attr("data-rule");
        state = $(this).attr("data-placed");

        $(".piece").draggable();
        $(".piece").mousedown(function() {
            var dontduplicate = 0;
            itemShape = $(this).attr("data-shape");
            itemColor = $(this).attr("data-color");
            itemSize = $(this).attr("data-size");
            id = this.id;
            alreadyPlaced = $("#" + id).attr("data-placed");

            // This is just for RULE 1 AND RULE 2 objects
            $("#category3").droppable({
                drop: function() {
                    if (alreadyPlaced === "false") {
                        if (rule1 === itemShape || rule1 === itemColor || rule1 === itemSize) {
                            if (rule2 === itemShape || rule2 === itemColor || rule2 === itemSize) {
                                correct.play();
                                alreadyPlaced = "true";
                                $("#" + id).attr("data-placed", "true");
                                animate();
                            } else {
                                wrong.play();
                                $("#" + id).removeAttr("style");
                                $("#" + id).attr("style", "position: relative");
                            }
                        } else {
                            wrong.play();
                            $("#" + id).removeAttr("style");
                            $("#" + id).attr("style", "position: relative");
                        }
                        moves++;
                        $("#moves").html(moves);
                        dontduplicate = 1;
                    }
                }
            });

            // This is just for RULE 1 objects
            $("#category1").droppable({
                drop: function() {
                    if (alreadyPlaced === "false" && dontduplicate === 0) {
                        if (rule2 === itemShape || rule2 === itemColor || rule2 === itemSize) {
                            wrong.play();
                            $("#" + id).removeAttr("style");
                            $("#" + id).attr("style", "position: relative");
                        } else if (rule1 === itemShape || rule1 === itemColor || rule1 === itemSize) {
                            correct.play();
                            alreadyPlaced = "true";
                            $("#" + id).attr("data-placed", "true");
                            animate();
                        } else {
                            wrong.play();
                            $("#" + id).removeAttr("style");
                            $("#" + id).attr("style", "position: relative");
                        }
                        moves++;
                        $("#moves").html(moves);
                    }
                }
            });
        
            // This is just for RULE 2 objects
            $("#category2").droppable({
                drop: function() {
                    if (alreadyPlaced === "false" && dontduplicate === 0) {
                        if (rule1 === itemShape || rule1 === itemColor || rule1 === itemSize) {
                            wrong.play();
                            $("#" + id).removeAttr("style");
                            $("#" + id).attr("style", "position: relative");
                        } else if (rule2 === itemShape || rule2 === itemColor || rule2 === itemSize) {
                            correct.play();
                            alreadyPlaced = "true";
                            $("#" + id).attr("data-placed", "true");
                            animate();
                        } else {
                            wrong.play();
                            $("#" + id).removeAttr("style");
                            $("#" + id).attr("style", "position: relative");
                        }
                        moves++;
                        $("#moves").html(moves);
                    }
                }
            });

            // This is just for objects that don't go into either category
            $("#category4").droppable({
                drop: function() {
                    if (alreadyPlaced === "false" && dontduplicate === 0) {
                        if (rule1 != itemShape && rule1 != itemColor && rule1 != itemSize && rule2 != itemShape && rule2 != itemColor && rule2 != itemSize) {
                            // $("#" + id).position( { of: $(this), my: 'center', at: 'center' } );
                            blackholesound.play();
                            alreadyPlaced = "true";
                            $("#" + id).addClass("rotate blackhole");
                            $("#" + id).attr("data-placed", "true");
                            animate();
                        } else {
                            wrong.play();
                            $("#" + id).removeAttr("style");
                            $("#" + id).attr("style", "position: relative");
                        }
                        moves++;
                        $("#moves").html(moves);
                    }
                }
            });
        });
    });
}

function animate() {
    if (itemShape === "alien" && alreadyPlaced === "true") {
        $("#" + id).attr("src", "./images/alien.gif");
    } else if (itemShape === "satellite" && alreadyPlaced === "true") {
        $("#" + id).attr("src", "./images/sat.gif");
    } else if (itemShape === "sun" && alreadyPlaced === "true") {
        $("#" + id).attr("src", "./images/sun.gif");
    }
}

function stopAnimate() {
    for (var i = 0; i < 12; i++) {
        var shape = $("." + i).attr("data-shape");
        
        if (shape === "alien") {
            $("." + i).attr("src", "./images/alien_still.gif");
        } else if (shape === "satellite") {
            $("." + i).attr("src", "./images/sat_still.gif");
        } else if (shape === "sun") {
            $("." + i).attr("src", "./images/sun_still.gif");
        }
        $("#" + i).attr("data-placed", "false");
    }
}

function ruleGuess() {
    var rule1 = $("#category1").attr("data-rule");
    var rule2 = $("#category2").attr("data-rule");
    var rule1guess = $("#rule1guess").text().toLowerCase();
    var rule2guess = $("#rule2guess").text().toLowerCase();

    if (rule1 === rule1guess && rule2 === rule2guess) {
        var score = $("#moves").html();
<<<<<<< HEAD
        $(".blackhole").removeClass("rotate");
=======
	$(".blackhole").removeClass("rotate");
>>>>>>> bc86762f937aa66f8f4c741a4528dc5485373647
        $(".blackhole").addClass("rotateAway");

        // Ajax request to get the current user's info
        $.ajax({
            method: "GET",
            url: "/api/getuser/" + currentUserEmail
        })
        .done(function(data) {
            var userName = data.name;
            
            // Ajax request to post the score to the db
            $.ajax({
                method: "POST",
                url: "/api/save/" + currentUserEmail,
                data: {
                    score: score,
                    name: userName
                }
            });
        });
        return true;
    } else {
        moves++;
        $("#moves").html(moves);
        return false;
    }
}

function getScores() {
    $.ajax({
        method: "GET",
        url: "/api/saved/" + currentUserEmail
    }).done(function(data) {
        if (data.scores.length === 0) {
            $("#score-header").html("<p>You don't have any scores yet.  Start playing!</p>");
        } else {
            $("#score-header").html(`<h2>${data.name} 's Scores</h2>`);
        }

        for (var i = 0; i < data.scores.length; i++) {
            var formatDate= new Date(data.scores[i].date);
            formatDate = formatDate.toDateString();
            $("#my-dates").prepend(`<p>On ${formatDate}, you scored: </p>`);
        }
        for (var i = 0; i < data.scores.length; i++) {
            $("#my-scores").prepend(`<p> ${data.scores[i].score} </p>`);
        }

    });
}

function resetPieces() {
    // This returns it to it's original position
    $(".piece").removeAttr("style");
    $(".piece").removeClass("rotateAway rotate blackhole");
    stopAnimate();
    // This enables it to be picked up and moved around again
    $(".piece").attr("style", "position: relative");
    $(".piece").attr("data-placed", "false");
    $("#moves").html(moves);
}

//  This resets all pieces to it's original position
$(document).on("click", "#resetPieces", function() {
    event.preventDefault();
    resetPieces();
});

function playAgain() {
    moves = 0;
    resetPieces();
    shuffle(allRules);
    checkRules();
    startGame();
};

// For the shine.js
function makeItShine() {
    var shine = new Shine(document.getElementById('homepagelogo'));

    var config = new shinejs.Config({
        numSteps: 10,
        opacity: 1,
        offsetPow: 2,
        shadowRGB: new shinejs.Color(1, 62, 107)
    });

    window.addEventListener('mousemove', function(event) {
        shine.light.position.x = event.clientX;
        shine.light.position.y = event.clientY;
        shine.config = config;
        shine.draw();
    }, false);
}



