import { readFileSync } from 'fs';

const data = readFileSync('./data/input04.txt', 'utf8')
  .trim()
  .split('\n')
  .map((line) =>
    line.split(',').map((arr) => arr.split('-').map((x) => parseInt(x)))
  );

//Part One
const checkRangeEncompass = (arr) => {
  let count = 0;
  arr.map(([[leftMin, leftMax], [rightMin, rightMax]]) => {
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
  arr.map(([[leftMin, leftMax], [rightMin, rightMax]]) => {
    if (leftMin <= rightMin && rightMin <= leftMax) {
      count += 1;
    } else if (rightMin <= leftMin && leftMin <= rightMax) {
      count += 1;
    }
  });
  return count;
};

console.log(checkRangeOverlap(data));
