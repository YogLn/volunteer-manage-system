import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import { setupStore } from '@/store'
// 对时间的处理
import { registerTime } from '@/utils/format'
// markdown
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import hljs from 'highlight.js';

// import VMdPreview from '@kangc/v-md-editor/lib/preview';
// import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

const app = createApp(App)
installElementPlus(app)

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
// VMdPreview.use(githubTheme, {
//   Hljs: hljs,
// });
setupStore()
app.use(VMdEditor).use(store).use(router).use(registerTime).mount('#app')
