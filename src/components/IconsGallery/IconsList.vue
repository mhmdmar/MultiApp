<template>
    <div class="list-container">
        <div v-for="icon in iconsList" v-bind:key="icon.name">
            <Card :title="icon.name" :code="code(icon)">
                <SvgIcon :icon="icon.name"></SvgIcon>
            </Card>
        </div>
    </div>
</template>

<script>
    import Card from "@/components/IconsGallery/Card";
    import SvgIcon from "@/components/Shared/SvgIcon";

    export default {
        name: "IconList",
        props: {
            iconsList: {
                type: Array,
                default: () => []
            }
        },
        components: {
            Card,
            SvgIcon
        },
        methods: {
            code: function(icon) {
                return `<SvgIcon icon="${icon.name}"></SvgIcon>`;
            },
            sortList: function() {
                return this.iconsList.sort((a, b) => a.name.localeCompare(b.name));
            }
        }
    };
</script>

<style scoped>
    .list-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .icon {
        font-size: 2.5em;
        height: 50px;
        width: 50px;
    }
    .icon-error,
    .icon-plus,
    .icon-textFile,
    .icon-minus,
    .icon-moreInfo,
    .icon-message,
    .icon-openWindow,
    .icon-phone,
    .icon-success,
    .icon-userWithKey,
    .icon-list,
    .icon-eye,
    .icon-pen,
    .icon-add {
        font-size: 2.5em;
    }

    .icon-warningTriangle,
    .icon-dialogWarning {
        fill: #f38b34;
    }

    .icon-error,
    .icon-dialogError {
        fill: red;
    }

    .icon-dialogInfo,
    .icon-success {
        fill: #1aac60;
    }
</style>
