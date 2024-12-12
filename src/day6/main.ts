import { readFile, printResult } from "../../helpers";

const input = readFile("input.txt");

const map = input.map((line) => line.split(""));

const directions = [0, 1, 0, -1];

const createMap = () => {
    let inputCopy = [...input];
    return inputCopy.map((line) => line.split(""));
};

const outOfBounds = (x: number, y: number) => {
    return y < 0 || y > map.length - 1 || x < 0 || x > map[y].length - 1;
};

const turn = (x: number, y: number, xDir: number, yDir: number) => {
    let newXDir = (xDir + 1) % 4;
    let newYDir = (yDir + 1) % 4;
    let newX = x + directions[newXDir];
    let newY = y + directions[newYDir];

    return [newX, newY, newXDir, newYDir];
};

const guardY = map.findIndex((row) => row.includes("^"));
const guardX = map[guardY].indexOf("^");
map[guardY][guardX] = "#";

const part1 = () => {
    let map = createMap();

    let currentY = guardY;
    let currentX = guardX;

    let xIndex = 0;
    let yIndex = 3;
    while (!outOfBounds(currentX, currentY)) {
        map[currentY][currentX] = "X";

        let tempX = currentX + directions[xIndex];
        let tempY = currentY + directions[yIndex];

        if (outOfBounds(tempX, tempY)) break;

        while (map[tempY][tempX] === "#") {
            [tempX, tempY, xIndex, yIndex] = turn(
                currentX,
                currentY,
                xIndex,
                yIndex
            );
        }

        currentX = tempX;
        currentY = tempY;
    }

    return map
        .map((l) => l.filter((c) => c === "X").length)
        .reduce((ps, a) => ps + a, 0);
};

const part2 = () => {
    let loops = 0;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            let map = createMap();

            if (map[y][x] === "#") continue;
            map[y][x] = "#";

            let currentY = guardY;
            let currentX = guardX;

            let xIndex = 0;
            let yIndex = 3;
            let visited: Set<String> = new Set();
            outerLoop: while (!outOfBounds(currentX, currentY)) {
                let tempX = currentX + directions[xIndex];
                let tempY = currentY + directions[yIndex];

                if (outOfBounds(tempX, tempY)) break;

                while (map[tempY][tempX] === "#") {
                    [tempX, tempY, xIndex, yIndex] = turn(
                        currentX,
                        currentY,
                        xIndex,
                        yIndex
                    );

                    let positionIndex = `${tempX},${tempY},${xIndex},${yIndex}`;
                    if (visited.has(positionIndex)) {
                        loops++;
                        break outerLoop;
                    }
                    visited.add(positionIndex);
                }

                currentX = tempX;
                currentY = tempY;
            }
        }
    }

    return loops;
};

printResult(part1, part2);
