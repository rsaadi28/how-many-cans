const { calculatePaint } = require('../../models/calculator');

describe('calculatePaint', () => {
  test("should calculate as in the scope example", async () => {
    const walls = [
      { width: 23.75, height: 1, doors: 0, windows: 0 },
      { width: 23.75, height: 1, doors: 0, windows: 0 },
      { width: 23.75, height: 1, doors: 0, windows: 0 },
      { width: 23.75, height: 1, doors: 0, windows: 0 }];

    const result = calculatePaint(walls);

    expect(result.totalArea).toBe(95);
    expect(result.litersRequired).toBe(19);
    expect(result.cans).toEqual([
      { size: 18, quantity: 1 }, { size: 0.5, quantity: 2 }
    ])
  });
});