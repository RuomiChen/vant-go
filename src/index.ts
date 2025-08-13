import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Vant from 'vant';
import 'vant/lib/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import router from './router';
const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app
.use(Vant)
.use(router)
.use(pinia);


app.mount('#root');
