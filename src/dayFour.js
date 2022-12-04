import { readFileSync } from 'fs';

const data = readFileSync('./data/input04.txt', 'utf8')
  .trim()
  .split('\n')
  .map((line) =>
    line.split(',').map((arr) => arr.split('-').map((int) => parseInt(int, 10)))
  );

//Part One
const checkRangeEncompass = (arr) => {
  let count = 0;
  arr.map((x) => {
    const leftMin = x[0][0];
    const leftMax = x[0][1];
    const rightMin = x[1][0];
    const rightMax = x[1][1];
    if (leftMin <= rightMin && leftMax >= rightMax) {
      count += 1;
    } else if (rightMin <= leftMin && rightMax >= leftMax) {
      count += 1;
    }
  });
  return count;
};

//Part Two
const checkRangeOverlap = (arr) => {
  let count = 0;
  arr.map((x) => {
    const leftMin = x[0][0];
    const leftMax = x[0][1];
    const rightMin = x[1][0];
    const rightMax = x[1][1];
    if (leftMin <= rightMin && rightMin <= leftMax) {
      count += 1;
    } else if (rightMin <= leftMin && leftMin <= rightMax) {
      count += 1;
    }
  });
  return count;
};

console.log(checkRangeOverlap(data));
