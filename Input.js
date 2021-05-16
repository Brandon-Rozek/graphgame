/*
    Input.js- Receives input and checks answer
    At the end of the code it says the following
    $(document).ready(Game.Start) Which runs the Start function when page is loaded

    Core functions
    --------------
    Game.Start() - Prepares game and checks to see if browser is compatible
        First it hides all the elements of the DOM that is not needed at the momment
        Then it checks if the browser is compatible
        If not then it shows an error message
        If so then it calls the startEvents function
        One of which that calls the GameStart function when play button is pressed

    Game.startEvents() - Starts events necessary
        Shows the menu
        Adds event listeners one of which calls the GameStart function when clicked [Play]

    Game.GameStart() - Prepares DOM for canvas game
        Hides elements
        Calls the PlayLevel function [in another file] which eventually leads to the check function

    Game.Check() - Checks answer and prepares for future level progression
        Turns off submit button event listener then calls a switch statement
        Switch statement takes Game.Type as it's argument and uses it to decide which equation function checks 
        If win then calls afterLevel(true) if lost then it calls afterLevel(false)

    Game.afterLevel(win) - Takes win as an input and displays whether player won or not
        Creates variable containing text for message box
        Hides input
        If the person won...
            Increases their score by 10
            Displays win message
            Calls Reset(true)
        If not...
            Subtracts their score by 5
            Displays lose message
            Calsl Reset(false)
    
    Game.Reset(win) - takes win as an input and prepares for the next level
        Resets the graph
        Removes the message
        Increases sublevel just in case it's a transformation level
        Calls PlayLevel(Game.Type, x)
        x is...
	        if Game.Type is Linear/Quadratic Transformations then it's Game.TransformationTimes
	        if not then it's (times-1)
        Turns on Submit button

    Etc functions
    ------------------
    All equation functions are the same, takes goal as input
    Obtains variables needed
    Graphs the equation
    Returns y for given goal [x]

    Game.PreventAlpha(e) - Prevents any other thing than numbers and "/"s to be inputted
        Takes an event as it's argument and prevents non numerical keys except for '/'
        If enter is pressed will simulate Submit button click
        Contains key/char codes and checks when key is pressed to see if it's one of the permitted

    Game.Fix(str) - Allows fractional input
        Takes a string as a argument
        Checks if "/" is detected
        If so..
	        It takes the string before the / and divides it by the string after it
        If not..
	        Just returns the number form of the string

    Game.TimeSet() - Allows for the time to be set
        if nChoice is not a number
            Gives you div to select time

    Game.RunTimer() - Runs the timer
        Subtracts the time by 1
        if time is 0
            stops timer
        if transformation level
            stops when 4 levels are completed
*/
var timed;

Game.Start = function () {
    Game.Type = "Tutorial";
    $('.input').hide();
    $('#myCanvas').hide();
    $('#End').hide();
    $('#Menu').hide();
    $('#timeInput').hide();
    $("#timer").hide();
    $('#exit').hide();
    if (navigator.userAgent.indexOf("MSIE 8.0") != -1) {
        document.getElementById("NotSuported").hidden = false;
    } else {
        document.getElementById("NotSuported").hidden = true;
        $(window).on('resize', Game.Responsive.start);
        Game.startEvents();
    }
};

Game.startEvents = function () {
    $('#Menu').show();
    $('#Play').on('click', Game.GameStart);
    $('.topic').on('click', function (event) {
        Game.Type = event.target.id.substring(0, event.target.id.length - 5);
        $("li").toggleClass('clicked', false);
        $(event.target).toggleClass('clicked');
    });
    $("#nchoice").on('change', Game.TimeSet);
};

Game.GameStart = function () {
    $(".topic").off();
    $('#Play').off();
    $('#nchoice').off();
    ntime = $('#nchoice').val() == "time" ? 1 : Number($('#nchoice').val());
    if (timed) {
        window.seconds = Number($('#sec').val());
        window.minutes = Number($('#min').val());
        window.totalTime = seconds + minutes * 60;
        $('#secOut').text((seconds < 10) ? ("0" + String(seconds)) : String(seconds));
        $('#minOut').text(String(window.minutes));
        $("#timer").show();
        window.timeRun = window.setInterval(Game.RunTimer, 1000);
    } else {
        ///////////
        window.totalTime = undefined;
    }
    $('#Menu').hide();
    $('#myCanvas').show();
    $('#End').show();
    $('#exit').show();
    Game.PlayLevel(ntime);
};

Game.TimeSet = function () {
    window.totalTime = undefined;
    if (isNaN($("#nchoice").val())) {
        timed = true;
        // '\' characters below are necessary for formatting cleanly
        $("label").before('<div id = "timeInput">\
                            <label>\
                                <select id = "min">\
                                    <option value = "5">5 minutes</option>\
                                    <option value = "4">4 minutes</option>\
                                    <option value = "3">3 minutes</option>\
                                    <option value = "2">2 minutes</option>\
                                    <option value = "1">1 minutes</option>\
                                </select>\
                            </label>\
                            <label>\
                                <select id = "sec">\
                                    <option value = "0">0 seconds</option>\
                                    <option value = "15">15 seconds</option>\
                                    <option value = "30">30 seconds</option>\
                                    <option value = "45">45 seconds</option>\
                                </select>\
                            </label>\
                        </div>');
    } else {
        $("#timeInput").remove();
        timed = false;
    }
};
//////////changed to accomodate pause for exit button
Game.RunTimer = function () {
    /////// cases with called arguments as the paused setting, or just the start
    if (arguments[0] == true){
        window.clearInterval(window.timeRun);
    } else if (arguments[0] == false){
        window.timeRun = window.setInterval(Game.RunTimer, 1000);
    } else {
        window.totalTime -= 1;
        window.seconds = window.totalTime - Math.floor(window.totalTime / 60) * 60;
        window.minutes = Math.floor(window.totalTime / 60);
        $('#secOut').text((seconds < 10) ? ("0" + String(seconds)) : String(seconds));
        $('#minOut').text(String(window.minutes));
        if (window.totalTime === 0) {
            window.clearInterval(window.timeRun);
            Reset(true);
        } else if (Game.Type == "LinearTransformations" || Game.Type == "QuadTransformations") {
            if (Game.TransformTimes == 0) {
                window.clearInterval(window.timeRun);
                Reset(true);
            }
        }
    }
};

Game.PreventAlpha = function (e) {
    if (e.keyCode == 13) {
        $('.Submit').click();
    }
    var acceptChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '-', '.'];
    var acceptCodes = [0, 13, 8, 37, 38, 39, 40, 33, 34];
    if (e.shiftKey){
        e.preventDefault();
    } else {
        if (acceptChars.indexOf(String.fromCharCode(e.which)) === -1 && acceptCodes.indexOf(e.which) === -1) {
            e.preventDefault();
        }
    }
};

Game.Exit = function () {
    ///////
    if (Game.Type == "GeneralQuad"){
            var divType = "GenaralQuad";
        } else if ( Game.Type == "QuadTransformations"){
            divType = "StandardQuad";
        } else if (Game.Type == "LinearTransformations"){
            divType = "Linear";
        } else {
            divType = Game.Type;
    }
    if (arguments.length === 0) {
        var exit = "<div id='endText' class='msg'> <h2> Are you sure you want to quit? </h2> <input type='submit' id='quit' value='Yes'/><input type='submit' id='resume' value='No'/> </div>";
        ////////pause timer
        Game.RunTimer(true);
        $('#End').after(exit);
        $('#quit').on('click', function () { Game.Exit(true); })
        $('#resume').on('click', function () { Game.Exit(false); })
        /////////
        $('#myCanvas').hide();
        
        $('#' + divType).hide();
    }
    else {
        if (arguments[0] == true) {
            $('.msg').remove();
            $('.Submit').off();
            
            Game.PlayLevel(0);
        }
        if (arguments[0] == false) {
            $('.msg').remove();
            ///////// resume timer
            Game.RunTimer(false);
            /////////
            $('#myCanvas').show();
            $('#' + divType).show();
        }
        $('#quit').off();
        $('#resume').off();
    }
};

Game.Check = function () {
    $('.Submit').off()
    $('input').off();
    $('#exit').off();
    switch (Game.Type) {
        case "Tutorial":
            Game.TutorialEquation(Game.LastX);
            if (Game.TutorialEquation(Game.LastX) == Game.LastY) {
                Game.afterLevel(true);
            } else {
                Game.afterLevel(false);
            }
            break;
        case "Coordinate":
            x = Game.Fix($('#X0').val());
            y = Game.Fix($('#Y0').val());
            if (x == Game.LastX && y == Game.LastY) {
                Game.afterLevel(true);
            } else {
                Game.afterLevel(false);
            }
            break;
        case "Linear":
            Game.LinearEquation(Game.LastX);
            if (Game.LinearEquation(Game.LastX) == Game.LastY && Game.LinearEquation(Game.LastX2) == Game.LastY2) {
                Game.afterLevel(true);
            } else {
                Game.afterLevel(false);
            }
            break;
        case "StandLinear":
            Game.StandLinearEquation(Game.LastX);
            if (Game.StandLinearEquation(Game.LastX) == Game.LastY && Game.StandLinearEquation(Game.LastX2) == Game.LastY2) {
                Game.afterLevel(true);
            } else {
                Game.afterLevel(false);
            }
            break;
        case "SimpleQuad":
            Game.SimpleQuadEquation(Game.LastX);
            if (Game.SimpleQuadEquation(Game.LastX) == Game.LastY) {
                Game.afterLevel(true);
            } else {
                Game.afterLevel(false);
            }
            break;
        case "StandardQuad":
            Game.StandardQuadEquation(Game.LastX);
            if (Game.StandardQuadEquation(Game.LastX) == Game.LastY && Game.StandardQuadEquation(Game.LastX2) == Game.LastY2) {
                Game.afterLevel(true);
            } else {
                Game.afterLevel(false);
            }
            break;
        case "GeneralQuad":
            Game.GenearalQuadEquation(Game.LastX);
            if (Game.GenearalQuadEquation(Game.LastX) == Game.LastY && Game.GenearalQuadEquation(Game.LastX2) == Game.LastY2) {
                Game.afterLevel(true);
            } else {
                Game.afterLevel(false);
            }
            break;
        case "ZeroQuad":
            Game.ZeroQuadEquation(Game.LastX);
            if (Game.ZeroQuadEquation(Game.LastX) == Game.LastY && Game.ZeroQuadEquation(Game.LastX2) == Game.LastY2) {
                Game.afterLevel(true);
            } else {
                Game.afterLevel(false);
            }
            break;
        case "LinearTransformations":
            Game.LinearEquation(Game.LastX);
            if (Game.LinearEquation(Game.LastX) == Game.LastY && Game.LinearEquation(Game.LastX2) == Game.LastY2) {
                Game.afterLevel(true);
            } else {
                Game.afterLevel(false);
            }
            break;
        case "QuadTransformations":
            Game.StandardQuadEquation(Game.LastX);
            if (Game.StandardQuadEquation(Game.LastX) == Game.LastY && Game.StandardQuadEquation(Game.LastX2) == Game.LastY2) {
                Game.afterLevel(true);
            } else {
                Game.afterLevel(false);
            }
            break;
    }
};

Game.afterLevel = function (win) {
    winText = "<div id='endText' class='msg'> <h1> You win! </h1> <input type='submit' id='reset' value='Next'/> </div>";
    loseText = "<div id='endText' class='msg'> <h1> You lose... </h1> <input type='submit' id='reset' value='Retry'/> </div>";
    $('#exit').hide();
    $('.input').hide();
    $('.Shifts').remove();
    if (win) {
        Game.Score += 10;
        $('#End').after(winText);
        $('#reset').click(function () {
            Game.Reset(true);
        });
    } else {
        Game.Score -= 5;
        $('#End').after(loseText);
        $('#reset').click(function () {
            Game.Reset(false);
        });
    }
};

Game.Reset = function (win) {
    myGraph.reset();
    $('.msg').remove();
    Game.SubLevel += 1;
    Game.TransformTimes -= 1;
    if (timed) {
        if (window.totalTime == 0) {
            times = 0;
            $('.input').hide();
            timed == false;
        } else if (window.totalTime == undefined) {
            times -= 1;
            timed == false;
        } else {
            times = 1;
        }
    } else if (Game.Type == "LinearTransformations" || Game.Type == "QuadTransformations") {
        times = Game.TransformTimes;
    } else {
        times -= 1;
    }
    Game.PlayLevel(times);
};

Game.Fix = function (str) {
    if (isNaN(str)) {
        if (str.indexOf('/') != -1) {
            return Number(str.substring(0, str.indexOf('/'))) / Number(str.substring(str.indexOf('/') + 1));
        }
    } else {
        return Number(str);
    }
};


/*Equations*/

Game.TutorialEquation = function (goal) {
    m = Game.Fix($("#m1").val());
    b = Game.Fix($("#b1").val());
    myGraph.drawEquation(function (x) {
        return m * x + b;
    });
    return m * goal + b;
};

Game.LinearEquation = function (goal) {
    rise = Game.Fix($('#rise').val());
    run = Game.Fix($('#run').val());
    b = Game.Fix($('#b2').val());
    hShift = 0;
    stretch = 1;
    Game.Transformations();
    myGraph.drawEquation(function (x) {
        return stretch * (rise / run) * (x + hShift) + b;
    });
    return stretch * (rise / run) * (goal + hShift) + b;
};
Game.StandLinearEquation = function (goal) {
    a = Game.Fix($('#a0').val());
    b = Game.Fix($('#b0').val());
    c = Game.Fix($('#c0').val());
    myGraph.drawEquation(function (x) {
        return (c - a * x) / b;
    });
    return (c - a * goal) / b;
};
Game.SimpleQuadEquation = function (goal) {
    h = Game.Fix($('#h1').val());
    k = Game.Fix($('#k1').val());
    myGraph.drawEquation(function (x) {
        return ((x - h) * (x - h)) + k;
    });
    return ((goal - h) * (goal - h)) + k;
};

Game.StandardQuadEquation = function (goal) {
    a = Game.Fix($('#a').val());
    h = Game.Fix($('#h2').val());
    k = Game.Fix($('#k2').val());
    hShift = 0;
    stretch = 1;
    Game.Transformations();
    myGraph.drawEquation(function (x) {
        return a * stretch * ((x - h + hShift) * (x - h + hShift)) + k;
    });
    return a * stretch * ((goal - h + hShift) * (goal - h + hShift)) + k;
};

Game.GenearalQuadEquation = function (goal) {
    a = Game.Fix($('#a2').val());
    b = Game.Fix($('#b3').val());
    c = Game.Fix($('#c').val());
    myGraph.drawEquation(function (x) {
        return a * (x * x) + b * x + c;
    });
    return a * (goal * goal) + b * goal + c;
};

Game.ZeroQuadEquation = function (goal) {
    X1 = Game.Fix($('#X1').val());
    X2 = Game.Fix($('#X2').val());
    myGraph.drawEquation(function (x) {
        return (x - X1) * (x - X2);
    });
    return (goal - X1) * (goal - X2);
};

Game.Transformations = function () {
    if (Game.Type == "LinearTransformations") {
        switch (Game.SubLevel) {
            case 1:
                b += Game.LinearTransformations.Level1.VerticalShift;
                break;
            case 2:
                hShift = Game.LinearTransformations.Level2.HorizontalShift;
                break;
            case 3:
                stretch = Game.LinearTransformations.Level3.Stretch;
                break;
            case 4:
                b += Game.LinearTransformations.Level4.VerticalShift;
                hShift = Game.LinearTransformations.Level4.HorizontalShift;
                stretch = Game.LinearTransformations.Level4.Stretch;
                break;
        }
    }
    if (Game.Type == "QuadTransformations") {
        switch (Game.SubLevel) {
            case 1:
                k += Game.QuadTransformations.Level1.VerticalShift;
                break;
            case 2:
                hShift = Game.QuadTransformations.Level2.HorizontalShift;
                break;
            case 3:
                stretch = Game.QuadTransformations.Level3.Stretch;
                break;
            case 4:
                k += Game.QuadTransformations.Level4.VerticalShift;
                hShift = Game.QuadTransformations.Level4.HorizontalShift;
                stretch = Game.QuadTransformations.Level4.Stretch;
                break;
        }

    }

};

$(document).ready(Game.Start);