<template>
    <div class="flex h-screen">
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

<style scoped></style>
