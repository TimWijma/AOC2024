import { readFile, printResult, removeAtIndex } from "../../helpers";

const input = readFile("input.txt");

const equations: [number, number[]][] = [];
for (let line of input) {
    let split = line.split(": ");
    let equation = parseInt(split[0]);
    let numbers = split[1].split(" ").map((n) => parseInt(n));
    equations.push([equation, numbers]);
}

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
    currentResult: number = numbers[0]
): boolean => {
    if (index === numbers.length - 1 || numbers.length < 1) {
        return currentResult === target;
    }

    let addition = calculateSum(
        target,
        numbers,
        index + 1,
        add(currentResult, numbers[index + 1])
    );
    let multiplication = calculateSum(
        target,
        numbers,
        index + 1,
        multiply(currentResult, numbers[index + 1])
    );

    let concatNumbers = removeAtIndex([...numbers], index + 1);
    let concatenation = calculateSum(
        target,
        concatNumbers,
        index,
        concat(currentResult, numbers[index + 1])
    );

    return addition || multiplication || concatenation;
};

const part1 = () => {
    let sum = 0;
    for (let [equation, numbers] of equations) {
        if (calculateSum(equation, numbers)) sum += equation;
    }

    return sum;
};

printResult(part1);
