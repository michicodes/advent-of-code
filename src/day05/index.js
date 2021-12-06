import run from 'aocrunner'
import _ from 'lodash'

const BOARD_SIZE = 1000

const parseInput = (rawInput) => rawInput.split('\n')
  .map(row => row.split(' -> ').map(coordinate => coordinate.split(',').map(Number)))

const initBoard = () => Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill('.'))

const toVector = (start, end) => ([end[0] - start[0], end[1] - start[1]])
const isVertical = ([start, end]) => toVector(start, end)[0] === 0
const isHorizontal = ([start, end]) => toVector(start, end)[1] === 0
const isOrthoganal = ([start, end]) => isHorizontal([start, end]) || isVertical([start, end])
const isDiagonal = ([start, end]) => new Set(toVector(start, end).map(Math.abs)).size === 1
const result = board => board.map(row => ((row.filter(coordinate => coordinate >= 2)).length))
  .reduce((prev, curr) => prev + curr, 0)

// const drawBoard = board => board.map(line => line.join('')).join('\n')

const part1 = (rawInput) => {
  const board = initBoard()
  const ventLines = parseInput(rawInput)
  ventLines.filter(isOrthoganal).forEach((line) => {
    const [[x1, y1], [x2, y2]] = line
    let x
    let y

    if (isVertical(line)) {
      y = _.range(y1, y2 + 1, y1 < y2 ? 1 : -1)
      x = Array(y.length).fill(x1)
    }

    if (isHorizontal(line)) {
      x = _.range(x1, x2 + 1, x1 < x2 ? 1 : -1)
      y = Array(x.length).fill(y1)
    }

    _.zip(x, y).forEach(([x, y]) => {
      if (board[x][y] === '.') {
        board[x][y] = 1
      } else {
        board[x][y]++
      }
    })
  })
  return result(board)
}

const part2 = (rawInput) => {
  const board = initBoard()
  const ventLines = parseInput(rawInput)
  ventLines.filter(line => isOrthoganal(line) || isDiagonal(line)).forEach((line) => {
    const [[x1, y1], [x2, y2]] = line
    let x
    let y
    if (isDiagonal(line)) {
      if (x1 < x2) {
        x = _.range(x1, x2 + 1, 1)
      } else if (x2 < x1) {
        x = _.range(x2, x1 + 1, 1).reverse()
      } else {
        x = [x1, x2]
      }

      if (y1 < y2) {
        y = _.range(y1, y2 + 1, 1)
      } else if (y2 < y1) {
        y = _.range(y2, y1 + 1, 1).reverse()
      } else {
        y = [y1, y2]
      }
    }
    if (isVertical(line)) {
      if (y1 < y2) {
        y = _.range(y1, y2 + 1, 1)
      } else if (y2 < y1) {
        y = _.range(y2, y1 + 1, 1)
      } else {
        y = [y1, y2]
      }
      x = Array(y.length).fill(x1)
    }

    if (isHorizontal(line)) {
      if (x1 < x2) {
        x = _.range(x1, x2 + 1, 1)
      } else if (x2 < x1) {
        x = _.range(x2, x1 + 1, 1)
      } else {
        x = [x1, x2]
      }
      y = Array(x.length).fill(y1)
    }

    _.zip(x, y).forEach(([x, y]) => {
      if (board[x][y] === '.') {
        board[x][y] = 1
      } else {
        board[x][y]++
      }
    })
  })

  return result(board)
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
        expected: 12
      }
    ],
    solution: part2
  },
  trimTestInputs: true
})
