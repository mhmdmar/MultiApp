import Vue from "vue";
import Vuex from "vuex";
import boardModule from "@/store/modules/board";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";
let logger;

if (debug) {
    logger = createLogger({
        filter(mutation) {
            return (
                mutation.type !== "updateHint" && mutation.type !== "restoreGlobalHint"
            );
        }
    });
}
export default new Vuex.Store({
    modules: {boardModule},
    plugins: debug ? [logger] : [],
    strict: debug
});
