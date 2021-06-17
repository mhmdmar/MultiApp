import axios from "axios";

const apiUrlPrefix = "http://localhost:3000/api/";

class DataService {
    constructor() {}
    async getDataFromStorage() {
        let {data} = await axios.get(this.concatCommandWithPrefix("getBoard"));
        if (data === "") {
            data = {
                notes: []
            };
        }
        return data;
    }
    async saveToStorage(notes) {
        await axios.post(this.concatCommandWithPrefix("saveBoard"), notes);
    }
    concatCommandWithPrefix(command) {
        return apiUrlPrefix + command;
    }
}

export default DataService;
