/**
 * Saavutettavuusseloste
 */

// --- IMPORTS ---
import React from 'react';
import { withTranslation } from '../i18n';
import Layout from '../components/Layout';
import {
    Typography,
    Paper,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: '1.5rem',
            borderRadius: '8px',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

// --- COMPONENT ---
const AccessibilityDescription: NextPage<any> = ({ t }) => {
    const classes = useStyles();

    const Intro = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('intro.title')}
                </Typography>
                <Typography variant="body1">{t('intro.p1')}</Typography>
            </>
        );
    };

    const Rights = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('rights.title')}
                </Typography>
            </>
        );
    };

    return (
        <div>
            <Head>
                <title>Facts about the service</title>
            </Head>
            <Layout>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h3" gutterBottom>
                        {t('title')}
                    </Typography>
                    <Intro />
                    <Rights />
                </Paper>
            </Layout>
        </div>
    );
};

//Populate page data
AccessibilityDescription.getInitialProps = async (ctx: NextPageContext) => ({
    namespacesRequired: ['common', 'accessibilityDescription'],
});

export default withTranslation('accessibilityDescription')(AccessibilityDescription as any);
