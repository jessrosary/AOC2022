const input = require('./input');

const getHighestSums = (arr) => {
  //Part One
  const newArr = arr
    .map((x) => x.reduce((a, b) => a + b))
    .sort((a, b) => b - a);

  //Part Two
  let topThree = [];
  newArr.filter((x, i) => {
    if (i < 3) {
      topThree.push(x);
    }
  });
  return topThree.reduce((a, b) => a + b);
};

console.log(getHighestSums(input));
