import { readFileSync } from 'fs';

/*
Parse data into map with grid in this shape:

  {
    grid: [
      [ 3, 0, 3, 7, 3 ],
      [ 2, 5, 5, 1, 2 ],
      [ 6, 5, 3, 3, 2 ],
      [ 3, 3, 5, 4, 9 ],
      [ 3, 5, 3, 9, 0 ]
    ],
    lastX: 4,
    lastY: 4
  }

*/
const parseMap = (data) => {
  const grid = data
    .trim()
    .split('\n')
    .map((row) => row.split('').map((tree) => parseInt(tree)));

  return {
    grid,
    lastX: grid.length - 1,
    lastY: grid[0].length - 1,
  };
};

const isVisibleFromLeft = (map, [x, y]) => {
  if (y === 0) {
    return true;
  }

  const row = map.grid[x];
  const tree = row[y];

  for (let i = 0; i < y; i++) {
    const leftTree = row[i];
    if (tree <= leftTree) {
      return false;
    }
  }

  // for (let i = 0; i < col; i++) {
  //   if (map.grid[row][col] <= map.grid[row][i]) {
  //     return false;
  //   }
  // }

  return true;
};

const isVisibleFromRight = (map, [x, y]) => {
  if (y === map.lastY) {
    return true;
  }

  const row = map.grid[x];
  const tree = row[y];

  for (let i = map.lastY; i > y; i--) {
    const rightTree = row[i];
    if (tree <= rightTree) {
      return false;
    }
  }

  return true;
};

const isVisibleFromTop = (map, [x, y]) => {
  if (x === 0) {
    return true;
  }

  const grid = map.grid;
  const tree = grid[x][y];

  for (let i = 0; i < x; i++) {
    const topTree = grid[i][y];
    if (tree <= topTree) {
      return false;
    }
  }

  return true;
};

const isVisibleFromBottom = (map, [x, y]) => {
  if (x === map.lastX) {
    return true;
  }

  const grid = map.grid;
  const tree = grid[x][y];

  for (let i = map.lastX; i > x; i--) {
    const bottomTree = grid[i][y];
    if (tree <= bottomTree) {
      return false;
    }
  }

  return true;
};

const getVisibleFromEdge = (map) => {
  let visible = [];
  const grid = map.grid;
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      const tree = row[j];
      if (
        isVisibleFromLeft(map, [i, j]) ||
        isVisibleFromRight(map, [i, j]) ||
        isVisibleFromTop(map, [i, j]) ||
        isVisibleFromBottom(map, [i, j])
      ) {
        visible.push({ tree, position: [i, j] });
      }

      // console.log({
      //   [`[${i},${j}]`]: tree,
      //   // x: i,
      //   // y: j,
      //   // tree,
      //   left: isVisibleFromLeft(map, [i, j]),
      //   right: isVisibleFromRight(map, [i, j]),
      //   top: isVisibleFromTop(map, [i, j]),
      //   bottom: isVisibleFromBottom(map, [i, j]),
      // });
    }
  }

  return visible;
};

// Main

const inputData = readFileSync('./data/input08.txt', 'utf8');
const testData = readFileSync('./data/testinput08.txt', 'utf8');

const map = parseMap(inputData);
// console.log(map);

const visibles = getVisibleFromEdge(map);
console.log({
  'visibles[0..10]': visibles.slice(0, 10),
  count: visibles.length,
});
