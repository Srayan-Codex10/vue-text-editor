// import './assets/main.css'

import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";

// Components
import App from "./App.vue";

const vuetify = createVuetify();

console.log(import.meta.env);
createApp(App).use(vuetify).mount("#app");
