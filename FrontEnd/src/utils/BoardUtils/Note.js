class Note {
    constructor(id, category = "General") {
        this.id = id;
        this.text = "";
        this.timestamp = Date.now();
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.category = category;
    }
}
export default Note;
