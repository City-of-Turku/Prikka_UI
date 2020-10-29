/**
 * i18n Provider
 * Provide available tranlations and namespaces to pages and components
 */
import NextI18Next from 'next-i18next';

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'fi',
    otherLanguages: ['en', 'sv'],
});

export default NextI18NextInstance;

/* Optionally, export class methods as named exports */
export const {
    i18n,
    appWithTranslation,
    withTranslation,
} = NextI18NextInstance;
