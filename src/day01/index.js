import run from 'aocrunner'

const parseInput = (rawInput) => rawInput.split('\n').map((n) => Number(n))

const part1 = (rawInput) => {
  const sonar = parseInput(rawInput)
  if (!sonar || sonar.length <= 1) {
    return 0
  }
  return sonar.filter(
    (scanpoint, index, scanpoints) => scanpoint > scanpoints[index - 1]
  ).length
}

const part2 = (rawInput) => {
  const sonar = parseInput(rawInput)
  if (!sonar || sonar.length <= 3) {
    return 0
  }
  return sonar.filter((scanpoint, index, scanpoints) => {
    if (index < 3) {
      return false
    }
    // oh god why
    return (
      scanpoint + scanpoints[index - 1] + scanpoints[index - 2] >
      scanpoints[index - 1] + scanpoints[index - 2] + scanpoints[index - 3]
    )
  }).length
}

run({
  part1: {
    tests: [
      {
        input: `199
                200
                208
                210
                200
                207
                240
                269
                260
                263`,
        expected: 7
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `199
                200
                208
                210
                200
                207
                240
                269
                260
                263`,
        expected: 5
      }
    ],
    solution: part2
  },
  trimTestInputs: true
})
