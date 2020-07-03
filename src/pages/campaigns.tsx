/**
 * Campaign page
 * Header with static text, below a list with all campaigns
 */

// --- IMPORTS ---
import React from 'react';
import {i18n, withTranslation} from '../i18n';
import {Button, Card, createStyles, Grid, makeStyles, Paper, TextField, Theme, Typography} from '@material-ui/core';
import Layout from '../components/Layout';
import Head from 'next/head';
import {apis} from "../services/apis";
import {NextPage} from "next";
import {Campaigns} from "../types";
import Router from "next/router";

// --- STYLES ---
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
interface ICampaignPage {
    t(key: string, opts?: any): string;
    campaigns: Campaigns;
}

const CampaignPage: NextPage<ICampaignPage & any> = ({ t, campaigns }) => {

    const classes = useStyles();

    const handleAddMemory = (categoryId): void => {
        Router.push('/add_memory/?categoryId='+categoryId);
    };

    const showI18nHeader = (campaign) => {
        if (i18n.language=='fi')
            return ( <Typography variant="h4">{campaign.titleFI}</Typography>);
        if (i18n.language=='sv')
            return ( <Typography variant="h4">{campaign.titleSV}</Typography>);
        if (i18n.language=='en')
            return ( <Typography variant="h4">{campaign.titleEN}</Typography>);
    };

    const showI18nText = (campaign) => {
        if (i18n.language=='fi')
            return (
                <TextField
                    variant="outlined"
                    multiline
                    fullWidth={true}
                    rows={10}
                    value={campaign.descriptionFI}
                    disabled={true}
                ></TextField>
            );
        if (i18n.language=='sv')
            return (
                <TextField
                    variant="outlined"
                    multiline
                    fullWidth={true}
                    rows={10}
                    value={campaign.descriptionSV}
                    disabled={true}
                ></TextField>
            );
        if (i18n.language=='en')
            return (
                <TextField
                    variant="outlined"
                    multiline
                    fullWidth={true}
                    rows={10}
                    value={campaign.descriptionEN}
                    disabled={true}
                ></TextField>
            );
    };

    const displayCampaigns = () => {
        let component;

        if (campaigns === null || campaigns.count === 0) {
            component = (
                <Grid item xs={4}>
                    <Card style={{ minWidth: '200px' }}>
                        <>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                component="p"
                            >
                                {t('emptyCampaignList')}
                            </Typography>
                        </>
                    </Card>
                </Grid>
            );
        } else {
            component = campaigns.rows.map((campaign, index) => {
                let tmpCategoryId = campaign.categoryId;
                return (
                    <Grid key={index} item xs={12}>
                        <Paper elevation={3} className={classes.paper}>
                            {showI18nHeader(campaign)}
                            <div style={{ height: '5vh' }} />
                            {showI18nText(campaign)}
                            <div style={{ height: '5vh' }} />
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddMemory(tmpCategoryId)}
                                >
                                    {t('buttonAddMemory')}
                                </Button>
                            </div>
                        </Paper>
                        <div style={{ height: '5vh' }} />
                    </Grid>
                );
            });
        }
        return component;
    };

    return (
        <div id="settings-page">
            <div>
                <Head>
                    <title>Campaigns</title>
                </Head>

                <Layout>
                    <Typography variant="h3">{t('title')}</Typography>
                    <div style={{ height: '5vh' }} />
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="body1" gutterBottom>
                            {t('description')}
                        </Typography>
                    </Paper>

                    <div style={{ height: '5vh' }} />

                    {displayCampaigns()}

                </Layout>
            </div>
        </div>
    );
};

// --- POPULATE PAGE ---
CampaignPage.getInitialProps = async (ctx: any ) => {
    let campaigns: Campaigns = null;
    await apis.campaigns
        .getAllCampaigns()
        .then((res) => {
            campaigns = res.data;
        })
        .catch((err) => console.error('Error fetching campaigns'));
    return {
        namespacesRequired: ['common', 'campaigns'],
        campaigns: campaigns,
    };
};

export default withTranslation('campaigns')(CampaignPage as any);
