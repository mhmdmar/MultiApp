<template>
    <div class="app-card-list-container">
        <div v-for="(app, i) in appsList" :key="i">
            <AppCard class="app-card" :appPath="app.path" :iconName="app.iconName"></AppCard>
        </div>
    </div>
</template>

<script>
    import AppCard from "@/components/Home/AppCard";
    export default {
        name: "AppCardList",
        components: {AppCard},
        props: {
            appsList: {
                type: Array,
                default: () => []
            }
        }
    };
</script>

<style scoped>
    .app-card-list-container {
        display: flex;
        justify-content: space-evenly;
    }
    .app-card {
        border: 1px solid darkgray;
        margin: 15px;
    }
</style>
