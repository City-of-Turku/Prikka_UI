/**
 * Page about us
 * Displays some informations about the website and the museum
 *
 * Contain an accordion item and logic
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
const ServiceInfo: NextPage<any> = ({ t }) => {
    const classes = useStyles();

    // Test
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
                <Typography variant="body1" gutterBottom>
                    {t('rights.p1')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <a href={t('rights.p2link')} target={"_blank"}>{t('rights.p2')}</a>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('rights.p3')}
                </Typography>
            </>
        );
    };

    const WhatKindOfMemory = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('whatKindOfMemory.title')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('whatKindOfMemory.p1')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('whatKindOfMemory.p2')}
                </Typography>
            </>
        );
    };

    const PageAuthors = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('pageAuthors.title')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('pageAuthors.p1')}
                </Typography>
            </>
        );
    };

    const PersonRegister = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('personRegister.title')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('personRegister.p1')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <a href={t('personRegister.p2link')} target={"_blank"}>{t('personRegister.p2')}</a>
                </Typography>
            </>
        );
    };

    const Feedback = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('feedback.title')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('feedback.p1')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('feedback.link')}
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
                    <Typography variant="h4" gutterBottom>
                        {t('title')}
                    </Typography>
                    <Intro />
                    <div style={{ height: '4vh' }} />
                    <Rights />
                    <div style={{ height: '4vh' }} />
                    <WhatKindOfMemory />
                    <div style={{ height: '4vh' }} />
                    <PageAuthors />
                    <div style={{ height: '4vh' }} />
                    <PersonRegister />
                    <div style={{ height: '4vh' }} />
                    <Feedback />
                </Paper>
            </Layout>
        </div>
    );
};

//Populate page data
ServiceInfo.getInitialProps = async (ctx: NextPageContext) => ({
    namespacesRequired: ['common', 'serviceInfo'],
});

export default withTranslation('serviceInfo')(ServiceInfo as any);

