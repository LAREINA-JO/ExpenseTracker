// import the original type declarations
import 'i18next';
import enUS from '../I18n/enUS';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof enUS;
  }
}
