import { readFileSync } from 'fs';
import { input } from './dayOneInput.js';

const data = readFileSync('./data/input01.txt', 'utf8').split('\n');

// const input = require('./input');

// const sum = (ns) => ns.reduce((sum, n) => sum + n, 0);

// const sums = input.map(sum).sort((a, b) => b - a);

// const [best] = sums;
// const topThree = sum(sums.slice(0, 3));

// console.log({ best, topThree });

const getHighestSums = (arr) => {
  //Part One
  const newArr = arr
    .map((x) => x.reduce((a, b) => a + b))
    .sort((a, b) => b - a);

  //Part Two
  let topThree = [];
  for (let i = 0; i < 3; i++) {
    topThree.push(newArr[i]);
  }
  return topThree.reduce((a, b) => a + b);
};

console.log(getHighestSums(input));
