/**
 * Component used to display campaign cards in admin campaign page
 */

import React, {useEffect, useState} from 'react';
import {Campaign} from '../types';
import Moment from 'react-moment';
import {useSnackbarContext} from "../contexts/SnackbarContext";
import {Button, Grid, makeStyles, Paper, TextField, Typography} from '@material-ui/core';
import theme from "../theme";
import {apis} from "../services/apis";
import {AxiosError, AxiosResponse} from "axios";


const useStyles = makeStyles({
    paper: {
        width: '100%',
        padding: '1.5rem',
        borderRadius: '8px',
        backgroundColor: theme.palette.background.paper,
    },
});


interface ICampaignCard {
    t(key, opts?): Function;
    campaign: Campaign;
    controls?: boolean;
    handleRefresch?(): void;
}

const CampaignCard: React.FC<ICampaignCard> = ({
    t,
    campaign,
    controls,
    handleRefresch
}) => {

    //Contexts
    const classes = useStyles();
    const snackbarContext = useSnackbarContext();

    //States
    const [campaignTitleFI, setCampaignTitleFI] = useState<string>('');
    const [campaignTitleSV, setCampaignTitleSV] = useState<string>('');
    const [campaignTitleEN, setCampaignTitleEN] = useState<string>('');
    const [campaignDescriptionFI, setCampaignDescriptionFI] = useState<string>('');
    const [campaignDescriptionSV, setCampaignDescriptionSV] = useState<string>('');
    const [campaignDescriptionEN, setCampaignDescriptionEN] = useState<string>('');

    useEffect(() => {
        if (campaign!=null) {
            setCampaignTitleFI(campaign.titleFI);
            setCampaignTitleSV(campaign.titleSV);
            setCampaignTitleEN(campaign.titleEN);
            setCampaignDescriptionFI(campaign.descriptionFI);
            setCampaignDescriptionSV(campaign.descriptionSV);
            setCampaignDescriptionEN(campaign.descriptionEN);
        }
    }, []);

    const handleCampaignSubmitSave = () => {
        if (campaign==null){
            // Create a new campaign
            const model = {
                titleFI: campaignTitleFI,
                titleSV: campaignTitleSV,
                titleEN: campaignTitleEN,
                descriptionFI: campaignDescriptionFI,
                descriptionSV: campaignDescriptionSV,
                descriptionEN: campaignDescriptionEN,
            };

            apis.admin
                .adminCreateCampaign(model)
                .then((res: AxiosResponse) => {
                    snackbarContext.displaySuccessSnackbar('Campaign added');
                    handleRefresch();
                })
                .catch((err: AxiosError) => {
                    snackbarContext.displayErrorSnackbar('Error');
                });

        } else {
            // Update existing campaign
            campaign.titleFI=campaignTitleFI;
            campaign.titleSV=campaignTitleSV;
            campaign.titleEN=campaignTitleEN;
            campaign.descriptionFI=campaignDescriptionFI;
            campaign.descriptionSV=campaignDescriptionSV;
            campaign.descriptionEN=campaignDescriptionEN;
            apis.admin
                .adminUpdateCampaignById((campaign.id), campaign)
                .then((res: AxiosResponse) => {
                    fetchCampaignById(campaign.id);
                    snackbarContext.displaySuccessSnackbar('Campaign updated');
                })
                .catch((err: AxiosError) => {
                    snackbarContext.displayErrorSnackbar('Error');
                });
        }
    };

    const fetchCampaignById = (campaignId: number) => {
        apis.campaigns
            .getCampaignById(campaignId)
            .then((res: AxiosResponse) => {
                campaign = res.data;
            })
            .catch((err: AxiosError) => {
                // Error
            });
    };

    const handleCampaignSubmitDelete = () => {
        apis.admin
            .adminDeleteCampaignById(campaign.id)
            .then((res: AxiosResponse) => {
                handleRefresch();
                snackbarContext.displaySuccessSnackbar('Campaign deleted');
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };


    return (
        <Paper elevation={3} className={classes.paper}>

            <Typography
                variant="body2"
                color="textSecondary"
                component="p"
            >
                {campaign ? (
                    <Moment format="YYYY/MM/DD">{campaign.createdAt}</Moment>
                ):null}
            </Typography>
            <div style={{ height: '2vh' }} />

            <form noValidate autoComplete="false">
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required={true}
                            variant="outlined"
                            fullWidth={true}
                            label={t('adminCampaign.titleFI')}
                            value={campaignTitleFI}
                            onChange={(event => setCampaignTitleFI(event.target.value))}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            multiline
                            fullWidth={true}
                            rows={4}
                            label={t('adminCampaign.descriptionFI')}
                            value={campaignDescriptionFI}
                            onChange={(event => setCampaignDescriptionFI(event.target.value))}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth={true}
                            label={t('adminCampaign.titleSV')}
                            value={campaignTitleSV}
                            onChange={(event => setCampaignTitleSV(event.target.value))}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            multiline
                            fullWidth={true}
                            rows={4}
                            label={t('adminCampaign.descriptionSV')}
                            value={campaignDescriptionSV}
                            onChange={(event => setCampaignDescriptionSV(event.target.value))}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth={true}
                            label={t('adminCampaign.titleEN')}
                            value={campaignTitleEN}
                            onChange={(event => setCampaignTitleEN(event.target.value))}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            multiline
                            fullWidth={true}
                            rows={4}
                            label={t('adminCampaign.descriptionEN')}
                            value={campaignDescriptionEN}
                            onChange={(event => setCampaignDescriptionEN(event.target.value))}
                        ></TextField>
                    </Grid>
                </Grid>

                <br />
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCampaignSubmitSave}
                    >
                        {t('adminCampaign.buttonSave')}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCampaignSubmitDelete}
                    >
                        {t('adminCampaign.buttonDelete')}
                    </Button>
                </div>
            </form>

        </Paper>
    );
};

export default CampaignCard;
