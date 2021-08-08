let dpi = window.devicePixelRatio;

export default function fix_dpi(ctx: CanvasRenderingContext2D) {
  //get CSS height
  //the + prefix casts it to an integer
  //the slice method gets rid of "px"
  let style_height = +getComputedStyle(ctx.canvas)
    .getPropertyValue("height")
    .slice(0, -2);
  //get CSS width
  let style_width = +getComputedStyle(ctx.canvas)
    .getPropertyValue("width")
    .slice(0, -2);
  //scale the canvas
  // @ts-ignore
  ctx.canvas.setAttribute("height", style_height * dpi); // @ts-ignore
  ctx.canvas.setAttribute("width", style_width * dpi);
}
