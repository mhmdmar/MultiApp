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
            <span v-if="winner !== ''">{{ winner }}</span>
            <span v-else>Turn : {{ currentPlayer.name }}</span>
        </div>
    </div>
</template>

<script>
    const PLAYER_NAME = {
        ONE: "Player 1",
        TWO: "Player 2"
    };
    const PLAYERS = {
        one: {
            mark: "X",
            name: PLAYER_NAME.ONE
        },
        two: {
            mark: "O",
            name: PLAYER_NAME.TWO
        }
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
                        players: "two"
                    };
                }
            }
        },
        data() {
            const players = this.gameConfig.players;
            if (players === "one") {
                PLAYER_NAME.TWO = "COMPUTER";
                PLAYERS.two.name = "COMPUTER";
            }
            return {
                blocks: this.getResetBlock(),
                gameState: GAME_STATE.ACTIVE,
                turn: PLAYER_NAME.ONE,
                winner: "",
                players
            };
        },
        methods: {
            getResetBlock() {
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
                    if (block.occupied) {
                        return;
                    }
                    block.occupied = true;
                    this.drawBlock(block, this.currentPlayer.mark);
                    this.nextTurn();
                }
            },
            drawBlock(block, mark) {
                block.mark = mark;
            },
            nextTurn() {
                let winner = this.checkWinner();
                if (winner !== "") {
                    if (winner === "DRAW") {
                        this.draw();
                    } else {
                        this.win();
                    }
                } else {
                    this.switchPlayerTurn();
                    if (this.players === "one") {
                        this.gameState = GAME_STATE.PAUSED;
                        this.computerMove();
                    }
                }
            },
            computerMove() {
                setTimeout(() => {
                    console.log("I don't know how to play yet");
                    this.gameState = GAME_STATE.ACTIVE;
                    this.switchPlayerTurn();
                }, 2000);
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
                if (this.turn === PLAYER_NAME.ONE) {
                    this.turn = PLAYER_NAME.TWO;
                } else {
                    this.turn = PLAYER_NAME.ONE;
                }
            },
            resetBoard() {
                this.gameState = GAME_STATE.ACTIVE;
                this.winner = "";
                this.blocks = this.getResetBlock();
            },
            checkWinner() {
                let i;
                let winnerMark = "";
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
                if (winnerMark !== "") {
                    return PLAYERS.one.mark === winnerMark
                        ? PLAYERS.one.name
                        : PLAYERS.two.name;
                } else {
                    if (this.blocks.some(block => block.mark === undefined)) {
                        return "";
                    } else {
                        return "DRAW";
                    }
                }
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
                let player;
                if (this.turn === PLAYER_NAME.ONE) {
                    player = PLAYERS.one;
                } else {
                    player = PLAYERS.two;
                }
                return player;
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
