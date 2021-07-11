<template>
    <div>
        <div v-if="!gameStarted">
            <ConfigurationScreen
                :gameConfigs="gameConfigs"
                @startClicked="startGame"
            ></ConfigurationScreen>
        </div>
        <div v-else>
            <SnakeGame :gameConfig="gameConfig" @gameEnded="gameEnded"></SnakeGame>
        </div>
    </div>
</template>

<script>
    import SnakeGame from "@/components/SnakeGame/SnakeGame";
    import ConfigurationScreen from "@/components/Shared/ConfigurationScreen";
    import {defaultConfig, configOptions} from "@/components/SnakeGame/configuration";
    export default {
        name: "SnakeGameMainScreen",
        components: {ConfigurationScreen, SnakeGame},
        data() {
            return {
                gameStarted: false,
                gameConfigs: configOptions,
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
