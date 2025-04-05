import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import tooltipDirective from './directives/tooltip'
import permissionDirective from './directives/permission'

const app = createApp(App)
const pinia = createPinia()

// Register global directives
app.directive('tooltip', tooltipDirective)
app.directive('can', permissionDirective)

app.use(pinia)
app.use(router)
app.mount('#app')
