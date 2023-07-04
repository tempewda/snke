/*
 * Color represents different color values in the grid
 * can only store numbers from 1 through 9
 */
export type Color = (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) & { _tag: "__Color__" };

/*
 * Empty represents an empty cell in the grid
 */
export type Empty = 0 & { _tag: "__Empty__" };

/*
 * Grid represents a grid structure.
 * contribution graph is represented as continuous 1D array with each element representing a cell in the grid
 * height - number of columns
 * width - number of rows
 */
export type Grid = {
  width: number;
  height: number;
  data: Uint8Array;
};

/*
 * isInside checks if a given (x, y) coordinate is inside the bounds of the grid
 */
export const isInside = (grid: Grid, x: number, y: number) =>
  x >= 0 && y >= 0 && x < grid.width && y < grid.height;

/*
 * isInsideLarge ensures that the coordinates (x, y) are within the grid's width and height, extended by the margin m
 */
export const isInsideLarge = (grid: Grid, m: number, x: number, y: number) =>
  x >= -m && y >= -m && x < grid.width + m && y < grid.height + m;

/*
 * copyGrid creates a copy of the given Grid object
 */
export const copyGrid = ({ width, height, data }: Grid) => ({
  width,
  height,
  data: Uint8Array.from(data),
});

/*
 * Grid is the 1-D representation of the contribution graph
 * each index in the Grid represents a cell of the graph
 * given that you know the coordinates of the cell,
 * getIndex function finds the index of the cell in the grid
 */
const getIndex = (grid: Grid, x: number, y: number) => x * grid.height + y;
/*                                                                ^
 *                                                            misleading?
 */

/*
 * given the coords of cell, return its colour
 */
export const getColor = (grid: Grid, x: number, y: number) =>
  grid.data[getIndex(grid, x, y)] as Color | Empty;

/*
 * checks if a given color value is an empty cell. 
 * It performs a strict equality check (===) against 0 to determine if the color is empty. 
 * returns a type predicate that narrows the type of the parameter to Empty
 */
export const isEmpty = (color: Color | Empty): color is Empty => color === 0;

/*
 * sets the color of a cell at the specified (x, y) coordinates in the grid. 
 * It uses the getIndex function to calculate the index in the data array and assigns the provided color value to that index. 
 * If the color is undefined or null, it defaults to 0 (empty).
 */
export const setColor = (
  grid: Grid,
  x: number,
  y: number,
  color: Color | Empty
) => {
  grid.data[getIndex(grid, x, y)] = color || 0;
};

/*
 * sets the color of a cell at the specified (x, y) coordinates in the grid to empty. 
 * It calls the setColor function internally, passing 0 cast as Empty to set the cell as empty.
 */
export const setColorEmpty = (grid: Grid, x: number, y: number) => {
  setColor(grid, x, y, 0 as Empty);
};

/**
 * return true if the grid is empty
 */
export const isGridEmpty = (grid: Grid) => grid.data.every((x) => x === 0);

/*
 * compares two grids for equality
 */
export const gridEquals = (a: Grid, b: Grid) =>
  a.data.every((_, i) => a.data[i] === b.data[i]);

/*
 * creates a new empty grid with the specified width and height. 
 * It initializes the data array with a Uint8Array of length width * height filled with 0.
 */
export const createEmptyGrid = (width: number, height: number) => ({
  width,
  height,
  data: new Uint8Array(width * height),
});
