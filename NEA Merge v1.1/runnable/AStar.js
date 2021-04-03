let neighbours;
let neighbour;

function AStar() {

    resetValues();
    pathFinding = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].checkNeighbours(false);
        }
    }
    let startTime = window.performance.now();
    while (current !== end) {
        if (openStack.length > 0) {
            MostEfficientPath(true);

            if (current === end) {
                let endTime = window.performance.now();
                aTimeTaken = endTime - startTime;
                document.getElementById('aTimeTaken').innerHTML = aTimeTaken.toPrecision(5);
                document.getElementById('aSizeOfGrid').innerHTML = sizeOfGrid;
                aPath = [];
                let tempCurrent = current;
                aPath.push(tempCurrent);
                while (tempCurrent.previous) {
                    aPath.push(tempCurrent.previous);
                    tempCurrent = tempCurrent.previous;
                }
                aMoves = aPath.length;
                document.getElementById('aMoves').innerHTML = aMoves;

                for (let i in closedStack) {
                    noStroke();
                    closedStack[i].show(color(220));
                }
                alertUser.push({
                    title: "A*",
                    text: "TIME TAKEN: " + aTimeTaken.toPrecision(5) + " ms" + " || MOVES NEEDED: " + aMoves,
                    allowOutsideClick: false,
                });
            }
        }
    }
}

function MostEfficientPath(isAStar) {
    let lowestIndex = 0;

    for (let i = 0; i < openStack.length; i++) {
        if (openStack[i].f < openStack[lowestIndex].f) {
            lowestIndex = i;
        }
    }

    current = openStack[lowestIndex];

    //remove current from available moves
    const index = openStack.indexOf(current);
    if (index > -1) {
        openStack.splice(index, 1);
    }
    closedStack.push(current)
    neighbours = current.neighbours;

    for (let i in neighbours) {
        neighbour = neighbours[i];
        let pathFound = false;
        if (!(closedStack.includes(neighbour))) {
            let tempG = current.g + 1;

            if (openStack.includes(neighbour)) {
                if (tempG < neighbour.g) {
                    neighbour.g = tempG;
                    pathFound = true;
                }
            } else {
                neighbour.g = tempG
                pathFound = true;
                openStack.push(neighbour)
            }
            if (pathFound) {
                if (isAStar === true) {
                    neighbour.h = Math.abs(neighbour.i - end.i) + Math.abs(neighbour.j - end.j);
                    neighbour.f = neighbour.g + neighbour.h;
                } else{
                    neighbour.f = neighbour.g
                }
                neighbour.previous = current;
            }
        }
    }
}