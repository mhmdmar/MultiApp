import Category from "@/utils/BoardUtils/Category";
const StorageService = {
    async getDataFromStorage() {
        if (localStorage.Board) {
            try {
                this.storedBoard = JSON.parse(localStorage.Board);
                this.checkData();
            } catch (e) {
                console.error(e);
                this.storedBoard = this.reset();
            }
        } else {
            this.storedBoard = this.reset();
        }
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.storedBoard);
            }, 0);
        });
    },
    checkData() {
        if (!this.storedBoard.categories || this.storedBoard.categories.length === 0) {
            this.storedBoard.categories = this.getDefaultCategories();
        }
        if (!this.storedBoard.notes) {
            this.storedBoard.notes = [];
        }
    },
    getDefaultCategories() {
        return [new Category("General", true)];
    },
    reset() {
        return {
            notes: [],
            currentID: 0,
            chosenNoteINDEX: undefined,
            categories: this.getDefaultCategories()
        };
    },
    async saveToStorage(notes, id, categories) {
        this.storedBoard.notes = notes;
        this.storedBoard.currentID = id;
        this.storedBoard.categories = categories;
        localStorage.Board = JSON.stringify(this.storedBoard);
    }
};

export default StorageService;
