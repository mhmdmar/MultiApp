<template>
    <div>
        <div class="title">
            <span id="appName">Notebook</span>
        </div>
        <Toolbar
            class="bg-white"
            :leftIcons="[
                {name: 'Add', callback: addNote, disabled: isEditMode},
                {
                    name: 'Export',
                    callback: saveNotes,
                    disabled: isEditMode || !isBoardDirty
                },
                {
                    name: 'Refresh',
                    callback: resetNotes,
                    disabled: isEditMode || !isBoardDirty
                }
            ]"
            :rightIcons="[
                {
                    type: 'search',
                    disabled: isEditMode
                }
            ]"
        ></Toolbar>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import Toolbar from "@/components/Toolbar";

    export default {
        name: "TopToolbar",
        props: {
            isBoardDirty: {
                type: Boolean,
                default: false
            }
        },
        components: {Toolbar},
        computed: {
            ...mapGetters(["searchText", "isEditMode"])
        },
        methods: {
            saveNotes() {
                this.$emit("saveClicked");
            },
            resetNotes() {
                this.$emit("resetNotesClicked");
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
