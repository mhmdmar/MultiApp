<template>
    <div>
        <div class="counter-container">
            <span>Number of clicks {{ this.clicksCounter }}</span>
            <div title="start again">
                <SvgIcon class="reset-icon" icon="Dragging" @click="resetGame"></SvgIcon>
            </div>
        </div>
        <div class="memory-card-container">
            <div v-for="(card, i) in cards" :key="i">
                <MemoryCard
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
    import SvgIcon from "@/components/Shared/SvgIcon";

    Vue.use(VueConfetti);
    export default {
        name: "MemoryBoard",
        components: {SvgIcon, MemoryCard},
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
        @apply w-full h-full grid grid-cols-3 md:grid-cols-8 m-6 md:m-12 md:mt-1 gap-y-4 md:gap-x-16 overflow-auto;
    }
    .counter-container {
        @apply flex justify-center flex-wrap items-center;
    }
    .reset-icon {
        @apply ml-3;
    }
</style>
