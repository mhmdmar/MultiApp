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
        if (!this.storedBoard.notes) {
            this.storedBoard.notes = [];
        }
    },
    reset() {
        return {
            notes: [],
            currentID: 0,
            chosenNoteINDEX: undefined
        };
    },
    async saveToStorage(notes, id) {
        this.storedBoard.notes = notes;
        this.storedBoard.currentID = id;
        localStorage.Board = JSON.stringify(this.storedBoard);
    }
};

export default StorageService;
