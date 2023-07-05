import { createSnakeFromCells } from "../snake";

/*
 * create snake of length `length`
 */
const create = (length: number) =>
  createSnakeFromCells(Array.from({ length }, (_, i) => ({ x: i, y: -1 })));

export const snake1 = create(1);  // snake of length 1
export const snake3 = create(3);  // snake of length 3
export const snake4 = create(4);  // snake of length 4
export const snake5 = create(5);  // snake of length 5
export const snake9 = create(9);  // snake of length 9
