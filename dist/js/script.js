/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/background.ts":
/*!******************************!*\
  !*** ./src/ts/background.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var draw_1 = __importDefault(__webpack_require__(/*! ./functions/draw */ "./src/ts/functions/draw.ts"));
var fix_dpi_1 = __importDefault(__webpack_require__(/*! ./functions/fix_dpi */ "./src/ts/functions/fix_dpi.ts"));
var movement_1 = __importDefault(__webpack_require__(/*! ./movement */ "./src/ts/movement.ts"));
document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("background-canvas");
    var ctx = canvas.getContext("2d");
    var colors = ["#a2d149", "#aad751"];
    fix_dpi_1.default(ctx);
    var width = canvas.width;
    var height = canvas.height;
    var effectiveWidth = width - (width % 50);
    var effectiveHeight = height - (height % 50);
    var blocks = [];
    for (var i = 0; i < effectiveWidth; i += 50) {
        for (var j = 0; j < effectiveHeight; j += 50) {
            var rowIsOdd = !((j / 10) % 2);
            var color = colors[0];
            if (rowIsOdd) {
                if (!((i / 10) % 2))
                    color = colors[1];
            }
            else {
                if ((i / 10) % 2)
                    color = colors[1];
            }
            blocks.push({
                x: i,
                y: j,
                width: 50,
                height: 50,
                color: color,
            });
        }
    }
    draw_1.default(ctx, blocks);
    movement_1.default(blocks);
});


/***/ }),

/***/ "./src/ts/functions/checkNextMovement.ts":
/*!***********************************************!*\
  !*** ./src/ts/functions/checkNextMovement.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var collision_1 = __importDefault(__webpack_require__(/*! ./collision */ "./src/ts/functions/collision.ts"));
function checkNextMovement(backgroundBlocks, snake) {
    if (collision_1.default(snake)) {
        return false;
    }
    else
        return true;
}
exports.default = checkNextMovement;


/***/ }),

/***/ "./src/ts/functions/collision.ts":
/*!***************************************!*\
  !*** ./src/ts/functions/collision.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function collision(snake) {
    var canvas = document.getElementById("front-canvas");
    var w = parseInt(canvas.getAttribute("width"));
    w = w - (w % 50);
    var h = parseInt(canvas.getAttribute("height"));
    h = h - (h % 50);
    console.log(snake[0]);
    if (snake[0].x >= w ||
        snake[0].y >= h ||
        snake[0].x + 50 <= 0 ||
        snake[0].y + 50 <= 0) {
        return true;
    }
    else if (snake.filter(function (x) { return snake[0].x === x.x && snake[0].y === x.y; }).length > 1) {
        return true;
    }
    else
        return false;
}
exports.default = collision;


/***/ }),

/***/ "./src/ts/functions/draw.ts":
/*!**********************************!*\
  !*** ./src/ts/functions/draw.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function draw(ctx, blocks) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    blocks.forEach(function (block) {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, block.width, block.height);
    });
}
exports.default = draw;


/***/ }),

/***/ "./src/ts/functions/draw_snake.ts":
/*!****************************************!*\
  !*** ./src/ts/functions/draw_snake.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function drawSnake(ctx, blocks) {
    if (!blocks)
        blocks = initSnake(ctx);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, 50, 50);
    }
    return blocks;
}
exports.default = drawSnake;
var initSnake = function (ctx) {
    var count = 5;
    var blocks = [];
    for (var i = 0; i < count - 1; i++) {
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


/***/ }),

/***/ "./src/ts/functions/fix_dpi.ts":
/*!*************************************!*\
  !*** ./src/ts/functions/fix_dpi.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var dpi = window.devicePixelRatio;
function fix_dpi(ctx) {
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    var style_height = +getComputedStyle(ctx.canvas)
        .getPropertyValue("height")
        .slice(0, -2);
    //get CSS width
    var style_width = +getComputedStyle(ctx.canvas)
        .getPropertyValue("width")
        .slice(0, -2);
    //scale the canvas
    // @ts-ignore
    ctx.canvas.setAttribute("height", style_height * dpi); // @ts-ignore
    ctx.canvas.setAttribute("width", style_width * dpi);
}
exports.default = fix_dpi;


/***/ }),

/***/ "./src/ts/functions/move.ts":
/*!**********************************!*\
  !*** ./src/ts/functions/move.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var draw_snake_1 = __importDefault(__webpack_require__(/*! ./draw_snake */ "./src/ts/functions/draw_snake.ts"));
function move(snake, ctx, direction) {
    var speed = 50;
    snake.pop();
    var x = snake[0].x;
    var y = snake[0].y;
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
    draw_snake_1.default(ctx, snake);
    return snake;
}
exports.default = move;


/***/ }),

/***/ "./src/ts/movement.ts":
/*!****************************!*\
  !*** ./src/ts/movement.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var draw_snake_1 = __importDefault(__webpack_require__(/*! ./functions/draw_snake */ "./src/ts/functions/draw_snake.ts"));
var fix_dpi_1 = __importDefault(__webpack_require__(/*! ./functions/fix_dpi */ "./src/ts/functions/fix_dpi.ts"));
var move_1 = __importDefault(__webpack_require__(/*! ./functions/move */ "./src/ts/functions/move.ts"));
var checkNextMovement_1 = __importDefault(__webpack_require__(/*! ./functions/checkNextMovement */ "./src/ts/functions/checkNextMovement.ts"));
function movement(blocks) {
    var _this = this;
    var canvas = document.getElementById("front-canvas");
    var ctx = canvas.getContext("2d");
    fix_dpi_1.default(ctx);
    var movement = "right";
    var snake = draw_snake_1.default(ctx);
    var interval = requestAnimationFrame(function () { return __awaiter(_this, void 0, void 0, function () {
        function moveSnake() {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    snake = move_1.default(snake, ctx, movement);
                    if (!checkNextMovement_1.default(blocks, snake)) {
                        cancelAnimationFrame(interval);
                        return resolve(alert("You lose!"));
                    }
                    interval = requestAnimationFrame(moveSnake);
                    resolve(snake);
                }, 200);
            });
        }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, moveSnake()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    document.addEventListener("keydown", function (event) {
        if (event.key == keyboard_keys.UP) {
            if (movement == "down")
                return;
            movement = "up";
        }
        if (event.key == keyboard_keys.DOWN) {
            if (movement == "up")
                return;
            movement = "down";
        }
        if (event.key == keyboard_keys.LEFT) {
            if (movement == "right")
                return;
            movement = "left";
        }
        if (event.key == keyboard_keys.RIGHT) {
            if (movement == "left")
                return;
            movement = "right";
        }
    });
}
exports.default = movement;
var keyboard_keys;
(function (keyboard_keys) {
    keyboard_keys["DOWN"] = "ArrowDown";
    keyboard_keys["UP"] = "ArrowUp";
    keyboard_keys["LEFT"] = "ArrowLeft";
    keyboard_keys["RIGHT"] = "ArrowRight";
})(keyboard_keys || (keyboard_keys = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./background */ "./src/ts/background.ts");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDRDQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy90cy9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvdHMvZnVuY3Rpb25zL2NoZWNrTmV4dE1vdmVtZW50LnRzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvdHMvZnVuY3Rpb25zL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL3RzL2Z1bmN0aW9ucy9kcmF3LnRzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvdHMvZnVuY3Rpb25zL2RyYXdfc25ha2UudHMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy90cy9mdW5jdGlvbnMvZml4X2RwaS50cyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL3RzL2Z1bmN0aW9ucy9tb3ZlLnRzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvdHMvbW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL3RzL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGRyYXdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9mdW5jdGlvbnMvZHJhd1wiKSk7XHJcbnZhciBmaXhfZHBpXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vZnVuY3Rpb25zL2ZpeF9kcGlcIikpO1xyXG52YXIgbW92ZW1lbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9tb3ZlbWVudFwiKSk7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tncm91bmQtY2FudmFzXCIpO1xyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICB2YXIgY29sb3JzID0gW1wiI2EyZDE0OVwiLCBcIiNhYWQ3NTFcIl07XHJcbiAgICBmaXhfZHBpXzEuZGVmYXVsdChjdHgpO1xyXG4gICAgdmFyIHdpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgdmFyIGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICB2YXIgZWZmZWN0aXZlV2lkdGggPSB3aWR0aCAtICh3aWR0aCAlIDUwKTtcclxuICAgIHZhciBlZmZlY3RpdmVIZWlnaHQgPSBoZWlnaHQgLSAoaGVpZ2h0ICUgNTApO1xyXG4gICAgdmFyIGJsb2NrcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlZmZlY3RpdmVXaWR0aDsgaSArPSA1MCkge1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZWZmZWN0aXZlSGVpZ2h0OyBqICs9IDUwKSB7XHJcbiAgICAgICAgICAgIHZhciByb3dJc09kZCA9ICEoKGogLyAxMCkgJSAyKTtcclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JzWzBdO1xyXG4gICAgICAgICAgICBpZiAocm93SXNPZGQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghKChpIC8gMTApICUgMikpXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBjb2xvcnNbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGkgLyAxMCkgJSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID0gY29sb3JzWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHg6IGksXHJcbiAgICAgICAgICAgICAgICB5OiBqLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd18xLmRlZmF1bHQoY3R4LCBibG9ja3MpO1xyXG4gICAgbW92ZW1lbnRfMS5kZWZhdWx0KGJsb2Nrcyk7XHJcbn0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29sbGlzaW9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY29sbGlzaW9uXCIpKTtcclxuZnVuY3Rpb24gY2hlY2tOZXh0TW92ZW1lbnQoYmFja2dyb3VuZEJsb2Nrcywgc25ha2UpIHtcclxuICAgIGlmIChjb2xsaXNpb25fMS5kZWZhdWx0KHNuYWtlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBjaGVja05leHRNb3ZlbWVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gY29sbGlzaW9uKHNuYWtlKSB7XHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9udC1jYW52YXNcIik7XHJcbiAgICB2YXIgdyA9IHBhcnNlSW50KGNhbnZhcy5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKSk7XHJcbiAgICB3ID0gdyAtICh3ICUgNTApO1xyXG4gICAgdmFyIGggPSBwYXJzZUludChjYW52YXMuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpKTtcclxuICAgIGggPSBoIC0gKGggJSA1MCk7XHJcbiAgICBjb25zb2xlLmxvZyhzbmFrZVswXSk7XHJcbiAgICBpZiAoc25ha2VbMF0ueCA+PSB3IHx8XHJcbiAgICAgICAgc25ha2VbMF0ueSA+PSBoIHx8XHJcbiAgICAgICAgc25ha2VbMF0ueCArIDUwIDw9IDAgfHxcclxuICAgICAgICBzbmFrZVswXS55ICsgNTAgPD0gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc25ha2UuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiBzbmFrZVswXS54ID09PSB4LnggJiYgc25ha2VbMF0ueSA9PT0geC55OyB9KS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGNvbGxpc2lvbjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gZHJhdyhjdHgsIGJsb2Nrcykge1xyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XHJcbiAgICBibG9ja3MuZm9yRWFjaChmdW5jdGlvbiAoYmxvY2spIHtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gYmxvY2suY29sb3I7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KGJsb2NrLngsIGJsb2NrLnksIGJsb2NrLndpZHRoLCBibG9jay5oZWlnaHQpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gZHJhdztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gZHJhd1NuYWtlKGN0eCwgYmxvY2tzKSB7XHJcbiAgICBpZiAoIWJsb2NrcylcclxuICAgICAgICBibG9ja3MgPSBpbml0U25ha2UoY3R4KTtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgYmxvY2sgPSBibG9ja3NbaV07XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJsb2NrLmNvbG9yO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdChibG9jay54LCBibG9jay55LCA1MCwgNTApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJsb2NrcztcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBkcmF3U25ha2U7XHJcbnZhciBpbml0U25ha2UgPSBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICB2YXIgY291bnQgPSA1O1xyXG4gICAgdmFyIGJsb2NrcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudCAtIDE7IGkrKykge1xyXG4gICAgICAgIGJsb2Nrcy5wdXNoKHtcclxuICAgICAgICAgICAgeDogaSAqIDUwLFxyXG4gICAgICAgICAgICB5OiAzICogNTAsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcInJlZFwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYmxvY2tzLnJldmVyc2UoKTtcclxuICAgIGJsb2Nrcy51bnNoaWZ0KHsgeDogNTAgKiBibG9ja3MubGVuZ3RoLCB5OiAzICogNTAsIGNvbG9yOiBcIiMwOGZcIiB9KTtcclxuICAgIHJldHVybiBibG9ja3M7XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBkcGkgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcclxuZnVuY3Rpb24gZml4X2RwaShjdHgpIHtcclxuICAgIC8vZ2V0IENTUyBoZWlnaHRcclxuICAgIC8vdGhlICsgcHJlZml4IGNhc3RzIGl0IHRvIGFuIGludGVnZXJcclxuICAgIC8vdGhlIHNsaWNlIG1ldGhvZCBnZXRzIHJpZCBvZiBcInB4XCJcclxuICAgIHZhciBzdHlsZV9oZWlnaHQgPSArZ2V0Q29tcHV0ZWRTdHlsZShjdHguY2FudmFzKVxyXG4gICAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKFwiaGVpZ2h0XCIpXHJcbiAgICAgICAgLnNsaWNlKDAsIC0yKTtcclxuICAgIC8vZ2V0IENTUyB3aWR0aFxyXG4gICAgdmFyIHN0eWxlX3dpZHRoID0gK2dldENvbXB1dGVkU3R5bGUoY3R4LmNhbnZhcylcclxuICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShcIndpZHRoXCIpXHJcbiAgICAgICAgLnNsaWNlKDAsIC0yKTtcclxuICAgIC8vc2NhbGUgdGhlIGNhbnZhc1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY3R4LmNhbnZhcy5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgc3R5bGVfaGVpZ2h0ICogZHBpKTsgLy8gQHRzLWlnbm9yZVxyXG4gICAgY3R4LmNhbnZhcy5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBzdHlsZV93aWR0aCAqIGRwaSk7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gZml4X2RwaTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGRyYXdfc25ha2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9kcmF3X3NuYWtlXCIpKTtcclxuZnVuY3Rpb24gbW92ZShzbmFrZSwgY3R4LCBkaXJlY3Rpb24pIHtcclxuICAgIHZhciBzcGVlZCA9IDUwO1xyXG4gICAgc25ha2UucG9wKCk7XHJcbiAgICB2YXIgeCA9IHNuYWtlWzBdLng7XHJcbiAgICB2YXIgeSA9IHNuYWtlWzBdLnk7XHJcbiAgICBzbmFrZVswXS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgIGNhc2UgXCJyaWdodFwiOlxyXG4gICAgICAgICAgICBzbmFrZS51bnNoaWZ0KHsgeDogeCArIHNwZWVkLCB5OiB5LCBjb2xvcjogXCIjMDhmXCIgfSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XHJcbiAgICAgICAgICAgIHNuYWtlLnVuc2hpZnQoeyB4OiB4IC0gc3BlZWQsIHk6IHksIGNvbG9yOiBcIiMwOGZcIiB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInVwXCI6XHJcbiAgICAgICAgICAgIHNuYWtlLnVuc2hpZnQoeyB4OiB4LCB5OiB5IC0gc3BlZWQsIGNvbG9yOiBcIiMwOGZcIiB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRvd25cIjpcclxuICAgICAgICAgICAgc25ha2UudW5zaGlmdCh7IHg6IHgsIHk6IHkgKyBzcGVlZCwgY29sb3I6IFwiIzA4ZlwiIH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGRyYXdfc25ha2VfMS5kZWZhdWx0KGN0eCwgc25ha2UpO1xyXG4gICAgcmV0dXJuIHNuYWtlO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG1vdmU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZHJhd19zbmFrZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2Z1bmN0aW9ucy9kcmF3X3NuYWtlXCIpKTtcclxudmFyIGZpeF9kcGlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9mdW5jdGlvbnMvZml4X2RwaVwiKSk7XHJcbnZhciBtb3ZlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vZnVuY3Rpb25zL21vdmVcIikpO1xyXG52YXIgY2hlY2tOZXh0TW92ZW1lbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9mdW5jdGlvbnMvY2hlY2tOZXh0TW92ZW1lbnRcIikpO1xyXG5mdW5jdGlvbiBtb3ZlbWVudChibG9ja3MpIHtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9udC1jYW52YXNcIik7XHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIGZpeF9kcGlfMS5kZWZhdWx0KGN0eCk7XHJcbiAgICB2YXIgbW92ZW1lbnQgPSBcInJpZ2h0XCI7XHJcbiAgICB2YXIgc25ha2UgPSBkcmF3X3NuYWtlXzEuZGVmYXVsdChjdHgpO1xyXG4gICAgdmFyIGludGVydmFsID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBtb3ZlU25ha2UoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbmFrZSA9IG1vdmVfMS5kZWZhdWx0KHNuYWtlLCBjdHgsIG1vdmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrTmV4dE1vdmVtZW50XzEuZGVmYXVsdChibG9ja3MsIHNuYWtlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShpbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGFsZXJ0KFwiWW91IGxvc2UhXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWwgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobW92ZVNuYWtlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHNuYWtlKTtcclxuICAgICAgICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgbW92ZVNuYWtlKCldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9KTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5rZXkgPT0ga2V5Ym9hcmRfa2V5cy5VUCkge1xyXG4gICAgICAgICAgICBpZiAobW92ZW1lbnQgPT0gXCJkb3duXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIG1vdmVtZW50ID0gXCJ1cFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQua2V5ID09IGtleWJvYXJkX2tleXMuRE9XTikge1xyXG4gICAgICAgICAgICBpZiAobW92ZW1lbnQgPT0gXCJ1cFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBtb3ZlbWVudCA9IFwiZG93blwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQua2V5ID09IGtleWJvYXJkX2tleXMuTEVGVCkge1xyXG4gICAgICAgICAgICBpZiAobW92ZW1lbnQgPT0gXCJyaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBtb3ZlbWVudCA9IFwibGVmdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQua2V5ID09IGtleWJvYXJkX2tleXMuUklHSFQpIHtcclxuICAgICAgICAgICAgaWYgKG1vdmVtZW50ID09IFwibGVmdFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBtb3ZlbWVudCA9IFwicmlnaHRcIjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBtb3ZlbWVudDtcclxudmFyIGtleWJvYXJkX2tleXM7XHJcbihmdW5jdGlvbiAoa2V5Ym9hcmRfa2V5cykge1xyXG4gICAga2V5Ym9hcmRfa2V5c1tcIkRPV05cIl0gPSBcIkFycm93RG93blwiO1xyXG4gICAga2V5Ym9hcmRfa2V5c1tcIlVQXCJdID0gXCJBcnJvd1VwXCI7XHJcbiAgICBrZXlib2FyZF9rZXlzW1wiTEVGVFwiXSA9IFwiQXJyb3dMZWZ0XCI7XHJcbiAgICBrZXlib2FyZF9rZXlzW1wiUklHSFRcIl0gPSBcIkFycm93UmlnaHRcIjtcclxufSkoa2V5Ym9hcmRfa2V5cyB8fCAoa2V5Ym9hcmRfa2V5cyA9IHt9KSk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5yZXF1aXJlKFwiLi9iYWNrZ3JvdW5kXCIpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=