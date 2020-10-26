<template>
    <div>
        <IconList :iconsList="iconsList"></IconList>
    </div>
</template>

<script>
    import IconList from "@/components/IconsGallery/IconsList.vue";
    import iconsList from "./iconsList";
    export default {
        name: "Gallery",
        components: {IconList},
        data() {
            return {
                iconsList
            };
        }
    };
</script>

<style scoped></style>
