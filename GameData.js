/* 
    GameData.js- Stores level data
        Goal points (x,y) are made through the respective level functions and saved
        Transformation data is saved here.

        Random algorithm works like this:
            Math.floor(Math.random() * (end - start + 1) + start);
        and for lists....
            myArray[Math.floor(Math.random() * myArray.length)];

        Game.Level keeps track of players progress
        Game.LastX/Game.LastY keeps track of points for responsive.js
        TransformTimes/SubLevel keeps track of Transformation levels
*/
Game = {
    TransformTimes: 4,
    Score: 0,
    SubLevel: 1,
    fStretch: function () {
        myChoices = [-2, -1, -0.5, 0.5, 1, 2];
        return myChoices[Math.floor(Math.random() * myChoices.length)];
    }
};

Game.Tutorial = {
    fGoalX: function () {
        return Math.floor((Math.random() * 6) + 2);
    },
    fGoalY: function () {
        return Math.floor((Math.random() * 5) + 2);
    }
};

Game.Coordinate = {
    fGoalX1: function () {
        return Math.floor((Math.random() * 5) + 3);
    },
    fGoalY1: function () {
        return Math.floor((Math.random() * 3) + 1);
    }
};

Game.Linear = {
    fGoalX1: function () {
        return Math.floor((Math.random() * 7) + 2);
    },
    fGoalY1: function () {
        return Math.floor((Math.random() * 6) + 2);
    },
    fGoalX2: function () {
        X2 = Math.floor((Math.random() * 7) + 2);
        if (X2 == this.GoalX1) {
            this.fGoalX2();
        }
        return X2;
    },
    fGoalY2: function () {
        return Math.floor((Math.random() * 6) + 2);
    }
};

Game.StandLinear = {
    fGoalX1: function () {
        return Math.floor((Math.random() * 7) + 2);
    },
    fGoalY1: function () {
        return Math.floor((Math.random() * 6) + 2);
    },
    fGoalX2: function () {
        X2 = Math.floor((Math.random() * 7) + 2);
        if (X2 == this.GoalX1) {
            this.fGoalX2();
        }
        return X2;
    },
    fGoalY2: function () {
        return Math.floor((Math.random() * 6) + 2);
    }
};

Game.SimpleQuad = {
    fGoalX: function () {
        return Math.floor((Math.random() * 5) + 3);
    },
    fGoalY: function () {
        return Math.floor((Math.random() * 3) + 1);
    }
};

Game.StandardQuad = {
    fGoalX1: function () {
        return Math.floor((Math.random() * 5) + 3);
    },
    fGoalY1: function () {
        return Math.floor((Math.random() * 3) + 1);
    },
    fGoalX2: function () {
        return this.GoalX1 + Math.floor((Math.random() * 2) + 1);
    },
    fGoalY2: function () {
        return this.GoalY1 + Math.floor((Math.random() * 4) + 1);
    }
};

Game.GeneralQuad = {
    fGoalX1: function () {
        return Math.floor((Math.random() * 5) + 3);
    },
    fGoalY1: function () {
        return Math.floor((Math.random() * 3) + 1);
    },
    fGoalX2: function () {
        return this.GoalX1 + Math.floor((Math.random() * 2) + 1);
    },
    fGoalY2: function () {
        return this.GoalY1 + Math.floor((Math.random() * 4) + 1);
    }
};

Game.ZeroQuad = {
    fGoalX1: function () {
        return Math.floor((Math.random() * 5) + 3);
    },
    fGoalX2: function () {
        return this.GoalX1 + Math.floor((Math.random() * 2) + 1);
    },
    GoalY1: 0,
    GoalY2: 0
};

Game.LinearTransformations = {
    Level1: {
        fGoalX1: function () {
            return Math.floor((Math.random() * 7) + 2);
        },
        fGoalY1: function () {
            return Math.floor((Math.random() * 4) + 2);
        },
        fGoalX2: function () {
            X2 = Math.floor((Math.random() * 7) + 2);
            if (X2 == this.GoalX1) {
                this.fGoalX2();
            }
            return X2;
        },
        fGoalY2: function () {
            return Math.floor((Math.random() * 4) + 2);
        },
        fVerticalShift: function () {
            return Math.floor((Math.random() * 5) - 2);
        }
    },

    Level2: {
        fGoalX1: function () {
            return Math.floor((Math.random() * 6) + 2);
        },
        fGoalY1: function () {
            return Math.floor(Math.random() * 7);
        },
        fGoalX2: function () {
            X2 = Math.floor((Math.random() * 6) + 2);
            if (X2 == this.GoalX1) {
                this.fGoalX2();
            }
            return X2;
        },
        fGoalY2: function () {
            return Math.floor(Math.random() * 7);
        },
        fHorizontalShift: function () {
            return Math.floor((Math.random() * 5) - 2);
        }
    },

    Level3: {
        fGoalX1: function () {
            return Math.floor((Math.random() * 6) + 2);
        },
        fGoalY1: function () {
            return Math.floor(Math.random() * 7);
        },
        fGoalX2: function () {
            X2 = Math.floor((Math.random() * 6) + 2);
            if (X2 == this.GoalX1) {
                this.fGoalX2();
            }
            return X2;
        },
        fGoalY2: function () {
            return Math.floor(Math.random() * 7);
        }
    },

    Level4: {
        fGoalX1: function () {
            return Math.floor((Math.random() * 6) + 2);
        },
        fGoalY1: function () {
            return Math.floor((Math.random() * 4) + 2);
        },
        fGoalX2: function () {
            X2 = Math.floor((Math.random() * 6) + 2);
            if (X2 == this.GoalX1) {
                this.fGoalX2();
            }
            return X2;
        },
        fGoalY2: function () {
            return Math.floor((Math.random() * 4) + 2);
        },
        fVerticalShift: function () {
            return Math.floor((Math.random() * 5) - 2);
        },
        fHorizontalShift: function () {
            return Math.floor((Math.random() * 5) - 2);
        }
    }
};

Game.QuadTransformations = {
    Level1: {
        fGoalX1: function () {
            return Math.floor((Math.random() * 5) + 3);
        },
        fGoalY1: function () {
            return Math.floor((Math.random() * 3) + 1);
        },
        fGoalX2: function () {
            return this.GoalX1 + Math.floor((Math.random() * 2) + 1);
        },
        fGoalY2: function () {
            return this.GoalY1 + Math.floor((Math.random() * 4) + 1);
        },
        fVerticalShift: function () {
            return Math.floor((Math.random() * 5) - 2);
        }
    },
    Level2: {
        fGoalX1: function () {
            return Math.floor((Math.random() * 5) + 3);
        },
        fGoalY1: function () {
            return Math.floor((Math.random() * 3) + 1);
        },
        fGoalX2: function () {
            return this.GoalX1 + Math.floor((Math.random() * 2) + 1);
        },
        fGoalY2: function () {
            return this.GoalY1 + Math.floor((Math.random() * 4) + 1);
        },
        fHorizontalShift: function () {
            return Math.floor((Math.random() * 5) - 2);
        }
    },
    Level3: {
        fGoalX1: function () {
            return Math.floor((Math.random() * 5) + 3);
        },
        fGoalY1: function () {
            return Math.floor((Math.random() * 3) + 1);
        },
        fGoalX2: function () {
            return this.GoalX1 + Math.floor((Math.random() * 2) + 1);
        },
        fGoalY2: function () {
            return this.GoalY1 + Math.floor((Math.random() * 4) + 1);
        }
    },
    Level4: {
        fGoalX1: function () {
            return Math.floor((Math.random() * 5) + 3);
        },
        fGoalY1: function () {
            return Math.floor((Math.random() * 3) + 1);
        },
        fGoalX2: function () {
            return this.GoalX1 + Math.floor((Math.random() * 2) + 1);
        },
        fGoalY2: function () {
            return this.GoalY1 + Math.floor((Math.random() * 4) + 1);
        },
        fVerticalShift: function () {
            return Math.floor((Math.random() * 5) - 2);
        },
        fHorizontalShift: function () {
            return Math.floor((Math.random() * 5) - 2);
        }
    }
};