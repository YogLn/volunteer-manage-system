import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import { setupStore } from '@/store'
// 对时间的处理
import { registerTime } from '@/utils/format'

const app = createApp(App)
installElementPlus(app)


setupStore()
app.use(store).use(router).use(registerTime).mount('#app')
