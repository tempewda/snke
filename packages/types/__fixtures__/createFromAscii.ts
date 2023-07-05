import { Color, createEmptyGrid, setColor } from "../grid";

/*
 * createFromAscii function takes an ASCII representation of a grid and converts it into an actual grid object, 
 * populating it with colors based on the characters in the ASCII representation
 */
export const createFromAscii = (ascii: string) => {
  const a = ascii.split("\n");                        // split the ASCII string into an array of lines
  if (a[0] === "") a.shift();                         // removes the first line if it is empty (represented by "")
  const height = a.length;                            // height is determined by the length of the array 
  const width = Math.max(...a.map((r) => r.length));  // width is calculated by finding the maximum length of all the lines

  const grid = createEmptyGrid(width, height);
  for (let x = width; x--; )                          // decreasing loop for slight optimization
    for (let y = height; y--; ) {
      const c = a[y][x];
      // if c is "#", returns 3 which is received by `color` and so on...
      // +c converts c directly into an integer
      const color =
        (c === "#" && 3) || (c === "@" && 2) || (c === "." && 1) || +c;
      if (c) setColor(grid, x, y, color as Color);
    }

  return grid;
};
