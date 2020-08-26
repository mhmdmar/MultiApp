const boardModule = {
    state: {
        searchText: "",
        isEditMode: false,
        isBoardDirty: false,
        board: {}
    },
    mutations: {
        updateSearchText(state, searchText) {
            state.searchText = searchText;
        },
        updateIsBoardDirty(state, isDirty) {
            state.isBoardDirty = isDirty;
        },
        updateIsEditMode(state, isEditMode) {
            state.isEditMode = isEditMode;
        },
        updateBoard(state, data) {
            state.board = data;
        }
    },
    actions: {},
    getters: {
        searchText(state) {
            return state.searchText;
        },
        isBoardDirty(state) {
            return state.isBoardDirty;
        },
        isEditMode(state) {
            return state.isEditMode;
        },
        board(state) {
            return state.board;
        }
    }
};
export default boardModule;
