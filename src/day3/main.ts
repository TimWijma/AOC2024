import { readFile, printResult } from "../../helpers";

const input = readFile("example.txt");

const part1 = () => {
    return input
        .map((line) => {
            return (
                line
                    .match(/mul\(\d{1,3},\d{1,3}\)/g)
                    ?.map((s) => s.toString()) || []
            );
        })
        .flat()
        .map((group) => parseMult(group))
        .map((group) => group[0] * group[1])
        .reduce((ps, a) => ps + a, 0);
};

const part2 = () => {
    let groups = input
        .map((line) => {
            return (
                line
                    .match(/mul\(\d{1,3},\d{1,3}\)|don't|do/g)
                    ?.map((s) => s.toString()) || []
            );
        })
        .flat();
    console.log(groups);

    let sum = 0;
    let doMult = true;
    for (let group of groups) {
        if (group === "do") {
            doMult = true;
        } else if (group === "don't") {
            doMult = false;
        } else if (doMult) {
            let mult = parseMult(group);
            sum += mult[0] * mult[1];
        }
    }

    return sum;
};

const parseMult = (group: string) => {
    return group
        .replace(/[^\d,]/g, "")
        .split(",")
        .map((n) => parseInt(n));
};

printResult(part1, part2);
