import { readFileSync } from 'fs';
import _ from 'lodash';

const testData = readFileSync('./data/input10-test.txt', 'utf8');
const input = readFileSync('./data/input10.txt', 'utf8');

const data = input
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

let cycles = 0;
let x = 1;
let log = [];

for (const [command, ...rest] of data) {
  cycles += 1;
  log.push({ cycles, x });
  if (command === 'addx') {
    const value = parseInt(rest[0]);
    cycles += 1;
    log.push({ cycles, x });
    x += value;
  }
}

const signals = [20, 60, 100, 140, 180, 220];
const selectedSignals = _.map(signals, (x) => log[x - 1]);

let map = [];

for (const { cycles, x } of log) {
  if (cycles < 41) {
    if (cycles === x || cycles === x + 1 || cycles === x + 2) {
      map.push('#');
    } else {
      map.push('.');
    }
  } else if (cycles >= 41 && cycles < 80) {
    if (cycles === x + 40 || cycles === x + 41 || cycles === x + 42) {
      map.push('#');
    } else {
      map.push('.');
    }
  } else if (cycles >= 81 && cycles < 120) {
    if (cycles === x + 80 || cycles === x + 81 || cycles === x + 82) {
      map.push('#');
    } else {
      map.push('.');
    }
  } else if (cycles >= 121 && cycles < 160) {
    if (cycles === x + 120 || cycles === x + 121 || cycles === x + 122) {
      map.push('#');
    } else {
      map.push('.');
    }
  } else if (cycles >= 161 && cycles < 200) {
    if (cycles === x + 160 || cycles === x + 161 || cycles === x + 162) {
      map.push('#');
    } else {
      map.push('.');
    }
  } else {
    if (cycles === x + 200 || cycles === x + 201 || cycles === x + 202) {
      map.push('#');
    } else {
      map.push('.');
    }
  }
}

console.log(map);
const render = _.chunk(map, 40).join('');

console.log(render);

// const signalStrength = selectedSignals
//   .map(({ cycles, x }) => cycles * x)
//   .reduce((a, b) => a + b);
// console.log(signalStrength);

// console.log(selectedSignals);
