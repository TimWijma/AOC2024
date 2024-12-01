import { readFile, printResult } from "../../helpers";

const input = readFile("input.txt");

let nums1: number[] = [];
let nums2: number[] = [];

for (let entry of input) {
    let nums = entry.split("   ").map((n) => parseInt(n));
    nums1.push(nums[0]);
    nums2.push(nums[1]);
}

const part1 = () => {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    let difference = 0;
    for (let i in nums1) {
        difference += Math.abs(nums1[i] - nums2[i]);
    }

    return difference;
};

const part2 = () => {
    let map: { [key: number]: number } = {};

    for (let num of nums2) {
        if (num in map) {
            map[num]++;
        } else {
            map[num] = 1;
        }
    }

    let sum = 0;
    for (let num of nums1) {
        if (!(num in map)) continue;
        sum += num * map[num];
    }

    return sum;
};

printResult(part1, part2);
