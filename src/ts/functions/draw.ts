export default function draw(
  ctx: CanvasRenderingContext2D,
  blocks: BackgroundBlocks
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  blocks.forEach(function (block) {
    ctx.fillStyle = block.color;
    ctx.fillRect(block.x, block.y, block.width, block.height);
  });
}
