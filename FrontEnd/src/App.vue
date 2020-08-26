<template>
    <Board></Board>
</template>

<script>
    import Vue from "vue";
    import eventBus from "./utils/eventBus";
    import Board from "@/components/Board";
    import SvgIcon from "vue-svgicon";
    Vue.use(SvgIcon);
    eventBus.setEventBus(new Vue());

    export default {
        name: "App",
        components: {Board},
        data() {
            return {};
        }
    };
</script>

<style lang="scss">
    $disabled_color: grey;
    html,
    body {
        background-color: #f1f2f3;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .ellipsis {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .visible {
        visibility: visible;
    }
    .hidden {
        visibility: hidden;
    }
</style>
