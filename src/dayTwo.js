import { readFileSync } from 'fs';

const data = readFileSync('./data/input02.txt', 'utf8')
  .split('\n')
  .map((line) => line.split(' '));

//console.log('hello world', { data });

//Rock: A/X (1 points)
//Paper: B/Y (2 points)
//Scissors: C/Z (3 points)

//Win 6 points
//Draw 3 points
//Lose 0 points

const getScore = (arr) => {
  let yourScore = 0;
  arr.forEach((x) => {
    switch (x[0]) {
      case 'A':
        if (x[1] == 'X') {
          yourScore += 4;
        }
        if (x[1] == 'Y') {
          yourScore += 8;
        }
        if (x[1] == 'Z') {
          yourScore += 3;
        }
        break;
      case 'B':
        if (x[1] == 'X') {
          yourScore += 1;
        }
        if (x[1] == 'Y') {
          yourScore += 5;
        }
        if (x[1] == 'Z') {
          yourScore += 9;
        }
        break;
      case 'C':
        if (x[1] == 'X') {
          yourScore += 7;
        }
        if (x[1] == 'Y') {
          yourScore += 2;
        }
        if (x[1] == 'Z') {
          yourScore += 6;
        }
    }
  });
  return yourScore;
};

console.log(getScore(data));
