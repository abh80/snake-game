import collision from "./collision";
export default function checkNextMovement(
  backgroundBlocks: BackgroundBlocks,
  snake: SnakeBlocks
): boolean {
  if (collision(snake)) {
    return false;
  } else return true;
}
