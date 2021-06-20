<template>
    <div>
        <SvgSprite />
        <div class="top-bar">
            <router-link to="/">Home Page</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from "vue";
    import SvgSprite from "@/components/Shared/SvgSprite";
    import eventBus from "@/utils/eventBus";
    eventBus.setEventBus(new Vue());
    export default {
        name: "App",
        components: {
            SvgSprite
        },
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
    div[tabindex="0"]:focus {
        outline: none;
    }
    .top-bar {
        margin-bottom: 10px;
    }
</style>
