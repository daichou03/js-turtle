var instform = document.getElementById("instform");
var instructions = [];

function getInst(index) {
    if (index >= instructions.length) {
        console.log("Instruction out of range when fetching");
        return undefined;
    }
    var input_l = instructions[index][0];
    var input_r = instructions[index][1];
    if (inst_parse[input_l.value] === undefined) {
        input_l.style.backgroundColor = "#990000";
        console.log("Instruction " + input_l.value + " cannot be recognised.");
        return undefined;
    }
    // this instruction is taken
    var inst = input_l.value;
    input_l.style.backgroundColor = "black";
    var ivalue = parseInt(input_r.value);
    if (isNaN(ivalue)) {
        if (ivalue != "") {
            input_r.style.backgroundColor = "#999900";
            console.log("Value " + ivalue + " is not a number. Will be taken as 0");
        } else {
            input_r.style.backgroundColor = "black";
        }
        ivalue = 0;
    } else {
        input_r.style.backgroundColor = "black";
    }
    return [inst_parse[inst], ivalue];
}

function newInst() {
    var nxtLine = document.createElement("p");
    nxtLine.className = "iline";
    instform.appendChild(nxtLine);

    var nxtLeftInput = document.createElement("input");
    nxtLeftInput.className = "instruction";
    nxtLeftInput.onchange = drawTurtle;
    nxtLine.appendChild(nxtLeftInput);

    var nxtRightInput = document.createElement("input");
    nxtRightInput.className = "ivalue";
    nxtRightInput.onchange = drawTurtle;
    nxtLine.appendChild(nxtRightInput);

    instructions.push([nxtLeftInput, nxtRightInput]);
}