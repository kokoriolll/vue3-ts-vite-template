import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import { zhCn } from './zh-cn';
import { enUs } from './en-us';

const i18n = createI18n({
  legacy: false,
  locale: 'zhCn',
  messages: {
    zhCn: {
      ...zhCn
    },
    enUs: {
      ...enUs
    }
  }
});

export function setupI18n(app: App<Element>) {
  app.use(i18n);
}
