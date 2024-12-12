import { readFile, printResult } from "../../helpers";

const input = readFile("input.txt").map((line) => line.split(""));

let frequencyMap: Map<string, number[][]> = new Map();
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        let char = input[y][x];
        if (char === ".") continue;

        if (frequencyMap.has(char)) {
            const antennas = frequencyMap.get(char) || [];
            antennas.push([x, y]);
            frequencyMap.set(char, antennas);
        } else {
            frequencyMap.set(char, [[x, y]]);
        }
    }
}

const outOfBounds = (x: number, y: number) => {
    return y < 0 || y > input.length - 1 || x < 0 || x > input[y].length - 1;
};

const createAntinode = (nodeA: number[], nodeB: number[]) => {
    let dx = nodeB[0] - nodeA[0];
    let dy = nodeB[1] - nodeA[1];

    let nodeC = [nodeB[0] + dx, nodeB[1] + dy];
    let nodeD = [nodeA[0] - dx, nodeA[1] - dy];

    return [nodeC, nodeD];
};

const part1 = () => {
    let antinodesMap: number[][] = Array(input.length)
        .fill(0)
        .map(() => Array(input[0].length).fill(0));

    for (let [_, nodes] of frequencyMap) {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let nodeA = nodes[i];
                let nodeB = nodes[j];

                let [nodeC, nodeD] = createAntinode(nodeA, nodeB);

                if (!outOfBounds(nodeC[0], nodeC[1])) {
                    antinodesMap[nodeC[1]][nodeC[0]] = 1;
                }
                if (!outOfBounds(nodeD[0], nodeD[1])) {
                    antinodesMap[nodeD[1]][nodeD[0]] = 1;
                }
            }
        }
    }

    return antinodesMap.flat().reduce((ps, a) => ps + a, 0);
};

const part2 = () => {
    let antinodesMap: number[][] = Array(input.length)
        .fill(0)
        .map(() => Array(input[0].length).fill(0));

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            let char = input[y][x];
            if (char === ".") continue;
            if ((frequencyMap.get(char) || []).length <= 1) continue;
            
            antinodesMap[y][x] = 1;
        }
    }

    for (let [frequency, nodes] of frequencyMap) {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let nodeA = nodes[i];
                let nodeB = nodes[j];

                let dx = nodeB[0] - nodeA[0];
                let dy = nodeB[1] - nodeA[1];

                let nodeC = [nodeB[0] + dx, nodeB[1] + dy];
                let nodeD = [nodeA[0] - dx, nodeA[1] - dy];

                let k = 2;
                while (!outOfBounds(nodeC[0], nodeC[1])) {
                    antinodesMap[nodeC[1]][nodeC[0]] = 1;
                    if (input[nodeC[1]][nodeC[0]] === ".") {
                        input[nodeC[1]][nodeC[0]] = "#";
                    }
                    nodeC = [nodeB[0] + dx * k, nodeB[1] + dy * k];
                    k++;
                }
                k = 2;
                while (!outOfBounds(nodeD[0], nodeD[1])) {
                    antinodesMap[nodeD[1]][nodeD[0]] = 1;
                    if (input[nodeD[1]][nodeD[0]] === ".") {
                        input[nodeD[1]][nodeD[0]] = "#";
                    }
                    nodeD = [nodeA[0] - dx * k, nodeA[1] - dy * k];
                    k++;
                }
            }
        }
    }

    return antinodesMap.flat().reduce((ps, a) => ps + a, 0);
};

printResult(part1, part2);
