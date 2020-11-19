<template>
    <div
        tabindex="0"
        v-keyboardShortcut="{
            shortcutsArray: getKeyboardShortcuts(),
            stopPropagation: true,
            debounceTime
        }"
    >
        <div id="score" class="title-container">{{ score }}</div>
        <canvas id="snakeBoard" ref="snakeBoard" width="400px" height="400px"></canvas>
    </div>
</template>

<script>
    import config from "@/components/SnakeGame/configuration";
    import keyboardShortcut from "@/directives/keyboardShortcut";
    import keyboardKeys from "@/utils/keyboardKeys.json";
    import {gameState} from "@/components/SnakeGame/constants";
    import Timer from "@/components/SnakeGame/Timer";
    export default {
        name: "SnakeGame",
        directives: {
            keyboardShortcut
        },
        data() {
            return {
                snakeBoard: null,
                snakeBoardContext: null,
                foodX: null,
                foodY: null,
                score: 0,
                snake: [
                    {x: 200, y: 200},
                    {x: 190, y: 200},
                    {x: 180, y: 200},
                    {x: 170, y: 200}
                ],
                state: gameState.PAUSED,
                dx: 10,
                dy: 0,
                boardSize: config.boardSize + "px",
                timer: new Timer(config.gameSpeed, this.nextGameTick),
                debounceTime: 80
            };
        },

        mounted() {
            this.snakeBoard = this.$refs["snakeBoard"];
            this.snakeBoardContext = this.snakeBoard.getContext("2d");
            this.generateFoodCoordinates();
            this.pauseGame();
        },
        methods: {
            pauseGame() {
                this.timer.stop();
                this.drawPausedBackground();
                this.drawSnake();
                this.drawFood();
            },
            drawPausedBackground() {
                this.snakeBoardContext.fillStyle = "lightgrey";
                this.snakeBoardContext.fillRect(
                    0,
                    0,
                    this.snakeBoard.width,
                    this.snakeBoard.height
                );
            },
            resetGame() {
                this.snake = [
                    {x: 200, y: 200},
                    {x: 190, y: 200},
                    {x: 180, y: 200},
                    {x: 170, y: 200}
                ];
                this.dx = 10;
                this.dy = 0;
                this.score = 0;
                this.clearBoard();
                this.generateFoodCoordinates();
                this.pauseGame();
            },
            continueGame() {
                this.timer.start();
            },
            getKeyboardShortcuts() {
                return [
                    {
                        key: keyboardKeys.space,
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            if (this.state === gameState.DEAD) {
                                this.state = gameState.PAUSED;
                                this.resetGame();
                            } else if (this.state === gameState.ACTIVE) {
                                this.state = gameState.PAUSED;
                                this.pauseGame();
                            } else if (this.state === gameState.PAUSED) {
                                this.state = gameState.ACTIVE;
                                this.timer.start();
                            }
                        }
                    },
                    {
                        key: [keyboardKeys.arrow_up, keyboardKeys.w],
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            const goingDown = this.dy === 10;
                            if (!goingDown) {
                                this.dx = 0;
                                this.dy = -10;
                            }
                        }
                    },
                    {
                        key: [keyboardKeys.arrow_right, keyboardKeys.d],
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            const goingLeft = this.dx === -10;
                            if (!goingLeft) {
                                this.dx = 10;
                                this.dy = 0;
                            }
                        }
                    },
                    {
                        key: [keyboardKeys.arrow_down, keyboardKeys.s],
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            const goingUp = this.dy === -10;
                            if (!goingUp) {
                                this.dx = 0;
                                this.dy = 10;
                            }
                        }
                    },
                    {
                        key: [keyboardKeys.arrow_left, keyboardKeys.a],
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            const goingRight = this.dx === 10;
                            if (!goingRight) {
                                this.dx = -10;
                                this.dy = 0;
                            }
                        }
                    }
                ];
            },
            moveSnake() {
                const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
                const hitWall = this.hitAWall();
                if (hitWall.hit) {
                    head.x = hitWall.x;
                    head.y = hitWall.y;
                }

                this.snake.unshift(head);
                const hasEatenFood =
                    this.snake[0].x === this.foodX && this.snake[0].y === this.foodY;
                if (hasEatenFood) {
                    this.score += 1;
                    this.generateFoodCoordinates();
                } else {
                    this.snake.pop();
                }
            },
            hitAWall() {
                const hitLeftWall = this.snake[0].x < 0;
                const hitRightWall = this.snake[0].x > this.snakeBoard.width - 10;
                const hitTopWall = this.snake[0].y < 0;
                const hitBottomWall = this.snake[0].y > this.snakeBoard.height - 10;
                let newX, newY;
                newX = this.snake[0].x + this.dx;
                newY = this.snake[0].y + this.dy;
                if (hitLeftWall) {
                    newX = this.snakeBoard.width - 10;
                } else if (hitRightWall) {
                    newX = 0;
                } else if (hitTopWall) {
                    newY = this.snakeBoard.height - 10;
                } else if (hitBottomWall) {
                    newY = 0;
                }
                return {
                    hit: hitLeftWall || hitRightWall || hitTopWall || hitBottomWall,
                    x: newX,
                    y: newY
                };
            },
            hasGameEnded() {
                for (let i = 1; i < this.snake.length; i++) {
                    if (
                        this.snake[i].x === this.snake[0].x &&
                        this.snake[i].y === this.snake[0].y
                    )
                        return true;
                }
                if (config.wallsOn) {
                    const head = this.snake[0];
                    if (head.x < 0 || head.y < 0 || head.x === 400 || head.y === 400) {
                        return true;
                    }
                }
            },
            nextGameTick() {
                this.moveSnake();
                if (this.hasGameEnded()) {
                    this.endGame();
                    return;
                }
                this.clearBoard();
                this.drawFood();
                this.drawSnake();
            },
            endGame() {
                this.state = gameState.DEAD;
                this.timer.stop();
                window.alert("Your snake died, press 'space' to restart");
            },
            randomCoordinates(min, max) {
                return Math.round((Math.random() * (max - min) + min) / 10) * 10;
            },
            drawFood() {
                this.snakeBoardContext.fillStyle = config.foodColor;
                this.snakeBoardContext.strokestyle = config.foodBorder;
                this.snakeBoardContext.fillRect(this.foodX, this.foodY, 10, 10);
                this.snakeBoardContext.strokeRect(this.foodX, this.foodY, 10, 10);
            },
            drawSnake() {
                this.drawBlock(
                    this.snake[0],
                    config.snakeHeadColor,
                    config.snakeBorderColor
                );
                for (let i = 1; i < this.snake.length; i++) {
                    this.drawSnakePart(this.snake[i]);
                }
            },
            drawSnakePart(snakePart) {
                this.drawBlock(snakePart, config.snakeColor, config.snakeBorderColor);
            },
            drawBlock(snakePart, color, borderColor) {
                this.snakeBoardContext.fillStyle = color;
                this.snakeBoardContext.strokestyle = borderColor;
                this.snakeBoardContext.fillRect(snakePart.x, snakePart.y, 10, 10);
                this.snakeBoardContext.strokeRect(snakePart.x, snakePart.y, 10, 10);
            },
            clearBoard() {
                this.snakeBoardContext.fillStyle = config.boardBackground;
                this.snakeBoardContext.strokestyle = config.boardBorder;
                this.snakeBoardContext.fillRect(
                    0,
                    0,
                    this.snakeBoard.width,
                    this.snakeBoard.height
                );
                this.snakeBoardContext.strokeRect(
                    0,
                    0,
                    this.snakeBoard.width,
                    this.snakeBoard.height
                );
            },
            generateFoodCoordinates() {
                this.foodX = this.randomCoordinates(0, this.snakeBoard.width - 10);
                this.foodY = this.randomCoordinates(0, this.snakeBoard.height - 10);
                this.snake.forEach(part => {
                    const hasEaten = part.x === this.foodX && part.y === this.foodY;
                    if (hasEaten) {
                        this.generateFoodCoordinates();
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .title-container {
        top: 10%;
    }
    #snakeBoard {
        top: 60%;
    }
    .title-container,
    #snakeBoard {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #score {
        text-align: center;
        font-size: 140px;
    }
</style>
