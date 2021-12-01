const { measureDepth } = require("./day1");
test("measureDepth is measuring correctly", () => {
  const depth = measureDepth([
    199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
  ]);
  expect(depth).toEqual(7);
});

test("measureDepth is measuring correctly with empty sonar", () => {
  const depth = measureDepth([]);
  expect(depth).toEqual(0);
});

test("measureDepth is measuring correctly with only 1 datapoint", () => {
  const depth = measureDepth([193]);
  expect(depth).toEqual(0);
});
