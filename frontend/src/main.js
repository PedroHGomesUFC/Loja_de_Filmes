import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

const pinia = createPinia();

const app = createApp(App);

 app.use(pinia);
// Configuração do axios com vue-axios
app.use(VueAxios, axios);

// Configuração do router (se estiver usando Vue Router)
app.use(router);

// Montagem do aplicativo Vue
app.mount('#app');
