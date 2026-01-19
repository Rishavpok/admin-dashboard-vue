import './assets/main.css'
import Toast from "vue-toastification";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "vue-toastification/dist/index.css";

const app = createApp(App)
app.use(Toast,  { position : "top-right", timeout : 3000 })
app.use(router)

app.mount('#app')
