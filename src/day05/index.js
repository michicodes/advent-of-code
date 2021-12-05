import run from 'aocrunner'
const BOARD_SIZE = 1000

const parseInput = (rawInput) => rawInput.split('\n')
  .map(row => row.split(' -> ').map(coordinate => coordinate.split(',').map(Number)))

const initBoard = () => Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill('.'))

const toVector = (start, end) => ([end[0] - start[0], end[1] - start[1]])
const isOrthoganal = ([start, end]) => toVector(start, end).includes(0)
const bySmallerCoordinate = ([x1, y1], [x2, y2]) => x1 === x2 ? y1 - y2 : x1 - x2

// const drawBoard = board => board.map(line => line.join('')).join('\n')

const part1 = (rawInput) => {
  const board = initBoard()
  const ventLines = parseInput(rawInput)
  ventLines.filter(isOrthoganal).forEach((line) => {
    const [start, end] = line.sort(bySmallerCoordinate)

    for (let x = start[0]; x <= end[0]; x++) {
      for (let y = start[1]; y <= end[1]; y++) {
        if (board[x][y] === '.') {
          board[x][y] = 1
        } else {
          board[x][y]++
        }
      }
    }
  })
  return board.map(row => ((row.filter(coordinate => coordinate >= 2)).length))
    .reduce((prev, curr) => prev + curr, 0)
}

const part2 = (rawInput) => {
  // const lines = parseInput(rawInput)
  // console.log(lines)
}

run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 5
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2
  },
  trimTestInputs: true
})
