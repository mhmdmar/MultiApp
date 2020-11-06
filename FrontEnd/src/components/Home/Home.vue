<template>
    <div class="app-list-container">
        <AppCardList :appsList="appsList"></AppCardList>
    </div>
</template>

<script>
    import AppCardList from "@/components/Home/AppCardList";
    import appsList from "@/components/Home/AppsList";
    export default {
        name: "Home",
        components: {AppCardList},
        data() {
            return {
                appsList
            };
        }
    };
</script>

<style scoped>
    .app-list-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
