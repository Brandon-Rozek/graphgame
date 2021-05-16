/*
    PlayLevel.js- single function code that sets up/shows levels
        Takes 1 argument: ntimes

        when times = 0 or when game is over
        it shows your score and then resets everything so it can show the menu

        Otherwise uses switch statement to check Game.Type
        Sets up appropriate points [and shifts if applicable]
        Calls appropriate event listeners for buttons
        Starts
*/
Game.PlayLevel = function (ntimes) {
    times = ntimes;
    if (times == 0) {
        $('#End').after("<div id='endText' class='msg'> <h1> Your Score: " + Game.Score + "</h1> <input type='submit' id='Last' value='Finish'/> </div>");
        $('#Last').on('click', function () {
            $('#endText').remove();
            myGraph.reset();
            Game.LastX = undefined;
            Game.LastY = undefined;
            Game.LastX2 = undefined;
            Game.LastY2 = undefined;
            Game.Score = 0;
            Game.SubLevel = 1;
            Game.TransformTimes = 4;
            $('#myCanvas').hide();
            $('.input').hide();
            $('#End').hide();
            $('#timer').hide();
            $('#exit').hide();
            Game.startEvents();
        });
    } else {
        $('#exit').show();
        switch (Game.Type) {
            case "Tutorial":
                $('#Tutorial').show();
                Game.LastX = Game.Tutorial.fGoalX();
                Game.LastY = Game.Tutorial.fGoalY();
                Game.LastX2 = undefined;
                Game.LastY2 = undefined;
                break;
            case "Coordinate":
                $('#Coordinate').show();
                Game.LastX = Game.Coordinate.fGoalX1();
                Game.LastY = Game.Coordinate.fGoalY1();
                Game.LastX2 = undefined;
                Game.LastY2 = undefined;
                break;
            case "Linear":
                $('#Linear').show();
                Game.Linear.GoalX1 = Game.Linear.fGoalX1();
                Game.Linear.GoalY1 = Game.Linear.fGoalY1();
                Game.LastX = Game.Linear.GoalX1
                Game.LastY = Game.Linear.GoalY1
                Game.Linear.GoalX2 = Game.Linear.fGoalX2();
                Game.Linear.GoalY2 = Game.Linear.fGoalY2();
                Game.LastX2 = Game.Linear.GoalX2
                Game.LastY2 = Game.Linear.GoalY2
                break;
            case "StandLinear":
                $('#StandLinear').show();
                Game.StandLinear.GoalX1 = Game.StandLinear.fGoalX1();
                Game.StandLinear.GoalY1 = Game.StandLinear.fGoalY1();
                Game.LastX = Game.StandLinear.GoalX1;
                Game.LastY = Game.StandLinear.GoalY1;
                Game.StandLinear.GoalX2 = Game.StandLinear.fGoalX2();
                Game.StandLinear.GoalY2 = Game.StandLinear.fGoalY2();
                Game.LastX2 = Game.StandLinear.GoalX2;
                Game.LastY2 = Game.StandLinear.GoalY2;
                break;
            case "SimpleQuad":
                $('#SimpleQuad').show();
                Game.LastX = Game.SimpleQuad.fGoalX();
                Game.LastY = Game.SimpleQuad.fGoalY();
                Game.LastX2 = undefined;
                Game.LastY2 = undefined;
                break;
            case "StandardQuad":
                $('#StandardQuad').show();
                Game.StandardQuad.GoalX1 = Game.StandardQuad.fGoalX1();
                Game.StandardQuad.GoalY1 = Game.StandardQuad.fGoalY1();
                Game.LastX = Game.StandardQuad.GoalX1;
                Game.LastY = Game.StandardQuad.GoalY1;
                Game.StandardQuad.GoalX2 = Game.StandardQuad.fGoalX2();
                Game.StandardQuad.GoalY2 = Game.StandardQuad.fGoalY2();
                Game.LastX2 = Game.StandardQuad.GoalX2;
                Game.LastY2 = Game.StandardQuad.GoalY2;
                break;
            case "GeneralQuad":
                $('#GenaralQuad').show();
                Game.GeneralQuad.GoalX1 = Game.GeneralQuad.fGoalX1();
                Game.GeneralQuad.GoalY1 = Game.GeneralQuad.fGoalY1();
                Game.LastX = Game.GeneralQuad.GoalX1;
                Game.LastY = Game.GeneralQuad.GoalY1;
                Game.GeneralQuad.GoalX2 = Game.GeneralQuad.fGoalX2();
                Game.GeneralQuad.GoalY2 = Game.GeneralQuad.fGoalY2();
                Game.LastX2 = Game.GeneralQuad.GoalX2;
                Game.LastY2 = Game.GeneralQuad.GoalY2;
                break;
            case "ZeroQuad":
                $('#ZeroQuad').show();
                Game.ZeroQuad.GoalX1 = Game.ZeroQuad.fGoalX1();
                Game.LastX = Game.ZeroQuad.GoalX1;
                Game.LastY = Game.ZeroQuad.GoalY1;
                Game.ZeroQuad.GoalX2 = Game.ZeroQuad.fGoalX2();
                Game.LastX2 = Game.ZeroQuad.GoalX2;
                Game.LastY2 = Game.ZeroQuad.GoalY2;
                break;

            case "LinearTransformations":
                $('#Linear').show();
                switch (Game.SubLevel) {
                    case 1:
                        Game.LinearTransformations.Level1.VerticalShift = Game.LinearTransformations.Level1.fVerticalShift();
                        Sign = (Game.LinearTransformations.Level1.VerticalShift >= 0) ? "+" : "";
                        $('#b2').after("<span style='color:#FF0000;' class='Shifts'>" + Sign + Game.LinearTransformations.Level1.VerticalShift + "</span>");
                        Game.LinearTransformations.Level1.GoalX1 = Game.LinearTransformations.Level1.fGoalX1();
                        Game.LinearTransformations.Level1.GoalY1 = Game.LinearTransformations.Level1.fGoalY1();
                        Game.LastX = Game.LinearTransformations.Level1.GoalX1;
                        Game.LastY = Game.LinearTransformations.Level1.GoalY1;
                        Game.LinearTransformations.Level1.GoalX2 = Game.LinearTransformations.Level1.fGoalX2();
                        Game.LinearTransformations.Level1.GoalY2 = Game.LinearTransformations.Level1.fGoalY2();
                        Game.LastX2 = Game.LinearTransformations.Level1.GoalX2;
                        Game.LastY2 = Game.LinearTransformations.Level1.GoalY2;
                        break;
                    case 2:
                        Game.LinearTransformations.Level2.HorizontalShift = Game.LinearTransformations.Level2.fHorizontalShift();
                        Sign = (Game.LinearTransformations.Level2.HorizontalShift >= 0) ? "+" : "";
                        $('#run').after("<span class='Shifts'> ( </span>");
                        $('#Horizontal').after("<span class='Shifts' style='color:#FF0000;'>" + Sign + Game.LinearTransformations.Level2.HorizontalShift + ")</span>");
                        Game.LinearTransformations.Level2.GoalX1 = Game.LinearTransformations.Level2.fGoalX1();
                        Game.LinearTransformations.Level2.GoalY1 = Game.LinearTransformations.Level2.fGoalY1();
                        Game.LastX = Game.LinearTransformations.Level2.GoalX1;
                        Game.LastY = Game.LinearTransformations.Level2.GoalY1;
                        Game.LinearTransformations.Level2.GoalX2 = Game.LinearTransformations.Level2.fGoalX2();
                        Game.LinearTransformations.Level2.GoalY2 = Game.LinearTransformations.Level2.fGoalY2();
                        Game.LastX2 = Game.LinearTransformations.Level2.GoalX2;
                        Game.LastY2 = Game.LinearTransformations.Level2.GoalY2;
                        break;
                    case 3:
                        Game.LinearTransformations.Level3.Stretch = Game.fStretch();
                        $('#rise').before("<span style='color:#FF0000' class='Shifts'>" + Game.LinearTransformations.Level3.Stretch + " * </span>");
                        Game.LinearTransformations.Level3.GoalX1 = Game.LinearTransformations.Level3.fGoalX1();
                        Game.LinearTransformations.Level3.GoalY1 = Game.LinearTransformations.Level3.fGoalY1();
                        Game.LastX = Game.LinearTransformations.Level3.GoalX1;
                        Game.LastY = Game.LinearTransformations.Level3.GoalY1;
                        Game.LinearTransformations.Level3.GoalX2 = Game.LinearTransformations.Level3.fGoalX2();
                        Game.LinearTransformations.Level3.GoalY2 = Game.LinearTransformations.Level3.fGoalY2();
                        Game.LastX2 = Game.LinearTransformations.Level3.GoalX2;
                        Game.LastY2 = Game.LinearTransformations.Level3.GoalY2;
                        break;
                    case 4:
                        Game.LinearTransformations.Level4.HorizontalShift = Game.LinearTransformations.Level4.fHorizontalShift();
                        Game.LinearTransformations.Level4.VerticalShift = Game.LinearTransformations.Level4.fVerticalShift();
                        var SignV = (Game.LinearTransformations.Level4.VerticalShift >= 0) ? "+" : "";
                        $('#b2').after("<span style='color:#FF0000;' class='Shifts'>" + SignV + Game.LinearTransformations.Level4.VerticalShift + "</span>");
                        var SignH = (Game.LinearTransformations.Level4.HorizontalShift >= 0) ? "+" : "";
                        $('#run').after("<span class='Shifts'> ( </span>");
                        $('#Horizontal').after("<span class='Shifts' style='color:#FF0000;'>" + SignH + Game.LinearTransformations.Level4.HorizontalShift + ")</span>");
                        Game.LinearTransformations.Level4.Stretch = Game.fStretch();
                        $('#rise').before("<span style='color:#FF0000' class='Shifts'>" + Game.LinearTransformations.Level4.Stretch + " * </span>");
                        Game.LinearTransformations.Level4.GoalX1 = Game.LinearTransformations.Level4.fGoalX1();
                        Game.LinearTransformations.Level4.GoalY1 = Game.LinearTransformations.Level4.fGoalY1();
                        Game.LastX = Game.LinearTransformations.Level4.GoalX1;
                        Game.LastY = Game.LinearTransformations.Level4.GoalY1;
                        Game.LinearTransformations.Level4.GoalX2 = Game.LinearTransformations.Level4.fGoalX2();
                        Game.LinearTransformations.Level4.GoalY2 = Game.LinearTransformations.Level4.fGoalY2();
                        Game.LastX2 = Game.LinearTransformations.Level4.GoalX2;
                        Game.LastY2 = Game.LinearTransformations.Level4.GoalY2;
                        break;
                }
                break;
            case "QuadTransformations":
                $('#StandardQuad').show();
                switch (Game.SubLevel) {
                    case 1:
                        Game.QuadTransformations.Level1.VerticalShift = Game.QuadTransformations.Level1.fVerticalShift();
                        Sign = (Game.QuadTransformations.Level1.VerticalShift >= 0) ? "+" : "";
                        $('#k2').after("<span style='color:#FF0000;' class='Shifts'>" + Sign + Game.QuadTransformations.Level1.VerticalShift + "</span>");
                        Game.QuadTransformations.Level1.GoalX1 = Game.QuadTransformations.Level1.fGoalX1();
                        Game.QuadTransformations.Level1.GoalY1 = Game.QuadTransformations.Level1.fGoalY1();
                        Game.LastX = Game.QuadTransformations.Level1.GoalX1;
                        Game.LastY = Game.QuadTransformations.Level1.GoalY1;
                        Game.QuadTransformations.Level1.GoalX2 = Game.QuadTransformations.Level1.fGoalX2();
                        Game.QuadTransformations.Level1.GoalY2 = Game.QuadTransformations.Level1.fGoalY2();
                        Game.LastX2 = Game.QuadTransformations.Level1.GoalX2;
                        Game.LastY2 = Game.QuadTransformations.Level1.GoalY2;
                        break;
                    case 2:
                        Game.QuadTransformations.Level2.HorizontalShift = Game.QuadTransformations.Level2.fHorizontalShift();
                        Sign = (Game.QuadTransformations.Level2.HorizontalShift >= 0) ? "+" : "";
                        $('#h2').after("<span style='color:#FF0000;' class='Shifts'>" + Sign + Game.QuadTransformations.Level2.HorizontalShift + "</span>");
                        Game.QuadTransformations.Level2.GoalX1 = Game.QuadTransformations.Level2.fGoalX1();
                        Game.QuadTransformations.Level2.GoalY1 = Game.QuadTransformations.Level2.fGoalY1();
                        Game.LastX = Game.QuadTransformations.Level2.GoalX1;
                        Game.LastY = Game.QuadTransformations.Level2.GoalY1;
                        Game.QuadTransformations.Level2.GoalX2 = Game.QuadTransformations.Level2.fGoalX2();
                        Game.QuadTransformations.Level2.GoalY2 = Game.QuadTransformations.Level2.fGoalY2();
                        Game.LastX2 = Game.QuadTransformations.Level2.GoalX2;
                        Game.LastY2 = Game.QuadTransformations.Level2.GoalY2;
                        break;
                    case 3:
                        Game.QuadTransformations.Level3.Stretch = Game.fStretch();
                        $('#a').before("<span style='color:#FF0000' class='Shifts'>" + Game.QuadTransformations.Level3.Stretch + " * </span>");
                        Game.QuadTransformations.Level3.GoalX1 = Game.QuadTransformations.Level3.fGoalX1();
                        Game.QuadTransformations.Level3.GoalY1 = Game.QuadTransformations.Level3.fGoalY1();
                        Game.LastX = Game.QuadTransformations.Level3.GoalX1;
                        Game.LastY = Game.QuadTransformations.Level3.GoalY1;
                        Game.QuadTransformations.Level3.GoalX2 = Game.QuadTransformations.Level3.fGoalX2();
                        Game.QuadTransformations.Level3.GoalY2 = Game.QuadTransformations.Level3.fGoalY2();
                        Game.LastX2 = Game.QuadTransformations.Level3.GoalX2;
                        Game.LastY2 = Game.QuadTransformations.Level3.GoalY2;
                        break;
                    case 4:
                        Game.QuadTransformations.Level4.HorizontalShift = Game.QuadTransformations.Level4.fHorizontalShift();
                        Game.QuadTransformations.Level4.VerticalShift = Game.QuadTransformations.Level4.fVerticalShift();
                        Game.QuadTransformations.Level4.Stretch = Game.fStretch();
                        SignH = (Game.QuadTransformations.Level4.HorizontalShift >= 0) ? "+" : "";
                        SignV = (Game.QuadTransformations.Level4.VerticalShift >= 0) ? "+" : "";
                        $('#a').before("<span style='color:#FF0000' class='Shifts'>" + Game.QuadTransformations.Level4.Stretch + " * </span>");
                        $('#h2').after("<span style='color:#FF0000;' class='Shifts'>" + SignH + Game.QuadTransformations.Level4.HorizontalShift + "</span>");
                        $('#k2').after("<span style='color:#FF0000;' class='Shifts'>" + SignV + Game.QuadTransformations.Level4.VerticalShift + "</span>");
                        Game.QuadTransformations.Level4.GoalX1 = Game.QuadTransformations.Level4.fGoalX1();
                        Game.QuadTransformations.Level4.GoalY1 = Game.QuadTransformations.Level4.fGoalY1();
                        Game.LastX = Game.QuadTransformations.Level4.GoalX1;
                        Game.LastY = Game.QuadTransformations.Level4.GoalY1;
                        Game.QuadTransformations.Level4.GoalX2 = Game.QuadTransformations.Level4.fGoalX2();
                        Game.QuadTransformations.Level4.GoalY2 = Game.QuadTransformations.Level4.fGoalY2();
                        Game.LastX2 = Game.QuadTransformations.Level4.GoalX2;
                        Game.LastY2 = Game.QuadTransformations.Level4.GoalY2;
                        break;
                }
                break;
        }
        $(".Submit").on('click', Game.Check);
        $('input[type=text]').on('keypress', Game.PreventAlpha);
        $('input[type=text]').on('focus', function () {
            $(this).val("");
        });
        $('#exit').on('click', function () { Game.Exit(); });
        Game.Responsive.start();
    }
};