var c = document.getElementById("rightboxCanvas");
var ctx = c.getContext("2d");
var rightbox = document.getElementById("rightbox");

var turtleImg = document.createElement("IMG");
turtleImg.src = "img/turtle.png";

var turtle = {
    reset: function() {
        this.x = c.width / 2;
        this.y = c.height / 2;
        this.ang = Math.PI / 2;
    }
};



turtleImg.onload = drawTurtle();

function drawTurtle() {
    ctx.clearRect(0, 0, c.width, c.height);
    turtle.reset();
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(turtle.x, turtle.y);

    var ic = 0; // instruction counter
    var repCount = []; // repeat counter with [repeat_times_count_down, ic_of_repeat_instruction]

    console.log(instructions);

    while (ic < instructions.length || repCount.length > 0) {
        // special case: reach the end of ic but still in a repeat loop (missing repeatEnd).
        // in this case, perform as if there are repeatEnds.
        if (ic >= instructions.length) {
            var lastRC = repCount[repCount.length - 1];
            if (lastRC[0] > 0) {
                ic = lastRC[1];
                repCount[repCount.length - 1][0] -= 1;
            } else {
                repCount.pop();
            }
        } else {
            var inst = getInst(ic);
            if (inst !== undefined) {
                if (inst[0] == inst_repeatEnd) {
                    // if repeat_times_count_down < 0 (special treatment for instructions like "repeat 0": most enveloped instructions won't be executed, except repeat, repeatEnd)
                    // special case: repeatEnd appears when no appropriate repeat ahead: ignore
                    if (repCount.length == 0) {} else {
                        var lastRC = repCount[repCount.length - 1];
                        if (lastRC[0] > 0) {
                            ic = lastRC[1];
                            repCount[repCount.length - 1][0] -= 1;
                        } else {
                            repCount.pop();
                        }
                    }
                } else if (inst[0] == inst_repeat) {
                    repCount.push([inst[1] - 1, ic]);
                } else if (repCount.length == 0 || repCount[repCount.length - 1][0] >= 0) {
                    inst[0](inst[1], turtle);
                }
            }
        }

        if (ic < instructions.length) { ic += 1; }
        if (repCount.length > 32) { break; }
    }

    // draw the turtle
    ctx.save();
    ctx.translate(turtle.x, turtle.y);
    ctx.rotate(-turtle.ang);
    ctx.drawImage(turtleImg, -turtleImg.width / 2, -turtleImg.height / 2);
    ctx.restore();
};