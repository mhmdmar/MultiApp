<template>
    <div class="card-container">
        <div class="scene scene--card">
            <div
                ref="card"
                class="card"
                :class="{'is-flipped': isRevealed}"
                @click="cardClicked"
            >
                <div class="card__face card__face--front">Card</div>
                <div class="card__face card__face--back">
                    <SVGIcon class="memory-card-icon" :iconName="iconName"></SVGIcon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SVGIcon from "@/components/Board/SVGIcon";
    export default {
        name: "MemoryCard",
        components: {SVGIcon},
        props: {
            iconName: {
                type: String,
                required: true
            },
            isRevealed: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            cardClicked() {
                this.$emit("click");
            }
        }
    };
</script>

<style scoped lang="scss">
    .card-container {
        user-select: none;
    }
    .scene {
        width: 100px;
        height: 150px;
        border: 1px solid #ccc;
        margin: 40px 0;
        perspective: 600px;
    }

    .card {
        width: 100%;
        height: 100%;
        transition: transform 1s;
        transform-style: preserve-3d;
        cursor: pointer;
        position: relative;
        &.is-flipped {
            transform: rotateY(180deg);
        }
    }

    .card__face {
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 260px;
        color: white;
        text-align: center;
        font-weight: bold;
        font-size: 40px;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .card__face--front {
        background: white;
    }

    .card__face--back {
        transform: rotateY(180deg);
    }
    .memory-card-icon {
        width: 100%;
        height: 100%;
        fill: black;
    }
</style>
