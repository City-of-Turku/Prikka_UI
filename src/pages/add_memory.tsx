/**
 * AddMemory Page
 * Opened when 'Add memory" but in navbar clicked
 * Displays a form for the user
 *
 * Ideas : https://www.blablacar.fr/offer-seats/1
 */

// --- IMPORTS ---
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { apis } from '../services/apis';
import { withTranslation } from '../i18n';
import {
    Typography,
    Grid,
    Paper,
    TextField,
    Box,
    Button,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import PinpointMap from '../components/PinpointMap';
import { AxiosError, AxiosResponse } from 'axios';
import { useSnackbarContext } from '../contexts/SnackbarContext';
import Router from 'next/router';
import CategorySelect from '../components/CategorySelect';
import { Categories } from '../types';
import Head from 'next/head';
import { NextPage } from 'next';

// --- STYLES ---
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        box: {
            paddingTop: '16px',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: '16px',
        },
        item: {
            paddingBottom: '16px',
        },
        paper: {
            borderRadius: '8px',
            backgroundColor: theme.palette.background.paper,
        },
        input: {
            display: 'none',
        },
    }),
);

interface IAddMemory {
    t(key: string, opts?: any): string;
    categories: Categories;
    isLogged: boolean;
}
// --- COMPONENTS ---
const AddMemory: NextPage<IAddMemory & any> = ({ t, categories, isLogged }) => {
    // TODO:replace formsy with formik
    //Contexts
    const classes = useStyles();
    const snackbarContext = useSnackbarContext();
    //States
    const [markerPosition, setMarkerPosition] = useState<number[] | undefined>(
        undefined,
    ); //Care, Mapbox use [lng,lat] and not [lat,lng]
    const [category, setCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    //Vars
    const center = [60.455, 22.26];

    //Image upload
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('');
    const [uploadedFile, setUploadedFile] = useState({});

    //Adds filename when file is added
    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

/*     const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath});
        }catch(err){
            if(err.response.status == 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }; */

    //Functions
    const handleClickPositionCallback = (position: number[]): void => {
        setMarkerPosition(position);
    };

    const handleCategoryFilterChange = (categoryId: string) => {
        setCategory(categoryId);
    };

    const handleSubmit = (): void => {
        if (markerPosition === undefined) {
            snackbarContext.displayWarningSnackbar(
                'Please select a position on the map',
            );
        } else if (title === '') {
            snackbarContext.displayWarningSnackbar(
                'Please enter a title for your memory',
            );
        } else if (category === '') {
            snackbarContext.displayWarningSnackbar(
                'Please select a category for your memory',
            );
        } else if (description === '') {
            snackbarContext.displayWarningSnackbar(
                'Please enter a description for your memory',
            );
        } else {
            // to do: data variable not that useful anymore
            // TODO Rob
            var formData = new FormData();
            var data = {
                title: title,
                categoryId: category,
                description: description,
                photo: file,
                position: {
                    type: 'Point',
                    coordinates: [markerPosition[1], markerPosition[0]],
                },
            };
            formData.append('title', title);
            formData.append('categoryId', category);
            formData.append('description', description);
            formData.append('file', file);
            formData.append('position', JSON.stringify(data.position));
            apis.memories
                .createMemory(formData)
                .then((res: AxiosResponse) => {
                    snackbarContext.displaySuccessSnackbar('Memory Added');
                    Router.push('/');
                })
                .catch((err: AxiosError) => {
                    snackbarContext.displayErrorSnackbar('Error');
                });
        }
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCategory(event.target.value);
    };
    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDescription(event.target.value);
    };

    return (
        <div>
            <Head>
                <title>Add Memory</title>
            </Head>

            <Layout>
                {/* --- TITLE --- */}
                <Typography variant="h3" gutterBottom>
                    {t('title')}
                </Typography>

                {/* Disclaimer if not logged in */}
                {!isLogged ? (
                    <div>
                        <Typography variant="body1" gutterBottom>
                            {t('warning')}
                        </Typography>
                        <br />
                    </div>
                ) : null}

                {/* MAIN GRID */}
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    justify="flex-start"
                    alignItems="center"
                >
                    {/* FIRST ROW */}
                    <Grid
                        container
                        item
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        {/* LEFT ELEMENT */}
                        {/* AddMemoryForm */}
                        <Grid item xs={6}>
                            <Paper className={classes.paper} elevation={4}>
                                <Box className={classes.box}>
                                    {/* Informations */}
                                    <Typography
                                        variant="h6"
                                        className={classes.item}
                                    >
                                        {t('info_title')}
                                    </Typography>

                                    <form noValidate autoComplete="off">
                                        <TextField
                                            className={classes.item}
                                            required
                                            id="outlined-basic"
                                            label={t("title_PH")}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            value={title}
                                            onChange={handleTitleChange}
                                        />
                                        {/* 
                    <TextField
                        className={classes.item}
                        required
                        id="outlined-basic"
                        label="Category"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={category}
                        onChange={handleCategoryChange}
                    />
                    */}
                                        <CategorySelect
                                            t={t}
                                            categories={categories}
                                            handleCategoryFilterChange={
                                                handleCategoryFilterChange
                                            }
                                            required={true}
                                            fullWidth={true}
                                        />
                                        <div
                                            style={{
                                                margin: '0px',
                                                padding: '0px',
                                                paddingBottom: '16px',
                                            }}
                                        ></div>

                                        <TextField
                                            id="outlined-multiline"
                                            label={t("description_PH")}
                                            multiline
                                            rows="8"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            required
                                        />
                                        { <div className={classes.root}>
                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="contained-button-file"
                                                type="file"
                                                onChange={onChange}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Typography>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component="span"
                                                >
                                                    {t("upload_button_text")}
                                                </Button>
                                                    &nbsp;&nbsp;&nbsp;{t("image_info")}&nbsp;&nbsp;&nbsp;{filename}
                                                </Typography>
                                            </label>
                                        </div> }
                                    </form>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* RIGHT ELEMENT */}
                        {/* Map Form */}
                        <Grid container item xs={6}>
                            <Paper className={classes.paper} elevation={4}>
                                <Box className={classes.box}>
                                    {/* position */}
                                    <Typography
                                        variant="h6"
                                        className={classes.item}
                                    >
                                        {t('map_title')}
                                    </Typography>
                                    <PinpointMap
                                        handleClickPositionCallback={
                                            handleClickPositionCallback
                                        }
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* SECOND ROW */}
                    <Grid container item xs={12} justify="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                {t('continue_button')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>
        </div>
    );
};

AddMemory.getInitialProps = async () => {
    let categories: Categories = null;
    await apis.categories
        .getAllCategories()
        .then((res) => {
            categories = res.data.categories;

            console.log('Categories fetched: ', categories.length);
        })
        .catch((err) => console.error('Error fetching categories'));

    return {
        namespacesRequired: ['common', 'addMemory', 'index'],
        categories: categories,
    };
};

export default withTranslation('addMemory')(AddMemory as any); //TODO : create namespace for each page
