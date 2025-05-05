import i18next from 'i18next';
import enUSResource from './enUS';
import zhCNResource from './zhCN';

i18next.init({
  lng: 'en-US',
  debug: true,
  resources: {
    'en-US': {
      ...enUSResource,
    },
    'zh-CN': {
      ...zhCNResource,
    },
  },
  fallbackLng: 'en-US',
});

export default i18next;
