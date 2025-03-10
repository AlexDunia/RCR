// This file handles module imports for GitHub Pages
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '../src/App.vue';
import router from '../src/router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app'); 