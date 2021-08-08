export default function drawSnake(
  ctx: CanvasRenderingContext2D,
  blocks?: SnakeBlocks
): SnakeBlocks {
  if (!blocks) blocks = initSnake(ctx);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    ctx.fillStyle = block.color;
    ctx.fillRect(block.x, block.y, 50, 50);
  }
  return blocks;
}

const initSnake = (ctx: CanvasRenderingContext2D): SnakeBlocks => {
  const count = 5;
  const blocks = [];
  for (let i = 0; i < count - 1; i++) {
    blocks.push({
      x: i * 50,
      y: 3 * 50,
      color: "red",
    });
  }
  blocks.reverse();
  blocks.unshift({ x: 50 * blocks.length, y: 3 * 50, color: "#08f" });
  return blocks;
};
