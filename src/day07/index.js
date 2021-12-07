import run from 'aocrunner'
import _ from 'lodash'

const parseInput = rawInput => rawInput.split(',').map(Number)

const _median = arr => { // stackoverflow
  arr = [...arr].sort((a, b) => a - b)
  return (arr[arr.length - 1 >> 1] + arr[arr.length >> 1]) / 2
}

const gauss = number => (number * (number + 1)) / 2

const part1 = rawInput => {
  const crabs = parseInput(rawInput)
  const median = _median(crabs)
  return _.sum(crabs.map(crab => Math.abs(crab - median)))
}

const part2 = rawInput => {
  const crabs = parseInput(rawInput)

  return _.min(
    _.range(_.max(crabs))
      .map(aligningPoint =>
        _.sum(
          crabs.map(crab => gauss(Math.abs(crab - aligningPoint)))
        )
      )
  )
}

run({
  part1: {
    tests: [
      { input: '16,1,2,0,4,2,7,1,2,14', expected: 37 }
    ],
    solution: part1
  },
  part2: {
    tests: [
      { input: '16,1,2,0,4,2,7,1,2,14', expected: 168 }],
    solution: part2
  },
  trimTestInputs: true
})
