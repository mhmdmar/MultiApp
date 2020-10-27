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
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -100px;
        background-color: #ffffff;
    }
</style>
