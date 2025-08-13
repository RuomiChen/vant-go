import Vant from 'vant';

import 'vant/lib/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(Vant);
app.use(router)
app.mount('#root');
