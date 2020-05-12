/**
 * Admin Page
 * WIP
 * Add category,
 * Review reported posts
 */

// --- IMPORTS ---
import React, { useState, useEffect } from 'react';
import { withTranslation } from '../i18n';
import {
    Typography,
    TextField,
    Button,
    Grid,
    Theme,
    createStyles,
    makeStyles,
    ListItem,
    ListItemText,
    List,
} from '@material-ui/core';
import Layout from '../components/Layout';
import { apis } from '../services/apis';
import { useSnackbarContext } from '../contexts/SnackbarContext';
import { AxiosError, AxiosResponse } from 'axios';
import { Categories, Category } from '../types';
import { NextPage } from 'next';
import Head from 'next/head';

// --- STYLES ---
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        categoryList: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

// --- COMPONENT ---
interface IAdmin {
    t(key: string, opts?: any): string;
    categories: Categories;
    isLogged: boolean;
    isAdmin: boolean;
}

const Admin: NextPage<IAdmin & any> = ({
    t,
    isLogged,
    isAdmin,
}) => {
    //Contexts
    const classes = useStyles();
    const snackbarContext = useSnackbarContext();
    //States
    const [categories, setCategories] = useState<Categories | null>(null)

    const getAllCategories = async () => {
        await apis.categories
            .getAllCategories()
            .then((res) => {
                let categories = res.data.categories;
                setCategories(categories)
                console.log(categories)
                console.log('Categories fetched: ', categories.length);
            })
            .catch((err) => console.error('Error fetching categories', err));
    }

    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryDescription, setCategoryDescription] = useState<string>('');
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    useEffect(() => {
        if (!isLogged || !isAdmin) {
            window.location.href =
                process.env.BACK_URL! + process.env.LOGIN_URL!;
        } else {
            getAllCategories()
        }
    }, []);

    const handleCategoryNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCategoryName(event.target.value);
    };
    const handleCategoryDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCategoryDescription(event.target.value);
    };

    const handleSubmit = () => {
        const model = {
            name: categoryName,
            description: categoryDescription,
        };
        apis.admin
            .adminCreateCategory(model)
            .then((res: AxiosResponse) => {
                snackbarContext.displaySuccessSnackbar('Category Added');
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const generateCategories = () => {
        return categories.map((category: Category, index: number) => {
            return (
                <ListItem
                    button
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                >
                    <ListItemText primary={category.name} />
                </ListItem>
            );
        });
    };

    const generateCategoryDetails = () => {
        const categorySelected: Category = categories[selectedIndex];
        return (
            <div>
                <Typography variant="h6">Name</Typography>
                <Typography variant="body1" gutterBottom>
                    {categorySelected.name}
                </Typography>

                <Typography variant="h6">Description</Typography>
                <Typography variant="body1" gutterBottom>
                    {categorySelected.description}
                </Typography>
            </div>
        );
    };

    return (
        <div>
            {isLogged && isAdmin ? (
                <div>
                    <Head>
                        <title>Admin</title>
                    </Head>

                    <Layout>
                        <Typography variant="h3" gutterBottom>
                            Admin
                        </Typography>

                        {/* Add Category */}
                        <Grid container spacing={6}>
                            <Grid item xs={4}>
                                <Typography variant="h6" gutterBottom>
                                    Add new category
                                </Typography>
                                <form noValidate autoComplete="false">
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            label="Category Name"
                                            onChange={handleCategoryNameChange}
                                            value={categoryName}
                                        ></TextField>
                                    </div>
                                    <br />
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            multiline
                                            rows={4}
                                            label="Category Description"
                                            value={categoryDescription}
                                            onChange={
                                                handleCategoryDescriptionChange
                                            }
                                        ></TextField>
                                    </div>
                                    <br />
                                    <div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit}
                                        >
                                            Add category
                                        </Button>
                                    </div>
                                </form>
                            </Grid>

                            {/* CategoryList */}
                            <Grid container item xs={8}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Current categories
                                    </Typography>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={4}>
                                        <div className={classes.categoryList}>
                                            <List
                                                component="nav"
                                                aria-label="main mailbox folders"
                                            >
                                                {categories
                                                    ? generateCategories()
                                                    : null}
                                            </List>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        {categories
                                            ? generateCategoryDetails()
                                            : null}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <div style={{ height: '5vh' }} />

                        {/* Review Reports */}
                        <Typography variant="h6" gutterBottom>
                            Review reports
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            //TODO, sort memories by reports, edit or delete
                            options
                        </Typography>

                        <form noValidate autoComplete="false">
                            <Grid container spacing={3}>
                                {[...Array(4).keys()].map(() => {
                                    return (
                                        <Grid item xs={4}>
                                            <div
                                                style={{
                                                    backgroundColor: 'grey',
                                                    height: '100px',
                                                    width: '100px',
                                                }}
                                            ></div>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </form>
                        <div style={{ height: '5vh' }} />
                    </Layout>
                </div>
            ) : null}
        </div>
    ); //TODO : edit or remove cat, display confirmation window with string to enter
};

// --- POPULATE PAGE ---
Admin.getInitialProps = async (ctx: any) => {
    return {namespacesRequired: ['common', 'admin'],};
};

export default withTranslation('admin')(Admin as any);
