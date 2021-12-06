import run from 'aocrunner'
import _ from 'lodash'

const DAYS_PART1 = 80
const DAYS_PART2 = 256

const rotate = array => [...array.slice(1, array.length), array[0]]

const parseInput = (rawInput) => {
  const occurrences = Array(9).fill(0)
  rawInput.split(',').map(Number).forEach(number => {
    occurrences[number]++
  })
  return occurrences
}

const part1 = (rawInput, days = DAYS_PART1) => {
  let fishesWithAge = parseInput(rawInput)
  _.range(days).forEach(() => {
    fishesWithAge = rotate(fishesWithAge)
    fishesWithAge[6] += fishesWithAge[8]
  })
  return _.sum(fishesWithAge)
}

const part2 = (rawInput) => {
  return part1(rawInput, DAYS_PART2)
}

run({
  part1: {
    tests: [
      { input: '3,4,3,1,2', expected: 5934 }
    ],
    solution: part1
  },
  part2: {
    tests: [
      { input: '3,4,3,1,2', expected: 26984457539 }
    ],
    solution: part2
  },
  trimTestInputs: true
})
