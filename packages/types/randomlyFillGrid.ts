import { Grid, Color, setColor, setColorEmpty } from "./grid";

/*
 * defaultRand generates a random integer between a and b (inclusive). 
 * It uses the Math.random() function to generate a random number between 0 and 1, 
 * multiplies it by the range (b - a + 1), and adds a to ensure the result is within the desired range. 
 */
const defaultRand = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

/*
 * randomly populate a grid with colors and empty cells
 */
export const randomlyFillGrid = (
  grid: Grid,
  {
    colors = [1, 2, 3] as Color[],
    emptyP = 2,
  }: { colors?: Color[]; emptyP?: number } = {},
  rand = defaultRand
) => {
  for (let x = grid.width; x--; )
    for (let y = grid.height; y--; ) {
      const k = rand(-emptyP, colors.length - 1);

      if (k >= 0) setColor(grid, x, y, colors[k]);
      else setColorEmpty(grid, x, y);
    }
};
