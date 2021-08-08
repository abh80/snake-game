import draw from "./functions/draw";
import fix_dpi from "./functions/fix_dpi";
import drawSnake from "./functions/draw_snake";
import movement from "./movement";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById(
    "background-canvas"
  ) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const colors: string[] = ["#a2d149", "#aad751"];
  fix_dpi(ctx);
  const width = canvas.width;
  const height = canvas.height;
  let effectiveWidth = width - (width % 50);
  let effectiveHeight = height - (height % 50);
  const blocks: BackgroundBlocks = [];
  for (let i = 0; i < effectiveWidth; i += 50) {
    for (let j = 0; j < effectiveHeight; j += 50) {
      let rowIsOdd = !((j / 10) % 2);
      let color = colors[0];
      if (rowIsOdd) {
        if (!((i / 10) % 2)) color = colors[1];
      } else {
        if ((i / 10) % 2) color = colors[1];
      }
      blocks.push({
        x: i,
        y: j,
        width: 50,
        height: 50,
        color,
      });
    }
  }
  draw(ctx, blocks);
  movement(blocks);
});
