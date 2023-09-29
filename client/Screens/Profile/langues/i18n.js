import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import EN from './english.json';
// import AR from './arabic.json'
import FR from './french.json';


i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng:  "FR",
  fallbackLng: 'FR',
    resources: {
      FR: FR,
      EN: EN,
      // AR: AR,
    },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;