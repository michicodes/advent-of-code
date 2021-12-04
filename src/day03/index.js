import run from 'aocrunner'
import _ from 'lodash'

const parseInput = (rawInput) => rawInput.split('\n').map(line => line.split('').map(Number))
const toHex = digits => Number('0b' + digits.join(''))

const part1 = (rawInput) => {
  const matrix = parseInput(rawInput)
  const gammaDigits = _.zip(...matrix).map(column => column.filter(Boolean).length > (matrix.length / 2) ? 1 : 0)

  const gamma = toHex(gammaDigits)
  const power = toHex(gammaDigits.map(bit => 1 - bit))

  return gamma * power
}

const part2 = (rawInput) => {
  const matrix = parseInput(rawInput)

  const mostCommon = (matrix, depth) => ((_.zip(...matrix)[depth].filter(Boolean).length) >= (matrix.length / 2))
  const leastCommon = (matrix, depth) => !mostCommon(matrix, depth)

  const filterDown = filterPredicate => (matrix, depth = 0) => {
    if (matrix.length === 1) {
      return matrix[0]
    }
    return filterDown(filterPredicate)(matrix.filter(line => line[depth] == filterPredicate(matrix, depth)), ++depth) // eslint-disable-line
  }

  const oxygenGeneratorRating = toHex(filterDown(mostCommon)(matrix))
  const co2ScrubberRating = toHex(filterDown(leastCommon)(matrix))

  return oxygenGeneratorRating * co2ScrubberRating
}

run({
  part1: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
        expected: 198
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
        expected: 230
      }
    ],
    solution: part2
  },
  trimTestInputs: true
})
