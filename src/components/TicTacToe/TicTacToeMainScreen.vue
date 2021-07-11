<template>
    <div>
        <div v-if="!gameStarted">
            <ConfigurationScreen
                :gameConfigs="options"
                @startClicked="startGame"
            ></ConfigurationScreen>
        </div>
        <div v-else>
            <TicTacToe :gameConfig="gameConfig"></TicTacToe>
        </div>
    </div>
</template>

<script>
    import ConfigurationScreen from "@/components/Shared/ConfigurationScreen";
    import TicTacToe from "@/components/TicTacToe/TicTacToe";
    const defaultConfig = {
        gameMode: "Single Player"
    };
    const options = [
        {
            id: "gameMode",
            title: "Players",
            defaultValue: "single",
            options: [
                {
                    value: "single",
                    text: "Single Player"
                },
                {
                    value: "multi",
                    text: "Multi Player"
                }
            ]
        }
    ];
    export default {
        name: "TicTacToeMainScreen",
        components: {
            ConfigurationScreen,
            TicTacToe
        },
        data() {
            return {
                options,
                gameStarted: false,
                gameConfig: {}
            };
        },
        methods: {
            getGameConfig(config) {
                return Object.assign(defaultConfig, config);
            },
            startGame(config) {
                this.gameConfig = this.getGameConfig(config);
                this.gameStarted = true;
            },
            gameEnded() {
                this.gameStarted = false;
            }
        }
    };
</script>

<style scoped></style>
