<template>
    <div
        tabindex="0"
        v-keyboardShortcut="{
            shortcutsArray: getKeyboardShortcuts(),
            stopPropagation: true
        }"
    >
        <TopToolbar
            @saveClicked="saveBoard"
            @addNoteClicked="addNote"
            @resetNotesClicked="resetNotes"
            :isBoardDirty="isBoardDirty"
        ></TopToolbar>
        <div>
            <Note
                v-for="note in notes"
                :key="note.id"
                :note="note"
                @deleteNote="deleteNote"
            ></Note>
        </div>
    </div>
</template>

<script>
    import TopToolbar from "@/components/Board/TopToolbar";
    import Note from "@/components/Board/Note";
    import {mapGetters} from "vuex";
    import keyboardShortcut from "@/directives/keyboardShortcut";
    import keyboardKeys from "@/utils/keyboardKeys.json";

    import {v4 as uniqueId} from "uuid";
    import StorageService from "@/services/StorageService";

    let storage = StorageService;

    export default {
        name: "NoteBook",
        components: {Note, TopToolbar},
        directives: {
            keyboardShortcut
        },
        data() {
            return {
                notes: [],
                unchangedNotes: ""
            };
        },
        computed: {
            ...mapGetters(["searchText"]),
            isBoardDirty() {
                return JSON.stringify(this.notes) !== this.unchangedNotes;
            }
        },
        async mounted() {
            await this.setBoard();
        },
        methods: {
            async setBoard() {
                const data = await storage.getDataFromStorage();
                this.unchangedNotes = JSON.stringify(data.notes);
                this.notes = data.notes;
            },
            resetNotes() {
                this.notes = JSON.parse(this.unchangedNotes);
            },
            getNotes() {
                return this.notes;
            },
            addNote(note) {
                if (!note) {
                    note = this.createNewNote();
                }
                this.notes.push(note);
            },
            createNewNote() {
                return {
                    id: uniqueId(),
                    text: "",
                    timestamp: new Date()
                };
            },
            getIndexById(id) {
                return this.notes.findIndex(note => note.id === id);
            },
            removeNoteById(id) {
                const index = this.getIndexById(id);
                this.removeNoteByIndex(index);
            },
            removeNoteByIndex(index) {
                this.notes.splice(index, 1);
            },
            getBoardCopy() {
                return {
                    notes: [...this.notes]
                };
            },
            updateTimeStamp() {
                let unchangedNotes = JSON.parse(this.unchangedNotes);
                const notesLen = unchangedNotes?.length || 0;
                for (let i = 0, len = this.notes.length; i < len && i < notesLen; i++) {
                    let curNote = this.notes[i];
                    let curUnchangedNote = unchangedNotes[i];
                    if (
                        curNote.id === curUnchangedNote.id &&
                        curNote.text !== curUnchangedNote.text
                    ) {
                        curNote.timestamp = new Date();
                    }
                }
            },
            saveBoard() {
                this.updateTimeStamp();
                storage
                    .saveToStorage(this.notes)
                    .then(() => {
                        this.unchangedNotes = JSON.stringify(this.notes);
                    })
                    .catch(() => {
                        console.error("SAVE ISSUE");
                    });
            },
            deleteNote(noteId) {
                this.removeNoteById(noteId);
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

<style scoped lang="scss"></style>
