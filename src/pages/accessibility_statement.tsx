/**
 * Saavutettavuusseloste
 */

// --- IMPORTS ---
import React from 'react';
import {withTranslation} from '../i18n';
import Layout from '../components/Layout';
import {createStyles, makeStyles, Paper, Theme, Typography,} from '@material-ui/core';
import {NextPage, NextPageContext} from 'next';
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
const AccessibilityStatement: NextPage<any> = ({ t }) => {
    const classes = useStyles();

    const Intro = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('intro.title')}
                </Typography>
                <Typography variant="body1">{t('intro.p1')}</Typography>
                <div style={{ height: '1vh' }} />
                <Typography variant="body1" gutterBottom>
                    {t('intro.p2')}
                    <a href={t('intro.p3link')} target={"_blank"}>{t('intro.p3')}</a>
                </Typography>
            </>
        );
    };

    const Part1 = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('part1.title')}
                </Typography>
                <Typography variant="body1">
                    <a href={t('part1.p1link')} target={"_blank"}>{t('part1.p1link')}</a>
                </Typography>
            </>
        );
    };

    const Part2 = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('part2.title')}
                </Typography>
                <Typography variant="body1">{t('part2.p1')}</Typography>
            </>
        );
    };

    const Part3 = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('part3.title')}
                </Typography>
                <Typography variant="body1">{t('part3.p1')}</Typography>
                <Typography variant="body1">{t('part3.p2')}</Typography>
                <Typography variant="body1" gutterBottom>
                    <a href={t('part3.p3link')} target={"_blank"}>{t('part3.p3')}</a>
                </Typography>
                <Typography variant="body1">{t('part3.p4')}</Typography>
                <Typography variant="body1">{t('part3.p5')}</Typography>
            </>
        );
    };

    const Part4 = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('part4.title')}
                </Typography>
                <Typography variant="body1">{t('part4.p1')}</Typography>
            </>
        );
    };

    const Part5 = () => {
        return (
            <>
                <Typography variant="h5" gutterBottom>
                    {t('part5.title')}
                </Typography>
                <Typography variant="body1">{t('part5.p1')}</Typography>
                <ul>
                    <li><Typography variant="body1">{t('part5.p2')}</Typography></li>
                    <li><Typography variant="body1">{t('part5.p3')}</Typography></li>
                    <li><Typography variant="body1">{t('part5.p4')}</Typography></li>
                </ul>
            </>
        );
    };

    const Footer = () => {
        return (
            <>
                <Typography variant="body1">{t('footerText')}</Typography>
                <Typography variant="body1">{t('footerDate')}</Typography>
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
                    <div style={{ height: '2vh' }} />
                    <Intro />
                    <div style={{ height: '2vh' }} />
                    <Part1 />
                    <div style={{ height: '1vh' }} />
                    <Part2 />
                    <div style={{ height: '2vh' }} />
                    <Part3 />
                    <div style={{ height: '2vh' }} />
                    <Part4 />
                    <div style={{ height: '2vh' }} />
                    <Part5 />
                    <div style={{ height: '2vh' }} />
                    <Footer />
                </Paper>
            </Layout>
        </div>
    );
};

//Populate page data
AccessibilityStatement.getInitialProps = async (ctx: NextPageContext) => ({
    namespacesRequired: ['common', 'accessibilityStatement'],
});

export default withTranslation('accessibilityStatement')(AccessibilityStatement as any);
