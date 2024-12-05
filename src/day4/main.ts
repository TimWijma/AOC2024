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

                    for (let n = 0; n < 3; n++) {
                        if (
                            outOfBounds(newX, newY) ||
                            input[newY][newX] !== "MAS"[n]
                        )
                            break;

                        newY += i;
                        newX += j;

                        if (n === 2) xmas++;
                    }
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
            if (input[y][x] !== "A") continue;

            let neighboursOne = [input[y - 1][x - 1], input[y + 1][x + 1]].sort();
            let neighboursTwo = [input[y - 1][x + 1], input[y + 1][x - 1]].sort();

            if (neighboursOne[0] !== "M" || neighboursOne[1] !== "S") continue;
            if (neighboursTwo[0] !== "M" || neighboursTwo[1] !== "S") continue;

            xmas++;
        }
    }

    return xmas;
};

const outOfBounds = (x: number, y: number) => {
    return y < 0 || y > input.length - 1 || x < 0 || x > input[y].length - 1;
};

printResult(part1, part2);
