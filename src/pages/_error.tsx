import Head from 'next/head';
import React from 'react';

import { withTranslation } from '../i18n';
import { NextPage } from 'next';

interface IError {
    t(key: string, opts?: any): string;
}

const Error: NextPage<IError & any> = ({ t }) => {
    return (
        <div>
            <Head>
                <title>{t('title')}</title>
            </Head>
            {t('err')}
        </div>
    );
};

Error.getInitialProps = async () => ({
    namespacesRequired: ['common', 'error'],
});

export default withTranslation('error')(Error as any);
