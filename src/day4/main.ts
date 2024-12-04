import { readFile, printResult } from "../../helpers";

const input = readFile("input.txt");

const part1 = () => {
    let xmas = 0;
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            let letter = input[y][x];
            if (letter !== "X") continue;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    let newY = y + i;
                    let newX = x + j;

                    if (outOfBounds(newX, newY)) continue;
                    let neighbour = input[newY][newX];
                    if (neighbour !== "M") continue;

                    newY += i;
                    newX += j;

                    if (outOfBounds(newX, newY)) continue;
                    neighbour = input[newY][newX];
                    if (neighbour !== "A") continue;

                    newY += i;
                    newX += j;

                    if (outOfBounds(newX, newY)) continue;
                    neighbour = input[newY][newX];
                    if (neighbour !== "S") continue;

                    xmas++;
                }
            }
        }
    }

    return xmas;
};

const part2 = () => {
    let xmas = 0;
    for (let y = 1; y < input.length - 1; y++) {
        for (let x = 1; x < input[y].length - 1; x++) {
            let letter = input[y][x];
            if (letter !== "A") continue;

            let neighbours = [
                input[y - 1][x - 1],
                input[y - 1][x + 1],
                input[y + 1][x + 1],
                input[y + 1][x - 1],
            ];

            let neighbours_sorted = [...neighbours].sort();
            if (
                neighbours_sorted[0] !== "M" ||
                neighbours_sorted[1] !== "M" ||
                neighbours_sorted[2] !== "S" ||
                neighbours_sorted[3] !== "S"
            ) {
                continue
            }

            if (neighbours[0] === neighbours[2] || neighbours[1] === neighbours[3]) continue;

            xmas++;
        }
    }

    return xmas;
};

const outOfBounds = (x: number, y: number) => {
    return y < 0 || y > input.length - 1 || x < 0 || x > input[y].length - 1;
};

printResult(part1, part2);
