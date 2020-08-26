import {readFileSync, writeFileSync, existsSync} from "fs";
import logger from "../logger";

class Storage {
    dataFilePath: string;
    constructor(dataFilePath: string) {
        this.dataFilePath = dataFilePath;
    }
    readDataFile(): string {
        let data = `{"notes": []}`;
        try {
            if (existsSync(this.dataFilePath)) {
                data = readFileSync(this.dataFilePath, "utf8");
            }
        } catch (err) {
            logger.error("Data file doesn't exist");
            writeFileSync(this.dataFilePath, data);
        }
        console.log(data);
        return data;
    }
    getDataFromStorage(): any {
        let data;
        try {
            data = JSON.parse(this.readDataFile());
        } catch (err) {
            console.log("Corrupted JSON file in ", this.dataFilePath);
        }
        if (!data) {
            data = this.reset();
        }
        return data;
    }
    getDefaultCategories() {
        return [{name: "General"}];
    }
    reset(): any {
        return {
            notes: [],
            currentID: 0,
            chosenNoteINDEX: undefined,
            categories: this.getDefaultCategories()
        };
    }
    getStoredBoard(): any {
        return this.getDataFromStorage();
    }
    saveToStorage(data): void {
        writeFileSync(this.dataFilePath, JSON.stringify(data));
    }
}

const jsonPath = "C:\\Projects\\NoteBookVue\\BackEnd\\Data\\boardData.json";
export default new Storage(jsonPath);
