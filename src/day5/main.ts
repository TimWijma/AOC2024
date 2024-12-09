import { readFile, printResult } from "../../helpers";

const input = readFile("input.txt");

// Store direct relationships: if a is before b, rules[a] contains b
const rules: Map<number, Set<number>> = new Map();
const updates: number[][] = [];

for (let line of input) {
    if (!line) continue;

    if (line[2] === "|") {
        let [before, after] = line.split("|").map((n) => parseInt(n));

        let rule = rules.get(before);
        if (!rule) {
            rules.set(before, new Set([after]));
        } else {
            rule.add(after);
        }
    } else {
        updates.push(line.split(",").map((n) => parseInt(n)));
    }
}

const isValidOrder = (update: number[]): boolean => {
    // Check each pair of numbers in the update
    for (let i = 0; i < update.length; i++) {
        for (let j = i + 1; j < update.length; j++) {
            const before = update[i];
            const after = update[j];

            // If there's a rule saying after should come before before, the order is invalid
            if (rules.get(after)?.has(before)) {
                return false;
            }
        }
    }
    return true;
};

const getMiddle = (update: number[]): number => {
    let middle = Math.floor(update.length / 2);
    return update[middle];
};

const part1 = () => {
    return updates
        .filter(isValidOrder)
        .map((u) => getMiddle(u))
        .reduce((ps, a) => ps + a, 0);
};

const part2 = () => {
    return updates
        .filter((u) => !isValidOrder(u))
        .map((u) =>
            u
                .map((n) => [
                    n,
                    [...(rules.get(n) ?? [])].filter((n) => u.includes(n))
                        .length,
                ])
                .sort((a, b) => {
                    return b[1] - a[1];
                })
                .map(([num, _]) => num)
        )
        .map((u) => getMiddle(u))
        .reduce((ps, a) => ps + a, 0);
};

printResult(part1, part2);
