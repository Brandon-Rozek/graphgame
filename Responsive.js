/*
    Responsive.js- Handles responsiveness of website
    
    Game.Responsive.start()- Initiates Responsive functions
        Initiates canvas, inputs, and menu functions
        Draws the appropriate graph for the level
        Draws points for level

    Game.Responsive.canvas() - Adjusts canvas on resize
        Changes width and height to window

    Game.Responsive.inputs() - Adjusts input boxes on resize
        Changes it to what seems as an appropriate size

    Game.Responsive.menu() - Adjusts menu div on resize
        Sets it to window size [Bug]

    ---- Draggable div functions -----
    Game.Responsive.mouseUp() - removes event listener on mouseup

    Game.Responsive.mouseDown(e) - prepares for div move
        stores drag offset from orriginal div
        calls divMouse function

    Game.Responsive.divMove(e) - moves the div
        targets div
        moves the div according to "offset" variable
*/
Game.Responsive = {
    canvas: function () {
        document.getElementById('myCanvas').width = window.innerWidth;
        document.getElementById('myCanvas').height = window.innerHeight;
    },
    inputs: function () {
        $('.input').width(window.innerWidth / 2.8);
        $('.input').height(window.innerHeight / 10);
    },
    menu: function () {
        document.getElementById('Menu').width = window.innerWidth;
        document.getElementById('Menu').height = window.innerHeight;
    },
    start: function () {
        Game.Responsive.canvas();
        Game.Responsive.inputs();
        Game.Responsive.menu();
        myGraph = {};
        myGraph = new Graph({
            centerY: (Game.Type != "ZeroQuad") ? window.innerHeight - 60 : window.innerHeight / 2,
            centerX: 30,
            minX: 0,
            minY: 0,
            maxX: window.innerWidth / (window.innerHeight / 10),
            maxY: 10,
            unitsPerTick: 1
        });
        myGraph.drawPoint(Game.LastX, Game.LastY);
        myGraph.drawPoint(Game.LastX2, Game.LastY2);
    }
};

Game.Responsive.mouseUp = function () {
    window.removeEventListener('mousemove', Game.Responsive.divMove, true);
};

Game.Responsive.mouseDown = function (e) {
    target = (e.target || e.srcElement).id;
    var div = document.getElementById(target);
    offY = e.clientY - parseInt(div.offsetTop);
    offX = e.clientX - parseInt(div.offsetLeft);
    window.addEventListener('mousemove', Game.Responsive.divMove, true);
};

Game.Responsive.divMove = function (e) {
    var div = document.getElementById(target);
    div.style.top = (e.clientY - offY) + 'px';
    div.style.left = (e.clientX - offX) + 'px';
};