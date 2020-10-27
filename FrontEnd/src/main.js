import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";
import routes from "@/routes";

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
Vue.config.productionTip = false;
Vue.use(VueRouter);
new Vue({
    store,
    render: h => h(App),
    router
}).$mount("#app");
