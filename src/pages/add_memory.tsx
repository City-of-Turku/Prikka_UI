/**
 * AddMemory Page
 * Opened when 'Add memory" but in navbar clicked
 * Displays a form for the user
 *
 * Ideas : https://www.blablacar.fr/offer-seats/1
 */

// --- IMPORTS ---
import React, {useState} from 'react';
import Layout from '../components/Layout';
import {apis} from '../services/apis';
import {withTranslation} from '../i18n';
import {Box, Button, Grid, Paper, TextField, Typography,} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import PinpointMap from '../components/PinpointMap';
import {AxiosError, AxiosResponse} from 'axios';
import {useSnackbarContext} from '../contexts/SnackbarContext';
import Router from 'next/router';
import CategorySelect from '../components/CategorySelect';
import {Categories} from '../types';
import Head from 'next/head';
import {NextPage} from 'next';
import CardMedia from "@material-ui/core/CardMedia";

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
        itemDoubble: {
            margin: theme.spacing(2),
            paddingBottom: '32px',
            width: 400,
        },
        paper: {
            borderRadius: '8px',
            backgroundColor: theme.palette.background.paper,
        },
        input: {
            display: 'none',
        },
        media: {
            paddingLeft: '16px',
            height: 70,
            width: 150,
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
    const [fileUrl, setFileUrl] = useState('');
    const [uploadedFile, setUploadedFile] = useState({});
    const [photographer, setPhotographer] = useState<string>('');
    const [whenIsPhotoTaken, setWhenIsPhotoTaken] = useState<string>('');
    const [whereIsPhotoTaken, setWhereIsPhotoTaken] = useState<string>('');

    //Adds filename when file is added
    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setFileUrl( URL.createObjectURL(e.target.files[0]));
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
            var formData = new FormData();
            var data = {
                position: {
                    type: 'Point',
                    coordinates: [markerPosition[1], markerPosition[0]],
                }
            };
            formData.append('title', title);
            formData.append('categoryId', category);
            formData.append('description', description);
            formData.append('file', file);
            formData.append('position', JSON.stringify(data.position));
            formData.append('photographer', photographer);
            formData.append('whenIsPhotoTaken', whenIsPhotoTaken);
            formData.append('whereIsPhotoTaken', whereIsPhotoTaken);
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
    const handlePhotographerChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPhotographer(event.target.value);
    };
    const handleWhenIsPhotoTakenChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setWhenIsPhotoTaken(event.target.value);
    };
    const handleWhereIsPhotoTakenChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setWhereIsPhotoTaken(event.target.value);
    };

    const displayPhotoMetaInformation = () => {
        if (fileUrl){
        return (

            <>
            <Grid container spacing={4}>
                <Grid container xs={6}>
                    <TextField
                        className={classes.itemDoubble}
                        required
                        id="outlined-basic"
                        label={t("photographer_PH")}
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={photographer}
                        onChange={handlePhotographerChange}
                    />
                </Grid>
                <Grid container xs={6}>
                    <CardMedia
                        className={classes.media}
                        image={fileUrl}
                        title="Memory Picture"
                    />
                </Grid>
            </Grid>
            <TextField
            className={classes.item}
            required
            id="outlined-basic"
            label={t("whenIsPhotoTaken_PH")}
            variant="outlined"
            size="small"
            fullWidth
            value={whenIsPhotoTaken}
            onChange={handleWhenIsPhotoTakenChange}
            />
            <TextField
                className={classes.item}
                required={false}
                id="outlined-basic"
                label={t("whereIsPhotoTaken_PH")}
                variant="outlined"
                size="small"
                fullWidth
                value={whereIsPhotoTaken}
                onChange={handleWhereIsPhotoTakenChange}
            />
            </>
        )}
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
                                        {displayPhotoMetaInformation()}
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
