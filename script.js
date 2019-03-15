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
    return [parseInt(document.getElementById("input_0").value),
    parseInt(document.getElementById("input_1").value),
    parseInt(document.getElementById("input_2").value),
    parseInt(document.getElementById("input_3").value)];
}

function submit() {
    var node = new Node(getValues());
    node.scoreChildren(0, 0, true, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);    
    document.getElementById("output_0").value = node.bestTurn[0];
    document.getElementById("output_1").value = node.bestTurn[1];
    document.getElementById("output_2").value = node.bestTurn[2];
    document.getElementById("output_3").value = node.bestTurn[3];
    document.getElementById("score").value = node.score;
}