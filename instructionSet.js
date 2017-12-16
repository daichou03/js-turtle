var inst_parse = {
    // inst_forward
    forward: inst_forward,
    fd: inst_forward,
    // inst_rightturn
    rightturn: inst_rightturn,
    rt: inst_rightturn,
    // inst_repeat
    repeat: inst_repeat,
    // inst_repeatEnd
    next: inst_repeatEnd,
    repeatend: inst_repeatEnd,
    repeatEnd: inst_repeatEnd,
};

function inst_forward(value, turtle) {
    var tx0 = turtle.x;
    var ty0 = turtle.y;
    var tang = turtle.ang;
    var tx1 = tx0 + value * Math.cos(tang);
    var ty1 = ty0 - value * Math.sin(tang);
    // draw line with turtle forward
    ctx.lineTo(tx1, ty1);
    ctx.stroke();
    // update turtle place
    turtle.x = tx1;
    turtle.y = ty1;
};

function inst_rightturn(value, turtle) {
    turtle.ang -= value / 180 * Math.PI;
};

function inst_repeat(value, turtle) {};

function inst_repeatEnd(value, turtle) {};