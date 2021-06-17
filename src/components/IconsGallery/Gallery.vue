<template>
    <div>
        <SvgSprite ref="svgSprite"></SvgSprite>
        <IconList :iconsList="iconsList"></IconList>
    </div>
</template>

<script>
    import IconList from "@/components/IconsGallery/IconsList.vue";
    import SvgSprite from "@/components/Shared/SvgSprite.vue";
    export default {
        name: "Gallery",
        components: {IconList, SvgSprite},
        data() {
            return {
                iconsList: []
            };
        },
        mounted() {
            /* Extract all icons id with from all of the elements <symbol> */
            const symbolRegex = new RegExp(`(?<=symbol).*?(?=>)`, "g");
            const idRegex = new RegExp(`(?<=id=").*?(?=")`);
            const svgSpriteTemplate = this.$refs["svgSprite"].$el.outerHTML;
            this.iconsList = svgSpriteTemplate
                .match(symbolRegex)
                .filter(symbol => symbol !== "")
                .map(symbol => {
                    if (symbol !== "") {
                        return {name: symbol.match(idRegex)[0]};
                    }
                });
        }
    };
</script>

<style scoped></style>
