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

    const NODE_STATE = {
        UNVISITED: 1,
        VISITED: 2,
        TARGET: 3
    };
    export default {
        name: "MazeBoard",
        data() {
            let numberOfBlocks = config.boardSize / config.blockSize;
            return {
                boardSize: config.boardSize,
                blockSize: numberOfBlocks,
                blocksWall: new Set(),
                blocksNumber: numberOfBlocks - 1,
                gameActive: true,
                score: 0,
                sourceI: 0,
                sourceJ: 0,
                targetI: numberOfBlocks - 1,
                targetJ: numberOfBlocks - 1
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
                let solvedRoute = this.mazeSolver();
                let solvedRouteLen = solvedRoute.length;
                if (solvedRouteLen > 0) {
                    solvedRoute.forEach(routeCell => {
                        let {i, j} = routeCell;
                        this.drawBlockByIndexPlace(
                            i,
                            j,
                            config.pathBlockColor,
                            config.pathBlockBorder
                        );
                    });
                    this.drawSourceTargetBlock();
                    this.score = solvedRoute.length;
                } else {
                    window.alert("No path was found, click RESET to try again");
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
                return arr;
            },
            mazeSolver() {
                let maze = this.getMatrixRepresentation();
                maze[this.targetI][this.targetJ] = NODE_STATE.TARGET;
                let route = [];
                const _traverse = (column, row) => {
                    let success = false;
                    if (maze[column][row] === NODE_STATE.TARGET) {
                        route.push({i: column, j: row});
                        return true;
                    } else if (maze[column][row] === NODE_STATE.UNVISITED) {
                        maze[column][row] = NODE_STATE.VISITED;
                        if (column < maze.length - 1) {
                            success = _traverse(column + 1, row);
                        }
                        if (success) {
                            route.push({i: column, j: row});
                            return true;
                        }
                        if (row < maze[column].length - 1) {
                            success = _traverse(column, row + 1);
                        }
                        if (success) {
                            route.push({i: column, j: row});
                            return true;
                        }
                        if (column > 0) {
                            success = _traverse(column - 1, row);
                        }
                        if (success) {
                            route.push({i: column, j: row});
                            return true;
                        }
                        if (row > 0) {
                            success = _traverse(column, row - 1);
                        }
                        if (success) {
                            route.push({i: column, j: row});
                            return true;
                        }
                    }
                    return success;
                };
                _traverse(this.sourceI, this.sourceJ);
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
                this.drawEmptyBoardBlocks();
                this.drawSourceTargetBlock();
            },
            drawEmptyBoardBlocks() {
                this.drawBoardBlocks(config.emptyBlockColor, config.emptyBlockBorder);
            },
            drawSourceTargetBlock() {
                this.drawBlockByIndexPlace(
                    0,
                    0,
                    config.sourceTargetBlock,
                    config.sourceTargetBlock
                );
                this.drawBlockByIndexPlace(
                    this.blockSize - 1,
                    this.blockSize - 1,
                    config.sourceTargetBlock,
                    config.sourceTargetBlock
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
