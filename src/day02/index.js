import run from 'aocrunner'

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
  const lines = parseInput(rawInput)
  let depth = 0
  let distance = 0

  lines.forEach((singleDiveInstruction) => {
    const [direction, value] = singleDiveInstruction.split(' ')
    if (direction === 'down') {
      depth += Number(value)
    }

    if (direction === 'up') {
      depth -= Number(value)
    }

    if (direction === 'forward') {
      distance += Number(value)
    }
  })

  return depth * distance
}

const part2 = (rawInput) => {
  const lines = parseInput(rawInput)

  let depth = 0
  let distance = 0
  let aim = 0

  lines.forEach((singleDiveInstruction) => {
    const [direction, value] = singleDiveInstruction.split(' ')
    if (direction === 'down') {
      aim += Number(value)
    }
    if (direction === 'up') {
      aim -= Number(value)
    }
    if (direction === 'forward') {
      distance += Number(value)
      depth += aim * Number(value)
    }
  })

  return depth * distance
}

run({
  part1: {
    tests: [
      {
        input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
        expected: 150
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
        expected: 900
      }
    ],
    solution: part2
  },
  trimTestInputs: true
})
