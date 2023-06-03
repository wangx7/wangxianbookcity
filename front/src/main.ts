import './assets/styles/main.css'
import './assets/styles/styles.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import directive from '@/directive'
import globcpt from '@/components/globcpt'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(directive)
app.use(globcpt)

app.mount('#app')
