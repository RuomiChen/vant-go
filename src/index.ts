import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { createPinia } from 'pinia';
import Vant from 'vant';
import 'vant/lib/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import router from './router';

const app = createApp(App);

const pinia = createPinia();

app
.use(Vant)
.use(router)
.use(pinia)
.component('QuillEditor', QuillEditor)

app.mount('#root');
