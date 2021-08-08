import drawSnake from "./functions/draw_snake";
import fix_dpi from "./functions/fix_dpi";
import move from "./functions/move";
import checkNextMovement from "./functions/checkNextMovement";

export default function movement(blocks: BackgroundBlocks) {
  const canvas = document.getElementById("front-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  fix_dpi(ctx);
  let movement: "right" | "left" | "up" | "down" = "right";

  let snake = drawSnake(ctx);
  let interval = requestAnimationFrame(async () => {
    function moveSnake() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          snake = move(snake, ctx, movement);
          if (!checkNextMovement(blocks, snake)) {
            cancelAnimationFrame(interval);
            return resolve(alert("You lose!"));
          }
          interval = requestAnimationFrame(moveSnake);
          resolve(snake);
        }, 200);
      });
    }

    await moveSnake();
  });

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key == keyboard_keys.UP) {
      if (movement == "down") return;
      movement = "up";
    }
    if (event.key == keyboard_keys.DOWN) {
      if (movement == "up") return;
      movement = "down";
    }
    if (event.key == keyboard_keys.LEFT) {
      if (movement == "right") return;
      movement = "left";
    }
    if (event.key == keyboard_keys.RIGHT) {
      if (movement == "left") return;
      movement = "right";
    }
  });
}

enum keyboard_keys {
  DOWN = "ArrowDown",
  UP = "ArrowUp",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
}
