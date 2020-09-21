<template>
    <div class="app-card-container">
        <a :href="appPath">
            <SVGIcon class="app-card-icon" :iconName="iconName"></SVGIcon>
        </a>
    </div>
</template>

<script>
    import SVGIcon from "@/components/Board/SVGIcon";
    export default {
        name: "AppCard",
        components: {
            SVGIcon
        },
        props: {
            appPath: {
                type: String,
                require: true
            },
            iconName: {
                type: String,
                default: null
            }
        }
    };
</script>

<style scoped lang="scss">
    .app-card-container {
        &:hover {
            background-color: wheat;
            border-bottom-color: black;
        }
    }
    .app-card-icon {
        padding: 7px 12px;
        height: 80px;
        width: 80px;
    }
</style>
