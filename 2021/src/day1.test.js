const { measureDepthPartA, measureDepthPartB } = require("./day1");
test("measureDepthPartA is measuring correctly", () => {
  const depth = measureDepthPartA([
    199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
  ]);
  expect(depth).toEqual(7);
});

test("measureDepthPartA is measuring correctly with empty sonar", () => {
  const depth = measureDepthPartA([]);
  expect(depth).toEqual(0);
});

test("measureDepthPartA is measuring correctly with undefined sonar", () => {
  const depth = measureDepthPartA();
  expect(depth).toEqual(0);
});

test("measureDepthPartA is measuring correctly with only 1 datapoint", () => {
  const depth = measureDepthPartA([193]);
  expect(depth).toEqual(0);
});

test("measureDepthPartB is measuring correctly", () => {
  const depth = measureDepthPartB([
    199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
  ]);
  expect(depth).toEqual(5);
});

test("measureDepthPartB is measuring correctly with empty sonar", () => {
  const depth = measureDepthPartB([]);
  expect(depth).toEqual(0);
});

test("measureDepthPartA is measuring correctly with undefined sonar", () => {
  const depth = measureDepthPartB();
  expect(depth).toEqual(0);
});

test("measureDepthPartA is measuring correctly with less than 4 datapoints", () => {
  const depth = measureDepthPartB([193, 123, 124]);
  expect(depth).toEqual(0);
});
