import Vant from 'vant';

import 'vant/lib/index.css';
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
app.use(Vant);
app.mount('#root');
