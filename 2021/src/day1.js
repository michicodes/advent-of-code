const fs = require("fs");
const path = require("path");

const measureDepthPartA = (sonar) => {
  if (!sonar || sonar.length <= 1) {
    return 0;
  }
  return sonar.filter(
    (scanpoint, index, scanpoints) => scanpoint > scanpoints[index - 1]
  ).length;
};

const measureDepthPartB = (sonar) => {
  if (!sonar || sonar.length <= 3) {
    return 0;
  }
  return sonar.filter((scanpoint, index, scanpoints) => {
    if (index < 3) {
      return false;
    }
    // oh god why
    return (
      scanpoint + scanpoints[index - 1] + scanpoints[index - 2] >
      scanpoints[index - 1] + scanpoints[index - 2] + scanpoints[index - 3]
    );
  }).length;
};

fs.readFile(path.join(__dirname, "day1.input"), (err, data) => {
  if (err) throw err;
  const sonar = data
    .toString()
    .split("\n")
    .map((n) => Number(n));
  const depthA = measureDepthPartA(sonar);
  const depthB = measureDepthPartB(sonar);
  console.log("It is deep. Part A yeah:", depthA);
  console.log("It is deep. Part B yeah:", depthB);
});

module.exports = { measureDepthPartA, measureDepthPartB };
