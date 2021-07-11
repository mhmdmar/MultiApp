const boardModule = {
    state: {
        searchText: "",
        isEditMode: false,
        board: {}
    },
    mutations: {
        updateSearchText(state, searchText) {
            state.searchText = searchText;
        },
        updateIsEditMode(state, isEditMode) {
            state.isEditMode = isEditMode;
        },
        updateBoard(state, data) {
            state.board = data;
        }
    },
    getters: {
        searchText(state) {
            return state.searchText;
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
