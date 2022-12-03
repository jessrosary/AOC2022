import { readFileSync } from 'fs';

const data = readFileSync('./data/input02.txt', 'utf8').split('\n');

console.log('hello world', { data });

// const fs = require('fs');

// fs.readFile('./input.txt')

//Rock: A/X (1 points)
//Paper: B/Y (2 points)
//Scissors: C/Z (3 points)

//Win 6 points
//Draw 3 points
//Lose 0 points

// const getScore = (arr) => {
//   let yourScore = 0;
//   arr.forEach((x, i) => {

//   });
// };
