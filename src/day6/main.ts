import { readFile, printResult } from "../../helpers";

const input = readFile("input.txt");

const map = input.map((line) => line.split(""));

const part1 = () => {
    let currentY = map.findIndex((row) => row.includes("^"));
    let currentX = map[currentY].indexOf("^");

    let directions = [0, 1, 0, -1];
    let xIndex = 0;
    let yIndex = 3;
    while (!outOfBounds(currentX, currentY)) {
        map[currentY][currentX] = "X";

        let tempX = currentX + directions[xIndex];
        let tempY = currentY + directions[yIndex];

        if (outOfBounds(tempX, tempY)) break;

        if (map[tempY][tempX] === "#") {
            xIndex = (xIndex + 1) % 4;
            yIndex = (yIndex + 1) % 4;
            currentX += directions[xIndex];
            currentY += directions[yIndex];
        } else {
            currentX = tempX;
            currentY = tempY;
        }
    }

    return map
        .map((l) => l.filter((c) => c === "X").length)
        .reduce((ps, a) => ps + a, 0);
};

const outOfBounds = (x: number, y: number) => {
    return y < 0 || y > map.length - 1 || x < 0 || x > map[y].length - 1;
};

printResult(part1);
