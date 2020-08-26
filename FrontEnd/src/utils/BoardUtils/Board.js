import {v4 as uniqueId} from "uuid";
import DataService from "@/services/DataService";
import StorageService from "@/services/StorageService";
import Note from "@/utils/BoardUtils/Note";
let mockService = process.env.NODE_ENV !== "production";
let storage = new DataService();
if (mockService) {
    storage = StorageService;
}

class Board {
    constructor() {}
    async setBoard() {
        const data = await storage.getDataFromStorage();
        this.notes = data.notes;
        this.categories = data.categories;
    }
    getNotes() {
        return this.notes;
    }
    addNote(note) {
        let id;
        if (!note) {
            id = uniqueId();
        }
        this.notes.push(note || new Note(id));
    }
    getIndexById(id) {
        return this.notes.findIndex(note => note.id === id);
    }
    removeNoteById(id) {
        const index = this.getIndexById(id);
        this.notes.splice(index, 1);
    }
    getBoardCopy() {
        return {
            notes: [...this.notes],
            categories: [...this.categories]
        };
    }
    save() {
        storage.saveToStorage(this.notes, this.categories).catch(() => {
            console.log("SAVE ISSUE");
        });
    }
}
export default Board;
