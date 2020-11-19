<template>
    <div class="container">
        <ConfigurationScreen :gameConfigs="configs"></ConfigurationScreen>
    </div>
</template>

<script>
    import ConfigurationScreen from "@/components/Shared/ConfigurationScreen";

    const configs = [
        {
            id: "gameSpeed",
            title: "Game Speed",
            defaultValue: "d",
            options: [
                {
                    value: "b",
                    text: "bb"
                },
                {
                    value: "d",
                    text: "dd"
                }
            ]
        },
        {
            id: "snakeColor",
            title: "Snake Color",
            defaultValue: "dd",
            options: [
                {
                    value: "bb",
                    text: "bb"
                },
                {
                    value: "dd",
                    text: "dd"
                }
            ]
        }
    ];
    export default {
        name: "ViewTest",
        components: {ConfigurationScreen},
        data() {
            return {
                configs
            };
        }
    };
</script>

<style scoped>
    .container {
        background-color: white;
    }
</style>
