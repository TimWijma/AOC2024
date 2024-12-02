import { readFile, printResult } from "../../helpers";

const input = readFile("input.txt");

const reports = input.map((line) =>
    line.split(" ").map((num) => parseInt(num))
);

const createReduced = (report: number[]) => {
    return report.slice(1).map((n, i) => report[i - 1] - n);
};

let reducedReports = reports.map((r) => createReduced(r));

const part1 = () => {
    return reducedReports.filter((r) => isSafe(r)).length;
};

const part2 = () => {
    let safe = 0;

    for (let report of reports) {
        let reducedReport = createReduced(report);

        if (isSafe(reducedReport)) {
            safe++;
            continue;
        }

        for (let i = 0; i < report.length; i++) {
            let newReport = createReduced(removeAtIndex(report, i));
            if (isSafe(newReport)) {
                safe++;
                break;
            }
        }
    }

    return safe;
};

const isSafe = (report: number[]) => {
    let valid = report.every((n) => Math.abs(n) < 4 && n !== 0);
    if (!valid) return false;

    let asc = report.every((n) => n > 0);
    if (asc) return true;

    let desc = report.every((n) => n < 0);
    return desc;
};

const removeAtIndex = (a: number[], i: number) => {
    let firstHalf = a.slice(0, i);
    let secondHalf = a.slice(i + 1);

    return firstHalf.concat(secondHalf);
};

printResult(part1, part2);
