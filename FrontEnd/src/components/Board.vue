<template>
    <div>
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
    export default {
        name: "Board",
        components: {Note, TopToolbar},
        data() {
            return {
                notes: [],
                isDirty: false
            };
        },
        computed: {
            ...mapGetters(["searchText"])
        },
        async mounted() {
            await storageBoard.setBoard();
            this.notes = storageBoard.notes;
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
            }
        }
    };
</script>

<style scoped></style>
