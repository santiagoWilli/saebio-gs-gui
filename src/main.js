import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faCloudDownloadAlt)

createApp(App)
    .use(router)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app');
