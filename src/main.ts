import { createApp } from 'vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import { setupI18n } from './language';
import './styles/index.scss';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/theme-chalk/index.css';
import App from './App.vue';

async function bootstrap() {
  const app = createApp(App);

  // 初始化路由
  setupRouter(app);

  // 初始化Store
  setupStore(app);

  // 初始化i18n
  setupI18n(app);

  // 全局引入element-icon组件
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  app.mount('#app');
}

bootstrap();
