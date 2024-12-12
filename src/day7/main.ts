import { readFile, printResult, removeAtIndex } from "../../helpers";

const input = readFile("input.txt");

const equations: [number, number[]][] = input.map((line) => {
    let split = line.split(": ");
    return [parseInt(split[0]), split[1].split(" ").map((n) => parseInt(n))];
});

const add = (a: number, b: number) => {
    return a + b;
};
const multiply = (a: number, b: number) => {
    return a * b;
};
const concat = (a: number, b: number) => {
    return parseInt(`${a}${b}`);
};

const calculateSum = (
    target: number,
    numbers: number[],
    index: number = 0,
    currentResult: number = numbers[0],
    part2 = false
): boolean => {
    if (currentResult > target) return false;

    if (index === numbers.length - 1 || numbers.length < 1) {
        return currentResult === target;
    }

    let addition = calculateSum(
        target,
        numbers,
        index + 1,
        add(currentResult, numbers[index + 1]),
        part2
    );

    if (addition) return true;

    let multiplication = calculateSum(
        target,
        numbers,
        index + 1,
        multiply(currentResult, numbers[index + 1]),
        part2
    );

    if (multiplication) return true;

    if (!part2) return false;

    let concatNumbers = removeAtIndex([...numbers], index + 1);
    let concatenation = calculateSum(
        target,
        concatNumbers,
        index,
        concat(currentResult, numbers[index + 1]),
        part2
    );

    return concatenation;
};

const part1 = () => {
    return equations
        .filter(([equation, numbers]) => calculateSum(equation, numbers))
        .reduce((ps, [equation]) => ps + equation, 0);
};

const part2 = () => {
    return equations
        .filter(([equation, numbers]) =>
            calculateSum(equation, numbers, 0, numbers[0], true)
        )
        .reduce((ps, [equation]) => ps + equation, 0);
};

printResult(part1, part2);
