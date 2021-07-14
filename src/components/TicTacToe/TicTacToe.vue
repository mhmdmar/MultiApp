<template>
    <div class="container">
        <h1>Tic-Tac-Toe</h1>
        <div class="play-area">
            <div
                v-for="block in blocks"
                :key="block.id"
                class="block"
                :class="{occupied: block.occupied, win: block.winner}"
                v-html="block.mark"
                @click="blockClicked(block)"
            ></div>
        </div>
        <button @click="resetBoard" class="reset-button">RESET</button>
        <div class="winner-name">
            <span v-if="winner">{{ winner }}</span>
            <span v-else>Turn : {{ currentPlayer.name }}</span>
        </div>
    </div>
</template>

<script>
    const PLAYER_NAME = {
        ONE: "Player 1",
        TWO: "Player 2",
        COMPUTER: "Computer"
    };
    const GAME_MODE = {
        SINGLE_PLAYER: "single",
        Multi_PLAYERS: "multi"
    };
    const GAME_STATE = {
        ACTIVE: 0,
        OVER: 1,
        PAUSED: 2
    };
    export default {
        name: "TicTacToe",
        props: {
            gameConfig: {
                type: Object,
                default() {
                    return {
                        gameMode: GAME_MODE.SINGLE_PLAYER
                    };
                }
            }
        },
        data() {
            const gameMode = this.gameConfig.gameMode;
            const player1 = {
                name: PLAYER_NAME.ONE,
                mark: "X"
            };
            const player2 = {
                name:
                    gameMode === GAME_MODE.SINGLE_PLAYER
                        ? PLAYER_NAME.COMPUTER
                        : PLAYER_NAME.TWO,
                mark: "O"
            };

            return {
                blocks: this.getFreshBlocks(),
                gameState: GAME_STATE.ACTIVE,
                turn: player1,
                player1,
                player2,
                winner: null,
                gameMode
            };
        },
        methods: {
            getFreshBlocks() {
                const blocks = [];
                for (let i = 0; i <= 8; i++) {
                    blocks.push({
                        id: `block_${i}`,
                        occupied: false
                    });
                }
                return blocks;
            },
            blockClicked(block) {
                if (this.gameState === GAME_STATE.ACTIVE) {
                    if (!block.occupied) {
                        this.selectBlock(block);
                    }
                }
            },
            selectBlock(block) {
                block.occupied = true;
                this.drawMarkOnBlock(block, this.currentPlayer.mark);
                this.nextTurn();
            },
            drawMarkOnBlock(block, mark) {
                block.mark = mark;
            },
            async nextTurn() {
                const gameEnded = this.validateGameEnded();
                if (!gameEnded) {
                    this.switchPlayerTurn();
                    if (this.gameMode === GAME_MODE.SINGLE_PLAYER) {
                        if (this.currentPlayer === this.player2) {
                            this.gameState = GAME_STATE.PAUSED;
                            await this.computerMove();
                            if (this.validateGameEnded()) {
                                this.gameState = GAME_STATE.OVER;
                            } else {
                                this.gameState = GAME_STATE.ACTIVE;
                            }
                        }
                    }
                }
            },
            computerMove() {
                return new Promise(resolve => {
                    const block = this.getNextMoveBlock();
                    this.selectBlock(block);
                    resolve();
                });
            },
            getNextMoveBlock() {
                const gameWiningBlock = this.getGameEndingBlock(this.player2.mark);
                if (gameWiningBlock !== null) {
                    return gameWiningBlock;
                }
                const gameLoosingBlock = this.getGameEndingBlock(this.player1.mark);
                if (gameLoosingBlock !== null) {
                    return gameLoosingBlock;
                }

                const middleBlock = this.blocks[4];
                if (!middleBlock.occupied) {
                    return middleBlock;
                }
                // random option
                const availableBlocks = this.blocks.filter(
                    block => block.occupied === false
                );
                const len = availableBlocks.length;
                const randomIndex = Math.floor(Math.random() * len);
                return availableBlocks[randomIndex];
            },
            getGameEndingBlockFromLine(firstIndex, secondIndex, thirdIndex, mark) {
                // search for 2 blocks with the same mark in the line represented by the indexes in the arguments
                if (
                    this.blocks[firstIndex].mark === mark &&
                    this.blocks[firstIndex].mark === this.blocks[secondIndex].mark &&
                    !this.blocks[thirdIndex].occupied
                ) {
                    return this.blocks[thirdIndex];
                }
                if (
                    this.blocks[firstIndex].mark === mark &&
                    this.blocks[firstIndex].mark === this.blocks[thirdIndex].mark &&
                    !this.blocks[secondIndex].occupied
                ) {
                    return this.blocks[secondIndex];
                }
                if (
                    this.blocks[secondIndex].mark === mark &&
                    this.blocks[secondIndex].mark === this.blocks[thirdIndex].mark &&
                    !this.blocks[firstIndex].occupied
                ) {
                    return this.blocks[firstIndex];
                }
                return null;
            },
            getGameEndingBlock() {
                const gameWiningBlock = this.getGameEndingBlockByMark(this.player2.mark);
                if (gameWiningBlock !== null) {
                    return gameWiningBlock;
                }
                const gameLoosingBlock = this.getGameEndingBlockByMark(this.player1.mark);
                if (gameLoosingBlock !== null) {
                    return gameLoosingBlock;
                }
                return null;
            },
            getGameEndingBlockByMark(mark) {
                return (
                    // by rows
                    this.getGameEndingBlockFromLine(0, 1, 2, mark) ||
                    this.getGameEndingBlockFromLine(3, 4, 5, mark) ||
                    this.getGameEndingBlockFromLine(6, 7, 8, mark) ||
                    // by columns
                    this.getGameEndingBlockFromLine(0, 3, 6, mark) ||
                    this.getGameEndingBlockFromLine(1, 4, 7, mark) ||
                    this.getGameEndingBlockFromLine(2, 5, 8, mark) ||
                    // diagonally
                    this.getGameEndingBlockFromLine(0, 4, 8, mark) ||
                    this.getGameEndingBlockFromLine(2, 4, 6, mark) ||
                    null
                );
            },
            draw() {
                this.gameState = GAME_STATE.OVER;
                this.winner = "DRAW";
            },
            win() {
                this.gameState = GAME_STATE.OVER;
                this.winner = this.currentPlayer.name + " win!";
            },
            switchPlayerTurn() {
                if (this.turn === this.player1) {
                    this.turn = this.player2;
                } else {
                    this.turn = this.player1;
                }
            },
            resetBoard() {
                this.gameState = GAME_STATE.ACTIVE;
                this.winner = null;
                this.blocks = this.getFreshBlocks();
                this.turn = this.player1;
            },
            getWinner() {
                let i;
                let winnerMark = null;
                for (i = 0; i < 9; i += 3) {
                    if (this.checkLines(i, i + 1, i + 2)) {
                        winnerMark = this.blocks[i].mark;
                    }
                }
                for (i = 0; i < 3; i++) {
                    if (this.checkLines(i, i + 3, i + 6)) {
                        winnerMark = this.blocks[i].mark;
                    }
                }
                if (this.checkLines(0, 4, 8)) {
                    winnerMark = this.blocks[i].mark;
                }
                if (this.checkLines(2, 4, 6)) {
                    winnerMark = this.blocks[i].mark;
                }
                if (winnerMark) {
                    return this.player1.mark === winnerMark
                        ? this.player1.name
                        : this.player2.name;
                } else {
                    if (this.blocks.some(block => block.mark === undefined)) {
                        return null;
                    } else {
                        return "DRAW";
                    }
                }
            },
            validateGameEnded() {
                const winner = this.getWinner();
                if (winner) {
                    if (winner === "DRAW") {
                        this.draw();
                    } else {
                        this.win();
                    }
                    return true;
                }
                return false;
            },
            checkLines(block1, block2, block3) {
                if (
                    this.blocks[block1].mark !== undefined &&
                    this.blocks[block1].mark === this.blocks[block2].mark &&
                    this.blocks[block2].mark === this.blocks[block3].mark
                ) {
                    this.blocks[block1].winner = true;
                    this.blocks[block2].winner = true;
                    this.blocks[block3].winner = true;
                    return true;
                }
                return false;
            }
        },
        computed: {
            currentPlayer() {
                return this.turn === this.player1 ? this.player1 : this.player2;
            }
        }
    };
</script>

<style scoped lang="scss">
    * {
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    h1 {
        font-size: 48px;
        margin-bottom: 12px;
    }

    .winner-name {
        margin-top: 15px;
        font-size: 24px;
        margin-bottom: 10px;
    }

    .play-area {
        display: grid;
        width: 300px;
        height: 300px;
        grid-template-columns: auto auto auto;
        background-color: white;
    }

    .block {
        display: flex;
        width: 100px;
        height: 100px;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        font-weight: bold;
        border: 3px solid black;
        transition: background 0.2s ease-in-out;
    }

    .block:hover {
        cursor: pointer;
        background: #0ff30f;
    }

    .occupied:hover {
        background: #ff3a3a;
    }

    .win {
        background: #0ff30f;

        &:hover {
            background: #0ff30f;
        }
    }

    .reset-button {
        margin-top: 15px;
        margin-right: 150px;
        outline: none;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        background: none;
        transition: all 0.2s ease-in-out;

        &:hover {
            cursor: pointer;
            color: green;
        }
    }

    .winner-name {
        height: 30px;
        width: 250px;
    }
</style>
