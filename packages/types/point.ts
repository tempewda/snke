/*
 * represent point coordinates or positions
 */
export type Point = { x: number; y: number };

/*
 * array that represents the four cardinal directions in a 2D grid: right, down, left, and up, respectively
 */
export const around4 = [
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
] as const;

/*
 * returns true if 2 points are equal
 */
export const pointEquals = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
