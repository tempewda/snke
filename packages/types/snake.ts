import type { Point } from "./point";

/*
 * defines a new type called Snake. 
 * it combines the Uint8Array type with an additional property _tag that has a string value of "__Snake__"
 * `export` keyword ensures that the Snake type is accessible to other modules or files that import it
 */
export type Snake = Uint8Array & { _tag: "__Snake__" };

/*
 * arrow function syntax:
 * const functionName = (parameter1: Type1, parameter2: Type2, ...): ReturnType => {
 *   // function body
 *   // return statement
 * };
 *
 * These two functions, getHeadX, and getHeadY, 
 * extract the x and y coordinates of the snake's head, respectively. 
 * They assume that the x-coordinate is stored at index 0 of the snake array and the y-coordinate at index 1. 
 * The coordinates are adjusted by subtracting 2 to compensate for the offset. (why?)
 */
export const getHeadX = (snake: Snake) => snake[0] - 2;
export const getHeadY = (snake: Snake) => snake[1] - 2;
/*                        ^        ^
 *                        |        |
 *                   parameter    datatype
 */

/*
 * getSnakeLength function calculates the length of the snake by dividing the length of the snake array by 2
 * since each segment of the snake occupies two indices in the array (x and y coordinates), 
 * dividing by 2 gives the number of segments.
 */
export const getSnakeLength = (snake: Snake) => snake.length / 2;

/*
 * copySnake function creates a copy of the snake array by using the slice() method
 * it ensures that the resulting copy retains the Snake type by casting it back to Snake.
 */
export const copySnake = (snake: Snake) => snake.slice() as Snake;

/*
 * snakeEquals function compares two snake arrays, a and b, element by element
 * it iterates over the arrays and checks if the corresponding elements are not equal
 * if any pair of elements are unequal, it returns false, indicating that the snakes are not equal
 * Otherwise, if all elements match, it returns true
 */
export const snakeEquals = (a: Snake, b: Snake) => {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[I]) return false;
  return true;
};

/*
 * return a copy of the next snake, considering that dx, dy is the direction
 * 
 * nextSnake function takes a snake array, along with dx and dy values representing the direction of movement
 * it creates a new Uint8Array called copy with the same length as the input snake
 * it then iterates over the snake array starting from index 2, copying the elements to copy with an offset of -2
 * this effectively shifts the snake's body segments by one position
 * finally, it updates the first two elements of copy to represent the new head coordinates by adding the respective dx and dy values
 * the resulting copy is returned as a Snake.
 */
export const nextSnake = (snake: Snake, dx: number, dy: number) => {
  const copy = new Uint8Array(snake.length);
  for (let i = 2; i < snake.length; i++) copy[i] = snake[i - 2];
  copy[0] = snake[0] + dx;
  copy[1] = snake[1] + dy;
  return copy as Snake;
};

/*
 * snakeWillSelfCollide function checks if the next move of the snake, based on the provided dx and dy values, will result in a self-collision
 * it calculates the new head coordinates by adding dx and dy to the current head coordinates
 * it then iterates over the snake array starting from index 2, comparing each pair of x and y coordinates with the new head coordinates
 * if any pair matches, it indicates a self-collision and true is returned. Otherwise, if no matches are found, it returns false.
 */
export const snakeWillSelfCollide = (snake: Snake, dx: number, dy: number) => {
  const nx = snake[0] + dx;
  const ny = snake[1] + dy;

  for (let i = 2; i < snake.length - 2; i += 2)
    if (snake[i + 0] === nx && snake[i + 1] === ny) return true;
  /*                  ^
   *        strict equality - equal value and equal type
   */

  return false;
};

/*
 * snakeToCells function converts the snake array into an array of Point objects
 * it uses the Array.from method to create a new array with a length equal to half the length of the snake array
 * during the creation of each element in the new array, the x and y coordinates are extracted from the snake array using the appropriate indices
 * the coordinates are adjusted by subtracting 2 to compensate for the offset.
 *
 * the Point array(defined in another module) should look like
 * [
 *  { x: 3, y: 5 },
 *  { x: 8, y: 10 },
 *  { x: 13, y: 15 }
 * ]
 */
export const snakeToCells = (snake: Snake): Point[] =>
  Array.from({ length: snake.length / 2 }, (_, i) => ({
    x: snake[i * 2 + 0] - 2,
    y: snake[i * 2 + 1] - 2,
  }));

/*
 * createSnakeFromCells function does the opposite of snakeToCells. 
 * It takes an array of Point objects, points, and creates a snake array from it. 
 * It initializes a new Uint8Array called snake with a length equal to points.length multiplied by 2. 
 * It then iterates over points in reverse order using a for loop. reverse cuz reverse loop is more optimized
 * For each element, it assigns the x and y coordinates adjusted by adding 2 to the respective indices in the snake array. 
 * Finally, it returns the snake array as a Snake
 */
export const createSnakeFromCells = (points: Point[]) => {
  const snake = new Uint8Array(points.length * 2);
  for (let i = points.length; i--; ) {
    snake[i * 2 + 0] = points[i].x + 2;
    snake[i * 2 + 1] = points[i].y + 2;
  }
  return snake as Snake;
};
