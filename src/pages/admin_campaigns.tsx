/**
 * Admin Campaigns Page
 */

// --- IMPORTS ---
import React, {useEffect, useState} from 'react';
import {withTranslation} from '../i18n';
import {Button, Card, createStyles, Grid, makeStyles, Theme, Typography,} from '@material-ui/core';
import Layout from '../components/Layout';
import {apis} from '../services/apis';
import {useSnackbarContext} from '../contexts/SnackbarContext';
import {Campaigns} from '../types';
import {NextPage} from 'next';
import Head from 'next/head';
import CampaignCard from "../components/CampaignCard";

// --- STYLES ---
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        categoryList: {
            width: '100%',
            maxWidth: 360,
            maxHeight: 300,
            overflow: 'auto',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

// --- COMPONENT ---
interface IAdminCampaign {
    t(key: string, opts?: any): string;
    isLogged: boolean;
    isAdmin: boolean;
}

const AdminCampaign: NextPage<IAdminCampaign & any> = ({
    t,
    isLogged,
    isAdmin,
}) => {

    //Contexts
    const classes = useStyles();
    const snackbarContext = useSnackbarContext();

    //States
    const [campaigns, setCampaigns] = useState<Campaigns | null>(null);
    const [newCampaign, setNewCampaign] = useState<String>(null);

    useEffect(() => {
        if (!isLogged || !isAdmin) {
            window.location.href =
                process.env.BACK_URL! + process.env.LOGIN_URL!;
        } else {
            getAllCampaigns();
        }
    }, []);

    const getAllCampaigns = async () => {
        setNewCampaign(null);
        await apis.campaigns
            .getAllCampaigns()
            .then((res) => {
                let campaigns = res.data;
                setCampaigns(campaigns);
                console.log(campaigns);
                console.log('Campaigns fetched: ', campaigns.length);
            })
            .catch((err) => console.error('Error fetching campaigns', err));
    };

    const handleAddCampaignCard = () => {
        setNewCampaign('Yes');
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
                return (
                    <Grid key={index} item xs={12}>
                        <CampaignCard
                            t={t}
                            campaign={campaign}
                            controls={true}
                            handleRefresch={() => getAllCampaigns()}
                        />
                    </Grid>
                );
            });
        }
        return component;
    };

    return (
        <div>
            {isLogged && isAdmin ? (
                <div>
                    <Head>
                        <title>Admin Campaigns</title>
                    </Head>

                    <Layout>
                        <Typography variant="h3" gutterBottom>
                            {t('adminCampaign.title')}
                        </Typography>

                        <div style={{ height: '10vh' }} />

                        <Grid container spacing={2}>
                            {displayCampaigns()}
                        </Grid>

                        <div style={{ height: '5vh' }} />

                        {newCampaign ? (
                            <Grid item xs={12}>
                                <CampaignCard
                                    t={t}
                                    campaign={null}
                                    controls={true}
                                    handleRefresch={() => getAllCampaigns()}
                                />
                            </Grid>
                        ):
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddCampaignCard}
                            >
                                {t('adminCampaign.buttonAdd')}
                            </Button>
                        }


                    </Layout>
                </div>
            ) : null}
        </div>
    );
};

// --- POPULATE PAGE ---
AdminCampaign.getInitialProps = async (ctx: any) => {
    return {namespacesRequired: ['common', 'admin'],};
};

export default withTranslation('admin')(AdminCampaign as any);
