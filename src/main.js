import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'

const app = createApp(App);
app.config.globalProperties.apiDomain = 'http://localhost:4567';
app.use(router);
app.mount('#app');
