import drawSnake from "./draw_snake";
export default function move(
  snake: SnakeBlocks,
  ctx: CanvasRenderingContext2D,
  direction?: "right" | "left" | "up" | "down"
): SnakeBlocks {
  const speed = 50;
  snake.pop();
  const x = snake[0].x;
  const y = snake[0].y;
  snake[0].color = "red";
  switch (direction) {
    case "right":
      snake.unshift({ x: x + speed, y: y, color: "#08f" });
      break;
    case "left":
      snake.unshift({ x: x - speed, y: y, color: "#08f" });
      break;
    case "up":
      snake.unshift({ x: x, y: y - speed, color: "#08f" });
      break;
    case "down":
      snake.unshift({ x: x, y: y + speed, color: "#08f" });
      break;
  }
  drawSnake(ctx, snake);
  return snake;
}
