<template>
    <div tabindex="0">
        <div id="score" class="title-container">
            <span>{{ score }} </span>
            <button @click="titleButtonClicked">{{ titleBtnText }}</button>
        </div>

        <canvas
            id="mazeBoard"
            ref="mazeBoard"
            :width="boardSize"
            :height="boardSize"
        ></canvas>
    </div>
</template>

<script>
    import config from "@/components/Maze/configuration";

    export default {
        name: "MazeBoard",
        data() {
            return {
                boardSize: config.boardSize,
                blockSize: config.boardSize / config.blockSize,
                blocksWall: new Set(),
                blocksNumber: config.boardSize / config.blockSize - 1,
                gameActive: true,
                score: 0
            };
        },
        mounted() {
            this.mazeBoard = this.$refs["mazeBoard"];
            this.mazeBoardContext = this.mazeBoard.getContext("2d");
            this.clearBoard();
            this.registerMouseEvents();
        },
        computed: {
            titleBtnText() {
                let txt;
                if (this.gameActive) {
                    txt = "START";
                } else {
                    txt = "RESET";
                }
                return txt;
            }
        },
        methods: {
            titleButtonClicked() {
                console.log(this.gameActive);
                if (this.gameActive) {
                    this.startTraverseMaze();
                } else {
                    this.resetGame();
                    this.gameActive = true;
                }
            },
            registerMouseEvents() {
                let isRegisteringWall = false;
                let isRemovingWall = false;
                this.mazeBoard.onmousedown = event => {
                    if (this.gameActive) {
                        if (event.button === 0) {
                            isRegisteringWall = true;
                        } else {
                            isRemovingWall = true;
                        }
                    }
                };
                this.mazeBoard.oncontextmenu = event => {
                    if (this.gameActive) {
                        this.removeWallBlock(event);
                    }
                    event.preventDefault();
                };
                this.mazeBoard.onclick = event => {
                    if (this.gameActive) {
                        this.registerWallBlock(event);
                    }
                };
                this.mazeBoard.onmousemove = event => {
                    if (this.gameActive) {
                        if (isRegisteringWall === true) {
                            this.registerWallBlock(event);
                        } else if (isRemovingWall === true) {
                            this.removeWallBlock(event);
                        }
                    }
                };
                this.mazeBoard.onmouseleave = () => {
                    isRegisteringWall = false;
                    isRemovingWall = false;
                };
                this.mazeBoard.onmouseup = () => {
                    isRegisteringWall = false;
                    isRemovingWall = false;
                };
            },
            startTraverseMaze() {
                this.gameActive = false;
                let mazeMatrixRep = this.getMatrixRepresentation();
                let solveRoute = this.mazeSolver(mazeMatrixRep);
                if (solveRoute.length > 0) {
                    let solvedRoutesArr = solveRoute.map(routeCell =>
                        this.getIndexesValue(routeCell)
                    );
                    solvedRoutesArr.forEach(routeCell => {
                        let {i, j} = routeCell;
                        this.drawBlockByIndexPlace(
                            i,
                            j,
                            config.traverseBlockColor,
                            config.traverseBlockBorder
                        );
                    });
                    this.score = solvedRoutesArr.length;
                }
            },
            getMatrixRepresentation() {
                let arr = [];
                this.loopBoardBlocks((i, j) => {
                    if (!arr[i]) {
                        arr[i] = [];
                    }
                    if (!arr[i][j]) {
                        arr[i][j] = [];
                    }
                    if (this.blocksWall.has(this.getIndexesKey(i, j))) {
                        arr[i][j] = 0;
                    } else {
                        arr[i][j] = 1;
                    }
                });
                arr[this.blocksNumber][this.blocksNumber] = 2;
                return arr;
            },
            mazeSolver(maze) {
                this.maze = maze;
                let route = [];
                this.traverse = (column, row) => {
                    let indexesKey = this.getIndexesKey(column, row);
                    let success = false;
                    if (this.maze[column][row] === 2) {
                        route.push(indexesKey);
                        return true;
                    } else if (this.maze[column][row] === 1) {
                        this.maze[column][row] = 9;
                        if (column < this.maze.length - 1) {
                            success = this.traverse(column + 1, row);
                        }
                        if (success) {
                            route.push(indexesKey);
                            return true;
                        }
                        if (row < this.maze[column].length - 1) {
                            success = this.traverse(column, row + 1);
                        }
                        if (success) {
                            route.push(indexesKey);
                            return true;
                        }
                        if (column > 0) {
                            success = this.traverse(column - 1, row);
                        }
                        if (success) {
                            route.push(indexesKey);
                            return true;
                        }
                        if (row > 0) {
                            success = this.traverse(column, row - 1);
                        }
                        if (success) {
                            route.push(indexesKey);
                            return true;
                        }
                    }
                    return success;
                };
                this.traverse(0, 0);
                return route;
            },
            isEnabledBlockIndex(i, j) {
                return (
                    !(i === 0 && j === 0) &&
                    !(i === this.blocksNumber && j === this.blocksNumber)
                );
            },
            registerWallBlock(event) {
                let {i, j} = this.getMatchingCoordinate(event);
                if (this.isEnabledBlockIndex(i, j)) {
                    this.blocksWall.add(this.getIndexesKey(i, j));
                    this.drawBlockByIndexPlace(
                        i,
                        j,
                        config.wallBlockColor,
                        config.wallBlockBorder
                    );
                }
            },
            getIndexesKey(i, j) {
                return `${i}:${j}`;
            },
            getIndexesValue(key) {
                let coords = key.split(":");
                return {i: coords[0], j: coords[1]};
            },
            removeWallBlock(event) {
                let {i, j} = this.getMatchingCoordinate(event);
                if (this.isEnabledBlockIndex(i, j)) {
                    this.blocksWall.delete(this.getIndexesKey(i, j));
                    this.drawBlockByIndexPlace(
                        i,
                        j,
                        config.emptyBlockColor,
                        config.emptyBlockBorder
                    );
                }
            },
            getMatchingCoordinate(event) {
                let {clientX, clientY} = event;
                let i, j, x, y;
                const rect = this.mazeBoard.getBoundingClientRect();
                y = clientX - rect.left;
                x = clientY - rect.top;
                i = Math.floor(x / config.blockSize);
                j = Math.floor(y / config.blockSize);
                return {i, j};
            },
            resetGame() {
                this.blocksWall.clear();
                this.score = 0;
                this.clearBoard();
            },
            clearBoard() {
                this.mazeBoardContext.fillStyle = config.boardBackground;
                this.mazeBoardContext.strokestyle = config.boardBorder;
                this.mazeBoardContext.fillRect(
                    0,
                    0,
                    this.mazeBoard.width,
                    this.mazeBoard.height
                );
                this.mazeBoardContext.strokeRect(
                    0,
                    0,
                    this.mazeBoard.width,
                    this.mazeBoard.height
                );
                this.drawBoardBlocks(config.emptyBlockColor, config.emptyBlockBorder);
                this.drawBlockByIndexPlace(
                    0,
                    0,
                    config.traverseBlockColor,
                    config.traverseBlockColor
                );
                this.drawBlockByIndexPlace(
                    this.blockSize - 1,
                    this.blockSize - 1,
                    config.traverseBlockColor,
                    config.traverseBlockColor
                );
            },
            loopBoardBlocks(callback) {
                for (let i = 0; i <= this.blocksNumber; i++) {
                    for (let j = 0; j <= this.blocksNumber; j++) {
                        callback(i, j);
                    }
                }
            },
            drawBoardBlocks(blockColor, blockBorderColor) {
                this.loopBoardBlocks((i, j) => {
                    this.drawBlockByIndexPlace(i, j, blockColor, blockBorderColor);
                });
            },
            drawBlockByIndexPlace(i, j, color, borderColor) {
                this.drawBlock(
                    j * config.blockSize,
                    i * config.blockSize,
                    color,
                    borderColor
                );
            },
            drawBlock(x, y, color, borderColor) {
                this.mazeBoardContext.fillStyle = color;
                this.mazeBoardContext.strokestyle = borderColor;
                this.mazeBoardContext.fillRect(x, y, config.blockSize, config.blockSize);
                this.mazeBoardContext.strokeRect(
                    x,
                    y,
                    config.blockSize,
                    config.blockSize
                );
            }
        }
    };
</script>

<style scoped>
    .title-container {
        display: flex;
        flex-direction: column;
        top: 10%;
        user-select: none;
    }
    #mazeBoard {
        top: 60%;
    }
    .title-container,
    #mazeBoard {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #score {
        text-align: center;
        font-size: 80px;
    }
</style>
