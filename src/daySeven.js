import { readFileSync } from 'fs';
import treeify from 'treeify';
import _ from 'lodash';

// const testData = readFileSync('./data/input07-test.txt', 'utf8')
const inputData = readFileSync('./data/input07.txt', 'utf8');

const log = (...data) => console.log(...data);
log.tree = (o) => log(treeify.asTree(o, true, true));

// Main

const parseTree = (data) => {
  const isFile = (first) => Number.isInteger(parseInt(first));
  const isDirectory = (first) => first === 'dir';
  const isCommand = (first) => first === '$';
  const isCdRoot = (second, third) => second === 'cd' && third === '/';
  const isCdUp = (second, third) => second === 'cd' && third === '..';
  const isCdDown = (second, third) =>
    second === 'cd' && !isCdRoot(second, third) && !isCdUp(second, third);
  const isLs = (second) => second === 'ls';

  const lines = data
    .trim()
    .split('\n')
    .map((line) => line.split(' '));

  let tree = {};
  let paths = ['/'];
  for (const line of lines) {
    if (isCommand(line[0])) {
      const command = line[1];
      const arg = line[2];

      if (isLs(command)) {
        // no-op
      } else if (isCdRoot(command, arg)) {
        paths = ['/'];
      } else if (isCdUp(command, arg)) {
        paths.pop();
      } else if (isCdDown(command, arg)) {
        paths.push(arg);
      }
    } else {
      const [first, second] = line;

      if (isFile(first)) {
        const size = parseInt(first);
        const filename = second;

        _.set(tree, [...paths, filename], size);
      } else if (isDirectory(first)) {
        const dirname = second;

        _.update(tree, [...paths, dirname], (t) => (t ? t : {}));
      }
    }
  }

  return tree;
};

const getSizeFiles = (tree) => {
  let sizeFiles = 0;
  for (const [key, value] of Object.entries(tree)) {
    if (Number.isInteger(value)) {
      sizeFiles += value;
    }
  }
  return sizeFiles;
};

const getSizeTree = (tree) => {
  let size = getSizeFiles(tree);
  for (const [key, value] of Object.entries(tree)) {
    if (_.isObject(value)) {
      size += getSizeTree(value);
    }
  }
  return size;
};

const getStats = (tree, currentPath = []) => {
  let stats = [];
  for (const [key, value] of Object.entries(tree)) {
    if (_.isObject(value)) {
      const path = [...currentPath, key];
      const stat = {
        path,
        sizeFiles: getSizeFiles(value),
        sizeTree: getSizeTree(value),
      };
      stats = [...stats, stat, ...getStats(value, path)];
    }
  }
  return stats;
};

const tree = parseTree(inputData);
const stats = getStats(tree);

// log.tree(tree);
// log(stats);

// Part One
const fileSize = 100000;
const sumLowest = stats
  .filter((stat) => stat.sizeTree < fileSize)
  .reduce((sum, stat) => sum + stat.sizeTree, 0);

// Part Two
const freeSpace = 70000000 - 45349983;
const neededSpace = 30000000 - freeSpace;
const deleteMe = stats
  .filter((stat) => stat.sizeTree >= neededSpace)
  .sort((a, b) => a.sizeTree - b.sizeTree)[0].sizeTree;

console.log({ sumLowest, deleteMe });
