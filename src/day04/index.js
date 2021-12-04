import run from 'aocrunner'
import _ from 'lodash'

const BINGOBOARD_SIZE = 5

const parseInput = (rawInput) => {
  const [numbersToBeDrawnLine, ...bingoBoardLines] = rawInput.split('\n').filter(Boolean)
  return {
    numbersToBeDrawn: numbersToBeDrawnLine.split(',').map(Number),
    bingoBoards: _.chunk(bingoBoardLines, BINGOBOARD_SIZE).map(bingoBoard => bingoBoard.map(row => row.trim().split(/\s+/).map(Number).map(value => ({ value, marked: false }))))
  }
}

const checkHorizontal = bingoBoard => bingoBoard.find(row => row.every(({ marked }) => marked))

const markDrawnNumber = (bingoBoard, drawnNumber) => bingoBoard.map(row => row.map(({ value, marked }) => ({ value, marked: marked || value === drawnNumber })))

const part1 = (rawInput) => {
  let finalScore = 0
  let bingo = false
  const { numbersToBeDrawn, bingoBoards } = parseInput(rawInput)
  for (let drawnNumbersIndex = 0; drawnNumbersIndex < numbersToBeDrawn.length; drawnNumbersIndex++) {
    for (let index = 0; index < bingoBoards.length; index++) {
      bingoBoards[index] = markDrawnNumber(bingoBoards[index], numbersToBeDrawn[drawnNumbersIndex])

      const horizontalBingo = checkHorizontal(bingoBoards[index])
      const verticalBingo = checkHorizontal(_.zip(...bingoBoards[index]))

      if (horizontalBingo || verticalBingo) {
        bingo = true
        finalScore = numbersToBeDrawn[drawnNumbersIndex] * bingoBoards[index].flat().filter(({ marked }) => !marked).reduce((prev, curr) => prev + curr.value, 0)
        break
      }
    }
    if (bingo) {
      break
    }
  }
  return finalScore
}

const part2 = (rawInput) => {

}

run({
  part1: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: 4512
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
