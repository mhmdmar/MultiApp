import { readFileSync, writeFileSync } from 'fs';

class Storage {
  dataFilePath: string;
  constructor(dataFilePath: string) {
    this.dataFilePath = dataFilePath;
  }

  getDataFromStorage(): any {
    let data;
    try {
      data = JSON.parse(readFileSync(this.dataFilePath, 'utf8'));
    } catch (err) {
      console.log('Corrupted JSON file in ', this.dataFilePath);
    }
    if (!data) {
      data = this.reset();
    }
    return data;
  }
  getDefaultCategories() {
    return [{ name: 'General' }];
  }
  reset(): any {
    return {
      notes: [],
      currentID: 0,
      chosenNoteINDEX: undefined,
      categories: this.getDefaultCategories(),
    };
  }
  getStoredBoard(): any {
    return this.getDataFromStorage();
  }
  saveToStorage(data): void {
    writeFileSync(this.dataFilePath, JSON.stringify(data));
  }
}

const jsonPath = 'C:\\Projects\\NoteBookVue\\BackEnd\\Data\\boardData.json';
export default new Storage(jsonPath);
