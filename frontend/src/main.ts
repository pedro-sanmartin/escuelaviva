import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import "./style.css";

const app = createApp(App);
registerPlugins(app);
app.use(pinia);
app.use(router);
app.mount("#app");
