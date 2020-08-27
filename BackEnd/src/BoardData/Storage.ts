import {readFileSync, writeFileSync, existsSync, mkdirSync} from "fs";
import * as path from "path";
import logger from "../logger";

class Storage {
    dataFilePath: string;
    constructor(dataFilePath: string) {
        this.dataFilePath = dataFilePath;
    }
    createDirectory(filePath: string): void {
        const dirname = path.dirname(filePath);
        if (!existsSync(dirname)) {
            this.createDirectory(dirname);
            mkdirSync(dirname);
        }
    }
    readDataFile(): string {
        let data = `{"notes": []}`;
        try {
            if (existsSync(this.dataFilePath)) {
                data = readFileSync(this.dataFilePath, "utf8");
            } else {
                logger.error("Data file doesn't exist");
                this.createDirectory(this.dataFilePath);
                writeFileSync(this.dataFilePath, data);
            }
        } catch (err) {
            logger.error(err);
        }
        return data;
    }
    getDataFromStorage(): any {
        let data;
        try {
            data = JSON.parse(this.readDataFile());
        } catch (err) {
            logger.error("Corrupted JSON file in ", this.dataFilePath);
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
