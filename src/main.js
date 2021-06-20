import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";
import routes from "@/routes";

/* create firebase.config using the information in firebase */
import firebaseConfig from "../firebase.config";
import firebase from "firebase/app";

firebase.initializeApp(firebaseConfig);

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
