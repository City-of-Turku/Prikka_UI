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
const About: NextPage<any> = ({ t }) => {
    const classes = useStyles();

    const Intro = () => {
        return (
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    {t('intro.title')}
                </Typography>
                <Typography variant="body1">{t('intro.p1')}</Typography>
                <br />
                <Typography variant="body1">{t('intro.p2')}</Typography>
                <br />
                <Typography variant="body1">{t('intro.p3')}</Typography>
            </Paper>
        );
    };

    const HowItWorks = () => {
        return (
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    {t('how.title')}
                </Typography>
                <ul>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('how.p1')}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('how.p2')}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('how.p3')}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('how.p4')}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('how.p5')}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('how.p6')}
                        </Typography>
                    </li>
                </ul>
                <Notice/>
            </Paper>
        );
    };

    const WhatKindOfMemory = () => {
        return (
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    {t('what.title')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('what.p1')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('what.p2')}
                </Typography>
            </Paper>
        );
    };

    const Notice = () => {
        return (
            <>
                <Typography variant="body1" gutterBottom>
                    {t('notice.title')}
                </Typography>
                <ul>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('notice.p1')}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('notice.p2')}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('notice.p3')}
                        </Typography>
                    </li>
                </ul>
            </>
        );
    };

    const GoodOpportunity = () => {
        return (
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    {t('opportunity.title')}
                </Typography>
                <ul>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('opportunity.p1')}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('opportunity.p2')}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {t('opportunity.p3')}
                        </Typography>
                    </li>
                </ul>
            </Paper>
        );
    };

    const WhoAreWe = () => {
        return (
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    {t('who.title')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <a href="https://www.turku.fi/museo" target={"_blank"}>{t('who.p1')}</a>
                    {t('who.p2')}
                </Typography>
            </Paper>
        );
    };

    const Rights = () => {
        return (
            <Paper elevation={3} className={classes.paper}>
                {/* Rights to content */}
                <Typography variant="h5" gutterBottom>
                    {t('rights.title')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('rights.p1')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('rights.p2')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <a href="https://creativecommons.org/licenses/by/4.0/deed.fi" target={"_blank"}>{t('rights.p3')}</a>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('rights.p4')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('rights.p5')}
                </Typography>
            </Paper>
        );
    };

    return (
        <div>
            <Head>
                <title>About</title>
            </Head>
            <Layout>
                {/* Title */}
                <Typography variant="h4" gutterBottom>
                    {t('title')}
                </Typography>
                <Intro />
                <div style={{ height: '5vh' }} />
                <HowItWorks />
                <div style={{ height: '5vh' }} />
                <WhatKindOfMemory />
                <div style={{ height: '5vh' }} />
                <GoodOpportunity />
                <div style={{ height: '5vh' }} />
                <WhoAreWe />
                <div style={{ height: '5vh' }} />
                <Rights />
            </Layout>
        </div>
    );
};

//Populate page data
About.getInitialProps = async (ctx: NextPageContext) => ({
    namespacesRequired: ['common', 'about'],
});

export default withTranslation('about')(About as any);
