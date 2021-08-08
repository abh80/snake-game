export default function collision(snake: SnakeBlocks): boolean {
  const canvas = document.getElementById("front-canvas") as HTMLCanvasElement;
  let w = parseInt(canvas.getAttribute("width") as string);
  w = w - (w % 50);
  let h = parseInt(canvas.getAttribute("height") as string);
  h = h - (h % 50);
  console.log(snake[0]);
  if (
    snake[0].x >= w ||
    snake[0].y >= h ||
    snake[0].x + 50 <= 0 ||
    snake[0].y + 50 <= 0
  ) {
    return true;
  } else if (
    snake.filter((x) => snake[0].x === x.x && snake[0].y === x.y).length > 1
  ) {
    return true;
  } else return false;
}
