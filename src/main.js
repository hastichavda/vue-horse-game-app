import { createApp } from 'vue'
import store from './stores'
import App from './App.vue'
import router from './router'
import './styles/main.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')

