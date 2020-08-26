<template>
    <div class="note-container" v-show="visible" :class="{'edit-mode': editMode}">
        <div class="top-toolbar">
            <div class="top-toolbar-buttons" v-if="!editMode">
                <SVGIcon icon_name="Edit" :onClickCB="editNote"></SVGIcon>
                <SVGIcon
                    icon_name="Hint"
                    :disabled="resetNoteDisabled"
                    :onClickCB="resetNote"
                ></SVGIcon>
                <div class="flex-right-side">
                    <SVGIcon
                        icon_name="Toolbar_Delete"
                        :onClickCB="deleteNoteClicked"
                    ></SVGIcon>
                    <button class="toolbar-button ellipsis">
                        {{ note.category }}
                    </button>
                </div>
            </div>
            <div v-else>
                <SVGIcon icon_name="Arrow_Left" :onClickCB="finishEditNote"></SVGIcon>
            </div>
        </div>
        <label class="text-label">
            <textarea
                class="note-text-area"
                cols="40"
                v-model="note.text"
                rows="8"
            ></textarea>
        </label>
        <p class="date-text">{{ lastModified }}</p>
        <div class="confirm-delete" :class="[deletePrompt ? 'visible' : 'hidden']">
            <i class="confirm-delete-message">Confirm Delete</i>
            <div class="confirm-delete-buttons">
                <SVGIcon
                    class="error-icon"
                    icon_name="Error"
                    :onClickCB="cancelDelete"
                ></SVGIcon>
                <SVGIcon
                    class="success-icon"
                    icon_name="Confirm"
                    :onClickCB="confirmDelete"
                ></SVGIcon>
            </div>
        </div>
    </div>
</template>

<script>
    import SVGIcon from "@/components/SVGIcon";
    import {mapGetters, mapMutations} from "vuex";
    export default {
        name: "Note",
        props: ["note"],
        components: {SVGIcon},
        data() {
            return {
                visible: true,
                editMode: false,
                deletePrompt: false,
                timestamp: this.note.timestamp,
                defaultText: this.note.text
            };
        },
        computed: {
            ...mapGetters(["searchText", "isBoardDirty", "isEditMode"]),
            lastModified() {
                const timestampToDate = this.timeStampToDate();
                return timestampToDate.time + "-" + timestampToDate.date;
            },
            resetNoteDisabled() {
                return this.note.text === this.defaultText;
            }
        },
        watch: {
            searchText() {
                this.visible = this.note.text.includes(this.searchText);
            },
            isBoardDirty(isDirty) {
                if (isDirty === false) {
                    this.defaultText = this.note.text;
                    this.note.timestamp = this.timestamp;
                }
            },
            "note.text"() {
                this.timestamp = Date.now();
                this.$emit("text-change");
            }
        },
        methods: {
            ...mapMutations(["updateIsEditMode"]),
            timeStampToDate() {
                const stampToDate = new Date(this.note.timestamp);
                // Time without the seconds
                const time = stampToDate.toLocaleTimeString(navigator.language, {
                    hour: "2-digit",
                    minute: "2-digit"
                });
                const date = stampToDate.toLocaleDateString();
                return {time, date};
            },
            editNote() {
                this.updateIsEditMode(true);
                this.editMode = true;
            },
            finishEditNote() {
                this.updateIsEditMode(false);
                this.editMode = false;
            },
            resetNote() {
                this.note.text = this.defaultText;
                this.note.timestamp = this.timestamp;
            },
            deleteNoteClicked() {
                this.deletePrompt = !this.deletePrompt;
            },
            cancelDelete() {
                this.deletePrompt = false;
            },
            confirmDelete() {
                this.$emit("delete-note", this.note.id);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .note-container {
        padding: 5px;
        display: inline-flex;
        overflow: hidden;
        flex-direction: column;
        width: 250px;
        background-color: #ffffff;
        margin-left: 8px;
        margin-right: 8px;
        box-sizing: border-box;
        box-shadow: 2px 2px rgba(0, 0, 0, 0.15);
        margin-top: 16px;
        min-width: 250px;
    }

    .top-toolbar-buttons {
        display: flex;
        margin-bottom: 5px;
    }
    .flex-right-side {
        display: flex;
        margin-left: auto;
        overflow: hidden;
    }
    .confirm-delete {
        display: flex;
        .confirm-delete-message {
            color: red;
        }
        .confirm-delete-buttons {
            display: inline-flex;
            margin-left: auto;
        }
    }

    .text-label,
    .note-text-area {
        width: 100%;
        height: 100%;
    }
    .note-text-area {
        resize: none;
        padding: 7px 0;
        line-height: 16px;
        font-size: 16px;
        color: #000;
        background-color: transparent;
        border-radius: 0;
        border: 1px solid rgba(101, 102, 104, 0.64);
        box-shadow: none;
        box-sizing: border-box;
        &:focus {
            cursor: text;
            border: 1px solid #999999;
        }
        &:hover {
            box-shadow: 5px 5px rgba(0, 0, 0, 0.05);
        }
    }

    .toolbar-icon {
        margin-right: 10px;
        margin-left: 10px;
    }
    .toolbar-button {
        border: none;
        background: white;
        min-width: 20px;
        max-width: 150px;
        font-size: 14px;
        font-weight: 700;
        outline: none;
        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
        &:disabled {
            background-color: inherit;
        }
    }
    .date-text {
        background-color: #ffffff;
        margin-left: 8px;
        margin-right: 8px;
    }
    .edit-mode {
        position: fixed;
        margin: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
