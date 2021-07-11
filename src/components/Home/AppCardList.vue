<template>
    <div class="app-card-container">
        <div v-for="(app, i) in appsList" :key="i" class="app-card flex-initial">
            <AppCard :appPath="app.path" :iconName="app.iconName"></AppCard>
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
    .app-card-container {
        @apply flex flex-col justify-center md:flex-row m-auto;
    }
    .app-card {
        @apply border border-solid border-gray-500 m-2;
    }
</style>
