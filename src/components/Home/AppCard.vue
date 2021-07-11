<template>
    <div class="app-card-container">
        <a :href="appPath">
            <SvgIcon class="app-card-icon" :icon="iconName"></SvgIcon>
        </a>
    </div>
</template>

<script>
    import SvgIcon from "@/components/Shared/SvgIcon";
    export default {
        name: "AppCard",
        components: {
            SvgIcon
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
    .app-card-icon {
        padding: 7px 12px;
        height: 80px;
        width: 80px;
    }
</style>
