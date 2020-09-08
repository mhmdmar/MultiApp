<template>
    <div
        tabindex="0"
        v-keyboardShortcut="{
            shortcutsArray: getKeyboardShortcuts(),
            stopPropagation: true
        }"
    >
        <TopToolbar @saveClicked="saveBoard" @addNoteClicked="addNote"></TopToolbar>
        <div>
            <Note
                v-for="note in notes"
                :key="note.id"
                :note="note"
                @text-change="setIsDirty"
                @delete-note="deleteNote"
            ></Note>
        </div>
    </div>
</template>

<script>
    import TopToolbar from "@/components/TopToolbar";
    import Note from "@/components/Note";
    import StorageBoard from "@/utils/BoardUtils/Board";
    const storageBoard = new StorageBoard();
    import {mapGetters} from "vuex";
    import keyboardShortcut from "@/directives/keyboardShortcut";
    import keyboardKeys from "@/utils/keyboardKeys.json";
    export default {
        name: "Board",
        components: {Note, TopToolbar},
        directives: {
            keyboardShortcut
        },
        data() {
            return {
                notes: [],
                unchangedNotes: [],
                isDirty: false
            };
        },
        computed: {
            ...mapGetters(["searchText"])
        },
        async mounted() {
            await storageBoard.setBoard();
            this.notes = storageBoard.notes;
            this.unchangedNotes = JSON.stringify(this.notes);
        },
        methods: {
            saveBoard() {
                storageBoard.save();
                this.setIsDirty(false);
            },
            setIsDirty(isDirty = true) {
                this.$store.commit("updateIsBoardDirty", isDirty);
            },
            addNote() {
                storageBoard.addNote();
                this.setIsDirty();
            },
            deleteNote(noteId) {
                storageBoard.removeNoteById(noteId);
                this.setIsDirty();
            },
            getKeyboardShortcuts() {
                return [
                    {
                        key: keyboardKeys.s,
                        modifiers: keyboardKeys.ctrlKey,
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            this.saveBoard();
                        }
                    },
                    {
                        key: keyboardKeys.add,
                        modifiers: keyboardKeys.ctrlKey,
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            this.addNote();
                        }
                    },
                    {
                        key: keyboardKeys.f,
                        modifiers: keyboardKeys.ctrlKey,
                        preventDefault: true,
                        stopPropagation: false,
                        callback: () => {
                            // TODO find a prettier solution to focus the search input element
                            document.querySelector("input[type=search]")?.focus();
                        }
                    }
                ];
            }
        }
    };
</script>

<style scoped>
    div[tabindex="0"]:focus {
        outline: none;
    }
</style>
