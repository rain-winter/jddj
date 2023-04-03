import { createApp } from 'vue'
import './style.css'
import 'normalize.css'
import './style/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
