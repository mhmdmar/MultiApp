import Vue from "vue";
import Vuex from "vuex";
import boardModule from "@/store/modules/board";
import createLogger from "vuex/dist/logger";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";
let logger;

if (debug) {
    logger = createLogger();
}
export default new Vuex.Store({
    modules: {boardModule},
    plugins: debug ? [logger] : [],
    strict: debug
});
