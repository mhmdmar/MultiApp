<template>
    <div>
        <div class="title">
            <span id="appName">Notebook</span>
        </div>
        <div class="toolbar-container" :class="{'disabled-toolbar': isEditMode}">
            <SVGIcon
                class="top-toolbar-icon"
                icon_name="Toolbar_Add"
                :disabled="isEditMode"
                :onClickCB="addNote"
            ></SVGIcon>
            <SVGIcon
                class="top-toolbar-icon"
                icon_name="Toolbar_Export"
                :disabled="isEditMode || !isBoardDirty"
                :onClickCB="saveNotes"
            ></SVGIcon>
            <Search class="search-bar" :disabled="isEditMode"></Search>
        </div>
    </div>
</template>

<script>
    import SVGIcon from "@/components/SVGIcon";
    import Search from "@/components/Search";
    import {mapGetters} from "vuex";

    export default {
        name: "TopToolbar",
        components: {Search, SVGIcon},
        computed: {
            ...mapGetters(["searchText", "isBoardDirty", "isEditMode"])
        },
        methods: {
            saveNotes() {
                this.$emit("saveClicked");
            },
            addNote() {
                this.$emit("addNoteClicked");
            }
        }
    };
</script>

<style scoped lang="scss">
    #appName {
        background-color: #014272;
        color: #ffffff;
        text-overflow: ellipsis;
        font-family: MetricWeb-Semibold, Calibri, sans-serif;
        font-weight: 700;
        float: left;
        padding: 14px 15px;
        font-size: 20px;
    }
    .title {
        border-radius: 0;
        margin-bottom: 0;
        background-color: #0079ef;
        line-height: 20px;
        height: 50px;
    }
    .top-toolbar-icon {
        padding: 7px 12px;
    }
    .toolbar-container {
        display: flex;
        background-color: white;
        padding: 2px;
        &.disabled-toolbar {
            background-color: rgb(235, 235, 228);
        }
    }
    .search-bar {
        margin-left: auto;
    }
</style>
