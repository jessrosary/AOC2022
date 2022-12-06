import { readFileSync } from 'fs';

const inputData = readFileSync('./data/input05.txt', 'utf8').trimRight();

let [stacksLines, moveLines] = inputData
  .split('\n\n')
  .map((x) => x.split('\n'));

const stackNumbers = stacksLines.pop();

let crateIndexes = [];
for (let i = 0; i < stackNumbers.length; i++) {
  const char = stackNumbers[i];

  if (/\S+/.test(char)) {
    crateIndexes.push(i);
  }
}

let stacks = [];
for (const index of crateIndexes) {
  let stack = [];
  for (const stackLine of stacksLines) {
    const crate = stackLine[index];
    if (/\S+/.test(crate)) {
      stack.unshift(crate);
    }
  }
  stacks.push(stack);
}

const directions = moveLines.map((direction) => {
  let nums = [];
  direction.split(' ').map((x, i) => {
    if (i === 1 || i === 3 || i === 5) {
      nums.push(parseInt(x));
    }
  });
  return nums;
});

for (const move of directions) {
  const numCrates = move[0];
  const fromIndex = move[1] - 1;
  const toIndex = move[2] - 1;
  let crates = stacks[fromIndex].splice(-numCrates);
  stacks[toIndex].push(...crates);
}

const lasts = stacks.map((stack) => stack[stack.length - 1]).join('');

console.log({ stacks, lasts });
