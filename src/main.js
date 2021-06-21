import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudDownloadAlt, faCloudUploadAlt, faEdit, faMinusSquare, faFileDownload } from '@fortawesome/free-solid-svg-icons'

library.add(faCloudDownloadAlt, faCloudUploadAlt, faEdit, faMinusSquare, faFileDownload)

createApp(App)
    .use(router)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app');
