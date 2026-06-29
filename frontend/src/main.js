import { createApp } from 'vue'
import { createPinia } from 'pinia'
import TodoApp from './components/TodoApp.vue'
import './style.css'

const app = createApp(TodoApp)
app.use(createPinia())
app.mount('#app')