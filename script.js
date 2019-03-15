class Node {
    constructor(values) {
        this.values = Array.from(values);
        this.bestTurn = null;
        this.score = 0;
    }

    scoreChildren(depth, scoringPlayer, maximizing, alpha, beta) {
        if (this.values.every(x => x === 0)) {
            this.score = (depth % 2 === scoringPlayer) ? 1 : -1;
            return;
        }

        var value = maximizing ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
        var a = alpha;
        var b = beta;

        for (var r = 0; r < 4; r++ ) {
            for (var i = 0; i < this.values[r]; i++) {
                var child = new Node(this.values);
                child.values[r] = i;
    
                child.scoreChildren(depth + 1, scoringPlayer, !maximizing, a, b);
    
                if (maximizing) {
                    if (child.score > value) {
                        value = child.score;
                        this.bestTurn = child.values;
                    }
                    a = Math.max(a, value);
                    if (a >= b) {
                        break;
                    }
                } 
                else {
                    if (child.score < value) {
                        value = child.score;
                        this.bestTurn = child.values;
                    }
                    b = Math.min(b, value);
                    if (a >= b) {
                        break;
                    }
                }
            }
        }
        this.score = value;
    }    
}

function getValues() {
    return [parseInt(document.getElementById("input-0").value),
    parseInt(document.getElementById("input-1").value),
    parseInt(document.getElementById("input-2").value),
    parseInt(document.getElementById("input-3").value)];
}

function decrement(id) {
    var element = document.getElementById(id)
    element.value = Math.max(parseInt(element.value) - 1, 0);
}

function calculate() {
    var node = new Node(getValues());
    node.scoreChildren(0, 0, true, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);    
    document.getElementById("output-0").value = node.bestTurn[0];
    document.getElementById("output-1").value = node.bestTurn[1];
    document.getElementById("output-2").value = node.bestTurn[2];
    document.getElementById("output-3").value = node.bestTurn[3];
    document.getElementById("score").value = node.score;
    if (document.getElementById("input-0").value !== document.getElementById("output-0").value) {
        setHighlightedOutput(0);
    }
    else if (document.getElementById("input-1").value !== document.getElementById("output-1").value) {
        setHighlightedOutput(1);
    }
    else if (document.getElementById("input-2").value !== document.getElementById("output-2").value) {
        setHighlightedOutput(2);
    }
    else if (document.getElementById("input-3").value !== document.getElementById("output-3").value) {
        setHighlightedOutput(3);
    }
}

function reset() {
    document.getElementById("input-0").value = 1;
    document.getElementById("input-1").value = 3;
    document.getElementById("input-2").value = 5;
    document.getElementById("input-3").value = 7;
    document.getElementById("output-0").value = "";
    document.getElementById("output-1").value = "";
    document.getElementById("output-2").value = "";
    document.getElementById("output-3").value = "";
    document.getElementById("score").value = "";
    setHighlightedOutput(-1);
}

function copy() {
    document.getElementById("input-0").value = document.getElementById("output-0").value;
    document.getElementById("input-1").value = document.getElementById("output-1").value;
    document.getElementById("input-2").value = document.getElementById("output-2").value;
    document.getElementById("input-3").value = document.getElementById("output-3").value;
}

function setHighlightedOutput(row) {
    document.getElementById("output-label-0").classList.remove("highlighted-row");
    document.getElementById("output-label-1").classList.remove("highlighted-row");
    document.getElementById("output-label-2").classList.remove("highlighted-row");
    document.getElementById("output-label-3").classList.remove("highlighted-row");
    if (row !== -1) {
        document.getElementById("output-label-" + row).classList.add("highlighted-row");
    }
}