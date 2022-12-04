import { readFileSync } from 'fs';
import _ from 'lodash';

// Part One

const halfIndex = (str) => {
  return Math.ceil(str.length / 2);
};

const data = readFileSync('./data/input04.txt', 'utf8')
  .trim()
  .split('\n')
  .map((line) => {
    const halfIndex = line.length / 2;
    const left = line.slice(0, halfIndex);
    const right = line.slice(halfIndex);
    return [left, right];
  });

const calculatePriority = (char) => {
  if (char == char.toUpperCase()) {
    return char.charCodeAt(0) - 38;
  } else {
    return char.charCodeAt(0) - 96;
  }
};

const findCommonItems = ([left, right]) => {
  let commonItems = [];
  for (const leftChar of left.split('')) {
    if (right.includes(leftChar)) {
      commonItems.push(leftChar);
    }
  }
  commonItems = [...new Set(commonItems)];

  return {
    common: commonItems[0],
    priority: calculatePriority(commonItems[0]),
  };
};

const parsedData = data.map(findCommonItems);

const getSum = (parsedData) => {
  let sum = 0;
  for (const data of parsedData) {
    sum += data.priority;
  }
  return sum;
};

const sum = getSum(parsedData);

console.log({ sum });

// Part Two

const data2 = readFileSync('./data/input03.txt', 'utf8').trim().split('\n');

const chunkedData = _.chunk(data2, 3);
console.log(chunkedData);

const findCommonItems2 = ([one, two, three]) => {
  let commonItems = [];
  for (const char of one.split('')) {
    if (two.includes(char) && three.includes(char)) {
      commonItems.push(char);
    }
  }
  commonItems = [...new Set(commonItems)];

  return {
    common: commonItems[0],
    priority: calculatePriority(commonItems[0]),
  };
};

const parsedData2 = chunkedData.map(findCommonItems2);

const sum2 = getSum(parsedData2);

console.log({ sum2 });
