/**
 * User_settings Page
 * User see his username, displayname, year of birth and email
 * Not possible for now: Can change his password (see auth0)
 */

// --- IMPORTS ---
import React, {useEffect, useState} from 'react';
import {withTranslation} from '../i18n';
import {Button, createStyles, Grid, makeStyles, TextField, Theme, Typography} from '@material-ui/core';
import Layout from '../components/Layout';
import Head from 'next/head';
import {apis} from "../services/apis";
import {NextPage} from "next";
import {AxiosError, AxiosResponse} from "axios";
import {useSnackbarContext} from "../contexts/SnackbarContext";

// --- STYLES ---
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            width: '100%',
            variant: 'body2',
            color: 'textSecondary',
            component: 'p',
            noWrap: 'false',
            fontWeight: 600,
        },
        fieldDescription: {
            width: '100%',
            variant: 'body2',
            color: 'textSecondary',
            component: 'p',
            noWrap: 'false',
        },
    }),
);

// --- COMPONENT ---
interface IUserSettings {
    t(key: string, opts?: any): string;
    isLogged: boolean;
}

const UserSettings: NextPage<IUserSettings & any> = ({ t, isLogged }) => {

    const classes = useStyles();
    const snackbarContext = useSnackbarContext();

    const [email, setEmail] = useState<string | null>(null);
    const [displayName, setDisplayName] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [yearOfBirth, setYearOfBirth] = useState<string | null>(null);

    useEffect(() => {
        console.log('Test test');
        getUser();
    }, []);

    const getUser = async () => {
        await apis.user
            .getUser()
            .then((res) => {
                let userTmp = res.data.user;
                setEmail(userTmp.email);
                setDisplayName(userTmp.displayName);
                setUserName(userTmp.userName);
                setYearOfBirth(userTmp.yearOfBirth);
                console.log('User fetched', userTmp);
            })
            .catch((err) => console.error('Error fetching user', err));
    };

    const handleUserNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setUserName(event.target.value);
    };

    const handleYearOfBirthChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setYearOfBirth(event.target.value);
    };

    const handleDisplayNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDisplayName(event.target.value);
    };

    const handleEmailChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEmail(event.target.value);
    };

    const handleUserUpdateSubmit = () => {
        const model = {
            userName: userName,
            yearOfBirth: yearOfBirth,
            displayName: displayName,
            email: email
        };
        apis.user
            .updateUserById(model)
            .then((res: AxiosResponse) => {
                snackbarContext.displaySuccessSnackbar('User updated');
                getUser();
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    return (
        <div id="settings-page">
            {isLogged ? (
                <div>
                    <Head>
                        <title>User settings</title>
                    </Head>

                    <Layout>
                    <Typography variant="h3">{t('title')}</Typography>
                    <div style={{ height: '5vh' }} />

                    <form noValidate autoComplete="false">

                        <Grid container item xs={12} spacing={3}>

                            <Grid item xs={4}>
                                <Typography className={classes.field}>
                                    {t('userName')}
                                </Typography>
                                <Typography className={classes.fieldDescription}>
                                    {t('userNameDesc')}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    variant="outlined"
                                    value={userName}
                                    onChange={handleUserNameChange}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Typography className={classes.field}>
                                    {t('displayName')}
                                </Typography>
                                <Typography className={classes.fieldDescription}>
                                    {t('displayNameDesc')}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    variant="outlined"
                                    //label={t('displayName')}
                                    value={displayName}
                                    onChange={handleDisplayNameChange}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Typography className={classes.field}>
                                    {t('yearOfBirth')}
                                </Typography>
                                <Typography className={classes.fieldDescription}>
                                    {t('yearOfBirthDesc')}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    variant="outlined"
                                    value={yearOfBirth}
                                    onChange={handleYearOfBirthChange}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Typography className={classes.field}>
                                    {t('email')}
                                </Typography>
                                <Typography className={classes.fieldDescription}>
                                    {t('emailDesc')}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    variant="outlined"
                                    //label={t('email')}
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </Grid>

                            <div style={{ height: '10vh' }} />
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUserUpdateSubmit}
                                >
                                    {t('buttonUpdateUser')}
                                </Button>
                            </div>

                        </Grid>
                    </form>
                    </Layout>
                </div>
            ) : null}
        </div>
    );
};

// --- POPULATE PAGE ---
UserSettings.getInitialProps = async (ctx: any ) => {
    return {
        namespacesRequired: ['common', 'userSettings'],
    };
};

export default withTranslation('userSettings')(UserSettings as any);
