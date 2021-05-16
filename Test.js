/*
    Test.js- Automates testing [Black Box Testing Style]
             Expects Elements to be shown and score to be equal to 15 (25 if transformations)

    Test.Errors - An array that contains all the errors once tests are ran.

    Test.Multiple(choice, times) - Runs [choice] test [times] times
        Basically works as: if option run option.test
        Displays errors at end using Test.DisplayErrors function

    Test.All() - Runs all tests
        Runs each test once 
        Displays errors at end using Test.DisplayErrors function

    Test.DisplayErrors()
        if no errors
            Displays "All tests passed"
        if errors
            Shows errors 
            Says how many errors there are

    ------Simulation Testing [Not going into detail with simulatePlay()]-------
    simulatePlay() - Wins 2 levels and loses 1, then checks if score equals 15
                     unless it's a transformation level then checks if score = 25
    
    Test.Menu() - Checks Menu
        If  menu,
            topics,
            nchoice,
            or play is undefined or not shown error is raised
        Simulates clicks with clickTest function
        ClickTest() - Simulates topics being clicked
            if topic cannot be clicked then error is raised

    Test.[insert level name]() - Checks [level name]
        Gets into said level
        If canvas or input isn't defined or shown then an error is raised
        Simulates level using simulatePlay function    
*/

var Test = new Object();

Test.Errors = []

Test.Menu = function () {
    menu = (document.getElementById('Menu') == undefined || $("#Menu").is(':hidden')) ? false : true; 
    topics = (document.getElementById('topics') == undefined || $("#topics").is(':hidden')) ? false : true;
    nchoice = (document.getElementById('nchoice') == undefined || $("#nchoice").is(':hidden')) ? false : true;
    play = (document.getElementById('Play') == undefined || $("#Play").is(':hidden')) ? false : true;
    if (!menu) { Test.Errors.push("Expected menu to be shown."); }
    if (!topics) { Test.Errors.push("Expected topics to be shown.") }
    if (!nchoice) { Test.Errors.push("Expected number of times option to be shown.") }
    if (!play) { Test.Errors.push("Expected Play button to be shown.") }
    //--------Start ClickTest-------//
    length = $("#topics").children().length
    for (i = 1; i <= length; i++) {
        item = '#topics li:nth-child(' + i + ')'
        $(item).click()
        if (!$(item).hasClass("clicked")) {
            id = $(item).attr('id');
            Test.Errors.push(id + " cannot be clicked");
        }
    } 
}
Test.Tutorial = function () {
    $('#TutorialTopic').click();
    $('#Play').click();
    Canvas = (document.getElementById('myCanvas') == undefined || $("#myCanvas").is(':hidden')) ? false : true;
    Tutorial = (document.getElementById('Tutorial') == undefined || $("#Tutorial").is(':hidden')) ? false : true;
    if (!myCanvas) { Test.Errors.push("[Tutorial] Expected canvas to be shown."); }
    if (!Tutorial) { Test.Errors.push("[Tutorial] Expected input to be shown."); }
    //-----Start Game Simulation-----//
    $('#m1').val(0);
    $('#b1').val(Game.LastY);
    $('.Submit').click();
    $('#reset').click();
    $('#m1').val(0);
    $('#b1').val(Game.LastY);
    $('.Submit').click();
    $('#reset').click();
    $('#m1').val(0);
    $('#b1').val(Game.LastY - 1);
    $('.Submit').click();
    if (Game.Score != 15) {
        Test.Errors.push("[Tutorial] The scoring system was incorrect: \n" + "Expected 15, instead got: " + Game.Score);
    }
    $('#reset').click();
    $('#Last').click();
}

Test.Coordinate = function() {
    $('#CoordinateTopic').click();
    $('#Play').click();
    Canvas = (document.getElementById('myCanvas') == undefined || $("#myCanvas").is(':hidden')) ? false : true;
    Coordinate = (document.getElementById('Coordinate') == undefined || $("#Coordinate").is(':hidden')) ? false : true;
    if (!myCanvas) { Test.Errors.push("[Coordinate] Expected canvas to be shown."); }
    if (!Coordinate) { Test.Errors.push("[Coordinate] Expected input to be shown."); }
    //-----Start Game Simulation----//
    $('#X0').val(Game.LastX);
    $('#Y0').val(Game.LastY);
    $('.Submit').click();
    $('#reset').click();
    $('#X0').val(Game.LastX);
    $('#Y0').val(Game.LastY);
    $('.Submit').click();
    $('#reset').click();
    $('#X0').val(Game.LastX);
    $('#Y0').val(Game.LastY - 1);
    $('.Submit').click();
    if (Game.Score != 15) {
        Test.Errors.push("[Coordinate] The scoring system was incorrect: \n" + "Expected 15, instead got: " + Game.Score);
    }
    $('#reset').click();
    $('#Last').click();
}

Test.Linear = function () {
    $('#LinearTopic').click();
    $('#Play').click();
    Canvas = (document.getElementById('myCanvas') == undefined || $("#myCanvas").is(':hidden')) ? false : true;
    Linear = (document.getElementById('Linear') == undefined || $("#Linear").is(':hidden')) ? false : true;
    if (!myCanvas) { Test.Errors.push("[Linear] Expected canvas to be shown."); }
    if (!Linear) { Test.Errors.push("[Linear] Expected input to be shown."); }
    //-----Start Game Simulation----//
    m = (Game.LastY2 - Game.LastY) / (Game.LastX2 - Game.LastX);
    b = Game.LastY - (m * Game.LastX);
    $('#rise').val(m);
    $('#run').val(1);
    $('#b2').val(b);
    $('.Submit').click();
    $('#reset').click();
    m = (Game.LastY2 - Game.LastY) / (Game.LastX2 - Game.LastX);
    b = Game.LastY - (m * Game.LastX);
    $('#rise').val(m);
    $('#run').val(1);
    $('#b2').val(b);
    $('.Submit').click();
    $('#reset').click();
    m = (Game.LastY2 - Game.LastY) / (Game.LastX2 - Game.LastX);
    b = Game.LastY - (m * Game.LastX);
    $('#rise').val(m);
    $('#run').val(1);
    $('#b2').val(b - 1);
    $('.Submit').click();
    if (Game.Score != 15) {
        Test.Errors.push("[Linear] The scoring system was incorrect: \n" + "Expected 15, instead got: " + Game.Score);
    }
    $('#reset').click();
    $('#Last').click();
}

Test.StandLinear = function () {
    $('#StandLinearTopic').click();
    $('#Play').click();
    Canvas = (document.getElementById('myCanvas') == undefined || $("#myCanvas").is(':hidden')) ? false : true;
    StandLinear = (document.getElementById('StandLinear') == undefined || $("#StandLinear").is(':hidden')) ? false : true;
    if (!myCanvas) { Test.Errors.push("[StandLinear] Expected canvas to be shown."); }
    if (!StandLinear) { Test.Errors.push("[StandLinear] Expected input to be shown."); }
    //----Simulate Game Play-----//
    a = (Game.LastY2 - Game.LastY);
    b = (Game.LastX2 - Game.LastX);
    m = a / b
    c = (Game.LastY - (m * Game.LastX)) * b
    $('#a0').val(-1 * a);
    $('#b0').val(b);
    $('#c0').val(c);
    $('.Submit').click();
    $('#reset').click();
    a = (Game.LastY2 - Game.LastY);
    b = (Game.LastX2 - Game.LastX);
    m = a / b
    c = (Game.LastY - (m * Game.LastX)) * b
    $('#a0').val(-1 * a);
    $('#b0').val(b);
    $('#c0').val(c);
    $('.Submit').click();
    $('#reset').click();
    a = (Game.LastY2 - Game.LastY);
    b = (Game.LastX2 - Game.LastX);
    m = a / b
    c = (Game.LastY - (m * Game.LastX)) * b
    $('#a0').val(-1 * a);
    $('#b0').val(b);
    $('#c0').val(c - 1);
    $('.Submit').click();
    if (Game.Score != 15) {
        Test.Errors.push("[StandLinear] The scoring system was incorrect: \n" + "Expected 15, instead got: " + Game.Score);
    }
    $('#reset').click();
    $('#Last').click();
}

Test.LinearTransformations = function () {
    $('#LinearTransformationsTopic').click();
    $('#Play').click();
    Canvas = (document.getElementById('myCanvas') == undefined || $("#myCanvas").is(':hidden')) ? false : true;
    Linear = (document.getElementById('Linear') == undefined || $("#Linear").is(':hidden')) ? false : true;
    if (!myCanvas) { Test.Errors.push("[LinearTransformations] Expected canvas to be shown."); }
    if (!Linear) { Test.Errors.push("[LinearTransformations] Expected input to be shown."); }
    //----Simulate Game Play----//
    m = (Game.LastY2 - Game.LastY) / (Game.LastX2 - Game.LastX);
    b = Game.LastY - (m * Game.LastX);
    $('#rise').val(m);
    $('#run').val(1);
    $('#b2').val(b - Game.LinearTransformations.Level1.VerticalShift);
    $('.Submit').click();
    if (Game.Score != 10) { alert("") }
    $('#reset').click();
    m = (Game.LastY2 - Game.LastY) / (Game.LastX2 - Game.LastX);
    b = Game.LastY - m * (Game.LastX + Game.LinearTransformations.Level2.HorizontalShift);
    $('#rise').val(m);
    $('#run').val(1);
    $('#b2').val(b);
    $('.Submit').click();
    $('#reset').click();
    m = (Game.LastY2 - Game.LastY) / (Game.LastX2 - Game.LastX);
    b = Game.LastY - (m * Game.LastX)
    $('#rise').val(m * (1 / Game.LinearTransformations.Level3.Stretch));
    $('#run').val(1);
    $('#b2').val(b);
    $('.Submit').click();
    $('#reset').click();
    $('#rise').val(0);
    $('#run').val(1);
    $('#b2').val(-20);
    $('.Submit').click();
    if (Game.Score != 25) {
        Test.Errors.push("[LinearTransformations] The scoring system was incorrect: \n" + "Expected 25, instead got: " + Game.Score);
    }
    $('#reset').click();
    $('#Last').click();
}

Test.SimpleQuad = function () {
    $('#SimpleQuadTopic').click();
    $('#Play').click();
    Canvas = (document.getElementById('myCanvas') == undefined || $("#myCanvas").is(':hidden')) ? false : true;
    SimpleQuad = (document.getElementById('SimpleQuad') == undefined || $("#SimpleQuad").is(':hidden')) ? false : true;
    if (!myCanvas) { Test.Errors.push("[SimpleQuad] Expected canvas to be shown."); }
    if (!SimpleQuad) { Test.Errors.push("[SimpleQuad] Expected input to be shown."); }
    //------Simulate Game Play------//
    $('#h1').val(Game.LastX);
    $('#k1').val(Game.LastY);
    $('.Submit').click();
    $('#reset').click();
    $('#h1').val(Game.LastX);
    $('#k1').val(Game.LastY);
    $('.Submit').click();
    $('#reset').click();
    $('#h1').val(Game.LastX);
    $('#k1').val(Game.LastY - 1);
    $('.Submit').click();
    if (Game.Score != 15) {
        Test.Errors.push("[SimpleQuad] The scoring system was incorrect: \n" + "Expected 15, instead got: " + Game.Score);
    }
    $('#reset').click();
    $('#Last').click();
}

Test.StandardQuad = function () {
    $('#StandardQuadTopic').click();
    $('#Play').click();
    Canvas = (document.getElementById('myCanvas') == undefined || $("#myCanvas").is(':hidden')) ? false : true;
    StandardQuad = (document.getElementById('StandardQuad') == undefined || $("#StandardQuad").is(':hidden')) ? false : true;
    if (!myCanvas) { Test.Errors.push("[StandardQuad] Expected canvas to be shown."); }
    if (!StandardQuad) { Test.Errors.push("[StandardQuad] Expected input to be shown."); }
    //------Simulate Game Play------//
    n = Game.LastX2 - Game.LastX;
    a = (Game.LastY2 - Game.LastY) / (n * n);
    $('#a').val(a);
    $('#h2').val(Game.LastX);
    $('#k2').val(Game.LastY);
    $('.Submit').click();
    $('#reset').click();
    n = Game.LastX2 - Game.LastX;
    a = (Game.LastY2 - Game.LastY) / (n * n);
    $('#a').val(a);
    $('#h2').val(Game.LastX);
    $('#k2').val(Game.LastY);
    $('.Submit').click();
    $('#reset').click();
    n = Game.LastX2 - Game.LastX;
    a = (Game.LastY2 - Game.LastY) / (n * n);
    $('#a').val(a);
    $('#h2').val(Game.LastX);
    $('#k2').val(Game.LastY - 1);
    $('.Submit').click();
    if (Game.Score != 15) {
        Test.Errors.push("[StandardQuad] The scoring system was incorrect: \n" + "Expected 15, instead got: " + Game.Score);
    }
    $('#reset').click();
    $('#Last').click();
}

Test.GeneralQuad = function () {
    $('#GeneralQuadTopic').click();
    $('#Play').click();
    Canvas = (document.getElementById('myCanvas') == undefined || $("#myCanvas").is(':hidden')) ? false : true;
    GeneralQuad = (document.getElementById('GenaralQuad') == undefined || $("#GenaralQuad").is(':hidden')) ? false : true;
    if (!myCanvas) { Test.Errors.push("[GeneralQuad] Expected canvas to be shown."); }
    if (!GeneralQuad) { Test.Errors.push("[GeneralQuad] Expected input to be shown."); }
    //-------Simulate Game Play-------//
    n = Game.LastX2 - Game.LastX;
    a = (Game.LastY2 - Game.LastY) / (n * n);
    b = -2 * a * Game.LastX;
    c = a * Game.LastX * Game.LastX + Game.LastY
    $('#a2').val(a);
    $('#b3').val(b);
    $('#c').val(c);
    $('.Submit').click();
    $('#reset').click();
    n = Game.LastX2 - Game.LastX;
    a = (Game.LastY2 - Game.LastY) / (n * n);
    b = -2 * a * Game.LastX;
    c = a * Game.LastX * Game.LastX + Game.LastY
    $('#a2').val(a);
    $('#b3').val(b);
    $('#c').val(c);
    $('.Submit').click();
    $('#reset').click();
    n = Game.LastX2 - Game.LastX;
    a = (Game.LastY2 - Game.LastY) / (n * n);
    b = -2 * a * Game.LastX;
    c = a * Game.LastX * Game.LastX + Game.LastY
    $('#a2').val(a);
    $('#b3').val(b);
    $('#c').val(c - 1);
    $('.Submit').click();
    if (Game.Score != 15) {
        Test.Errors.push("[GeneralQuad] The scoring system was incorrect: \n" + "Expected 15, instead got: " + Game.Score);
    }
    $('#reset').click();
    $('#Last').click();
}

Test.ZeroQuad = function () {
    $('#ZeroQuadTopic').click();
    $('#Play').click();
    Canvas = (document.getElementById('myCanvas') == undefined || $("#myCanvas").is(':hidden')) ? false : true;
    ZeroQuad = (document.getElementById('ZeroQuad') == undefined || $("#ZeroQuad").is(':hidden')) ? false : true;
    if (!myCanvas) { Test.Errors.push("[ZeroQuad] Expected canvas to be shown."); }
    if (!ZeroQuad) { Test.Errors.push("[ZeroQuad] Expected input to be shown."); }
    //-----Simulate Game Play-----//
    $('#X1').val(Game.LastX);
    $('#X2').val(Game.LastX2);
    $('.Submit').click();
    $('#reset').click();
    $('#X1').val(Game.LastX);
    $('#X2').val(Game.LastX2);
    $('.Submit').click();
    $('#reset').click();
    $('#X1').val(Game.LastX);
    $('#X2').val(Game.LastX2 + 1);
    $('.Submit').click();
    $('#reset').click();
    if (Game.Score != 15) {
        Test.Errors.push("[ZeroQuad] The scoring system was incorrect: \n" + "Expected 15, instead got: " + Game.Score);
    }
    $('#reset').click();
    $('#Last').click();
}

Test.QuadTransformations = function () {
    $('#QuadTransformationsTopic').click();
    $('#Play').click();
    Canvas = (document.getElementById('myCanvas') == undefined || $("#myCanvas").is(':hidden')) ? false : true;
    QuadTransformations = (document.getElementById('StandardQuad') == undefined || $("#StandardQuad").is(':hidden')) ? false : true;
    if (!myCanvas) { Test.Errors.push("[QuadTransformations] Expected canvas to be shown."); }
    if (!QuadTransformations) { Test.Errors.push("[QuadTransformations] Expected input to be shown."); }
    //----Simulate Game Play-----//
    n = Game.LastX2 - Game.LastX;
    a = (Game.LastY2 - Game.LastY) / (n * n);
    $('#a').val(a);
    $('#h2').val(Game.LastX);
    $('#k2').val(Game.LastY - Game.QuadTransformations.Level1.VerticalShift);
    $('.Submit').click();
    $('#reset').click();
    n = Game.LastX2 - Game.LastX;
    a = (Game.LastY2 - Game.LastY) / (n * n);
    $('#a').val(a);
    $('#h2').val(Game.LastX + Game.QuadTransformations.Level2.HorizontalShift);
    $('#k2').val(Game.LastY);
    $('.Submit').click();
    $('#reset').click();
    n = Game.LastX2 - Game.LastX;
    a = (Game.LastY2 - Game.LastY) / (n * n);
    $('#a').val(a * (1 / Game.QuadTransformations.Level3.Stretch));
    $('#h2').val(Game.LastX);
    $('#k2').val(Game.LastY);
    $('.Submit').click();
    $('#reset').click();
    $('#a').val(-10);
    $('#h2').val(1000);
    $('#k2').val(-50);
    $('.Submit').click();
    if (Game.Score != 25) {
        Test.Errors.push("[QuadTransformations] The scoring system was incorrect: \n" + "Expected 25, instead got: " + Game.Score);
    }
    $('#reset').click();
    $('#Last').click();
}

Test.Multiple = function (choice, times) {
    for (i = 0; i < times; i++) {
        switch (choice.toUpperCase()) {
            case "MENU": Test.Menu(); break;
            case "TUTORIAL": Test.Tutorial(); break;
            case "COORDINATE": Test.Coordinate(); break;
            case "LINEAR": Test.Linear(); break;
            case "STANDLINEAR": Test.StandLinear(); break;
            case "LINEARTRANSFORMATIONS": Test.LinearTransformations(); break;
            case "SIMPLEQUAD": Test.SimpleQuad(); break;
            case "STANDARDQUAD": Test.StandardQuad(); break;
            case "GENERALQUAD": Test.GeneralQuad(); break;
            case "ZEROQUAD": Test.ZeroQuad(); break;
            case "QUADTRANSFORMATIONS": Test.QuadTransformations(); break;
        }
    }
    Test.DisplayErrors();
}

Test.All = function () {
    Test.Menu();
    Test.Tutorial();
    Test.Coordinate();
    Test.Linear();
    Test.StandLinear()
    Test.LinearTransformations();
    Test.SimpleQuad();
    Test.StandardQuad();
    Test.GeneralQuad();
    Test.ZeroQuad();
    Test.QuadTransformations();
    Test.DisplayErrors();
}

Test.DisplayErrors = function () {
    if (Test.Errors.length > 0) {
        for (i = 0; i < Test.Errors.length; i++) {
            console.error(Test.Errors[i]);
        }
        console.warn("Of all tests, " + Test.Errors.length + " have failed.");
    }
    if (Test.Errors.length == 0) {
        console.log("All tests passed");
    }
}