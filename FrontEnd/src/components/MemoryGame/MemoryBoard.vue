<template>
    <div>
        <div class="counter-container">
            <span>Number of tries {{ this.clicksCounter }}</span>
            <div title="start again">
                <SVGIcon
                    class="reset-icon"
                    iconName="Dragging"
                    @click="resetGame"
                ></SVGIcon>
            </div>
        </div>
        <div class="memory-card-container">
            <div v-for="(card, i) in cards" :key="i">
                <MemoryCard
                    class="memory-card"
                    :iconName="card.iconName"
                    :isRevealed="card.isRevealed"
                    @click="cardClick(card, i)"
                ></MemoryCard>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import MemoryCard from "@/components/MemoryGame/MemoryCard";
    import memoryCardsList from "@/components/MemoryGame/MemoryCardsList";
    import VueConfetti from "vue-confetti";
    import SVGIcon from "@/components/Board/SVGIcon";

    Vue.use(VueConfetti);
    export default {
        name: "MemoryBoard",
        components: {SVGIcon, MemoryCard},
        data() {
            return {
                cards: [],
                clicksCounter: 0,
                lastRevealedCard: null,
                lastRevealedCardIndex: null,
                boardReady: true
            };
        },
        mounted() {
            this.startGame();
        },
        methods: {
            resetGame() {
                this.clicksCounter = 0;
                this.startGame();
            },
            startGame() {
                this.createCardsObject();
            },
            shuffleCards(cards) {
                let sourceArray = cards;
                for (let i = 0; i < sourceArray.length - 1; i++) {
                    let j = i + Math.floor(Math.random() * (sourceArray.length - i));
                    let temp = sourceArray[j];
                    sourceArray[j] = sourceArray[i];
                    sourceArray[i] = temp;
                }
                return sourceArray;
            },
            createCardsObject() {
                let cards = [...memoryCardsList, ...memoryCardsList].map(card => {
                    return {iconName: card, isRevealed: false};
                });
                this.cards = this.shuffleCards(cards);
            },
            setBoardReady(isReady) {
                this.boardReady = isReady;
            },
            isGameWon() {
                return !this.cards.some(card => card.isRevealed === false);
            },
            promptWinMessage() {
                window.alert(
                    "GZ, you won with " +
                        this.clicksCounter +
                        " tries only, click reset button to try again"
                );
            },
            cardClick(card, index) {
                /* prevent clicking multiple times before the calculation is over */
                if (!this.boardReady || this.lastRevealedCardIndex === index) {
                    return;
                }

                // TODO need to simplify this
                this.setBoardReady(false);
                this.lastRevealedCardIndex = index;
                this.clicksCounter++;
                card.isRevealed = !card.isRevealed;
                if (card.isRevealed) {
                    if (this.lastRevealedCard === null) {
                        this.lastRevealedCard = card;
                        this.setBoardReady(true);
                    } else {
                        setTimeout(() => {
                            if (card.iconName === this.lastRevealedCard.iconName) {
                                this.lastRevealedCard = null;
                                this.$confetti.start();
                                setTimeout(() => {
                                    this.$confetti.stop();
                                    let isWon = this.isGameWon();
                                    if (isWon) {
                                        this.promptWinMessage();
                                    }
                                    this.setBoardReady(!isWon);
                                }, 2000);
                            } else {
                                card.isRevealed = false;
                                this.lastRevealedCard.isRevealed = false;
                                this.lastRevealedCard = null;
                                this.setBoardReady(true);
                                this.lastRevealedCardIndex = null;
                            }
                        }, 1000);
                    }
                }
            }
        }
    };
</script>

<style scoped>
    .memory-card-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .memory-card {
        justify-content: space-evenly;
        margin: 15px;
    }
    .counter-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .reset-icon {
        margin-right: 15px;
        margin-left: 15px;
        margin-top: 1px;
    }
</style>
