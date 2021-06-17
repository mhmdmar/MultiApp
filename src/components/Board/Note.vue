<template>
    <div
        class="note-container"
        v-show="visible"
        :class="{'edit-mode': editMode}"
        v-keyboardShortcut="{
            shortcutsArray: getKeyboardShortcuts()
        }"
    >
        <div class="top-toolbar">
            <div class="top-note-toolbar-buttons" v-if="!editMode">
                <div class="left-toolbar-icon">
                    <SvgIcon icon="Edit" @click="editNote"></SvgIcon>
                    <SvgIcon
                        icon="Refresh"
                        :disabled="resetNoteDisabled"
                        @click="resetNote"
                    >
                    </SvgIcon>
                </div>
                <div class="flex-right-side">
                    <SvgIcon icon="Delete" @click="deleteNoteClicked"></SvgIcon>
                </div>
            </div>
            <div v-else>
                <SvgIcon icon="ArrowLeft" @click="finishEditNote"></SvgIcon>
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
                <SvgIcon
                    class="error-icon"
                    icon="DialogError"
                    @click="cancelDelete"
                ></SvgIcon>
                <SvgIcon
                    class="success-icon"
                    icon="Confirm"
                    @click="confirmDelete"
                ></SvgIcon>
            </div>
        </div>
    </div>
</template>

<script>
    import SvgIcon from "@/components/Shared/SvgIcon";
    import {mapGetters, mapMutations} from "vuex";
    import keyboardShortcut from "@/directives/keyboardShortcut";
    import keyboardKeys from "@/utils/keyboardKeys.json";
    export default {
        name: "Note",
        props: ["note"],
        directives: {
            keyboardShortcut
        },
        components: {SvgIcon},
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
            ...mapGetters(["searchText", "isEditMode"]),
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
            defaultText() {
                this.timestamp = Date.now();
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
                this.timestamp = this.note.timestamp;
            },
            deleteNoteClicked() {
                this.deletePrompt = !this.deletePrompt;
            },
            cancelDelete() {
                this.deletePrompt = false;
            },
            confirmDelete() {
                this.$emit("deleteNote", this.note.id);
            },
            getKeyboardShortcuts() {
                return [
                    {
                        key: keyboardKeys.delete,
                        modifiers: keyboardKeys.ctrlKey,
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            this.deleteNoteClicked();
                        }
                    },
                    {
                        key: keyboardKeys.r,
                        modifiers: keyboardKeys.ctrlKey,
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            this.resetNote();
                        }
                    },
                    {
                        key: keyboardKeys.e,
                        modifiers: keyboardKeys.ctrlKey,
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            this.editMode ? this.finishEditNote() : this.editNote();
                        }
                    },
                    {
                        key: keyboardKeys.y,
                        modifiers: keyboardKeys.ctrlKey,
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            this.deletePrompt && this.confirmDelete();
                        }
                    }
                ];
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

    .top-note-toolbar-buttons {
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
    .error-icon {
        margin: 0 10px;
    }
    .left-toolbar-icon {
        display: flex;
        flex-grow: 0.1;
        justify-content: space-between;
    }
    .top-toolbar {
        padding: 2px 8px;
    }
</style>
