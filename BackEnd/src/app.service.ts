import {Injectable} from "@nestjs/common";
import Storage from "./BoardData/Storage";

@Injectable()
export class AppService {
    getStoredBoard(): any {
        return Storage.getStoredBoard();
    }
    saveBoard(data): void {
        Storage.saveToStorage(data);
    }
}
