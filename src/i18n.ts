import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // 加载翻译文件的后端
    .use(Backend)
    // 检测用户语言
    .use(LanguageDetector)
    // 将i18n实例传递给react-i18next
    .use(initReactI18next)
    // 初始化i18next
    .init({
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',

        interpolation: {
            escapeValue: false, // 不需要对React应用进行转义
        },

        // 语言资源路径
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },

        // 默认命名空间
        defaultNS: 'common',
        ns: ['common'],

        // 检测语言选项
        detection: {
            order: ['path', 'cookie', 'localStorage', 'navigator'],
            lookupFromPathIndex: 0,
            caches: ['cookie', 'localStorage'],
        },

        // 路径格式
        // 例如：/en/admin, /zh/admin
        react: {
            useSuspense: false,
        },
    });

export { i18n };