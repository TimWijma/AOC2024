import { readFile, printResult, removeAtIndex } from "../../helpers";

const input = readFile("input.txt");

const reports = input.map((line) =>
    line.split(" ").map((num) => parseInt(num))
);

const createReduced = (report: number[]) => {
    let reducedReport: number[] = [];
    for (let i = 1; i < report.length; i++) {
        let prevNum = report[i - 1];
        let currNum = report[i];
        let diff = prevNum - currNum;

        reducedReport.push(diff);
    }

    return reducedReport;
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

printResult(part1, part2);
