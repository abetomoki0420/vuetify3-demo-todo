/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(vuetify).mount("#app");
