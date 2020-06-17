/**
 * Admin Page
 * WIP
 * Add category,
 * Review reported posts
 */

// --- IMPORTS ---
import React, {useEffect, useState} from 'react';
import {withTranslation,i18n} from '../i18n';
import {
    Button,
    createStyles,
    Grid,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import Layout from '../components/Layout';
import {apis} from '../services/apis';
import {useSnackbarContext} from '../contexts/SnackbarContext';
import {AxiosError, AxiosResponse} from 'axios';
import {Categories, Category, Users} from '../types';
import {NextPage} from 'next';
import Head from 'next/head';
import UserTable from "../components/UserTable";
import DeleteDialog from "../components/DeleteDialog";
import CardActions from "@material-ui/core/CardActions";
import MemoryCard from "../components/MemoryCard";

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
    const [users, setUsers] = useState<Users | null>(null);

    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryDescription, setCategoryDescription] = useState<string>('');
    const [categoryUpdatedId, setCategoryUpdatedId] = useState<number>(0);
    const [categoryUpdatedName, setCategoryUpdatedName] = useState<string>('');
    const [categoryUpdatedDescription, setCategoryUpdatedDescription] = useState<string>('');
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    useEffect(() => {
        if (!isLogged || !isAdmin) {
            window.location.href =
                process.env.BACK_URL! + process.env.LOGIN_URL!;
        } else {
            getAllCategories();
            getAllUsers();
        }
    }, []);

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

    const getAllUsers = async () => {
        let tempUsers: Users;
        await apis.admin
            .adminGetAllUsers()
            .then((res) => {
                tempUsers = res.data;
                console.log('users fetched: ', tempUsers.count);
                setUsers(tempUsers);
            })
            .catch((err) => {
                console.error('Error fetching memories', err);
            });
    };

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
    const handleCategoryNameChangeUpdate = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCategoryUpdatedName(event.target.value);
//        setCategoryUpdatedId(selectedIndex);
    };
    const handleCategoryDescriptionChangeUpdate = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCategoryUpdatedDescription(event.target.value);
//        setCategoryUpdatedId(selectedIndex);
    };

    const handleCategoryCreateSubmit = () => {
        const model = {
            name: categoryName,
            description: categoryDescription,
        };
        apis.admin
            .adminCreateCategory(model)
            .then((res: AxiosResponse) => {
                snackbarContext.displaySuccessSnackbar('Category added');
                getAllCategories();
                setCategoryName("");
                setCategoryDescription("");
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    const handleCategoryUpdateSubmit = () => {
        const model = {
            name: categoryUpdatedName,
            description: categoryUpdatedDescription,
        };
        apis.admin
            .adminUpdateCategory(categoryUpdatedId,model)
            .then((res: AxiosResponse) => {
                snackbarContext.displaySuccessSnackbar('Category updated');
                getAllCategories();
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    const handleCategoryDeleteSubmit = () => {
        apis.admin
            .adminDeleteCategoryById(categoryUpdatedId)
            .then((res: AxiosResponse) => {
                snackbarContext.displaySuccessSnackbar('Category deleted');
                getAllCategories();
                setCategoryUpdatedId(0);
                setCategoryUpdatedName("");
                setCategoryUpdatedDescription("");
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        let name = 'name' +i18n.language.toUpperCase();
        let description = 'description' +i18n.language.toUpperCase();
        setSelectedIndex(index);
//        setCategoryUpdatedId(selectedIndex);
        const categorySelected: Category = categories[selectedIndex];
        setCategoryUpdatedId(categorySelected.id);
        setCategoryUpdatedName(categorySelected[name]);
        setCategoryUpdatedDescription(categorySelected[description]);
    };

    const generateCategoryListItems = () => {
        let name = 'name' +i18n.language.toUpperCase();
        return categories.map((category: Category, index: number) => {
            return (
                <ListItem
                    button
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                >
                    <ListItemText primary={category[name]} />
                </ListItem>
            );
        });
    };

    const generateCategoryDetails = () => {
        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    {t('titleSelectedCategory')}
                </Typography>
                <form noValidate autoComplete="false">
                    <div>
                        <TextField
                            variant="outlined"
                            label={t('categoryName')}
                            value={categoryUpdatedName}
                            onChange={handleCategoryNameChangeUpdate}
                        ></TextField>
                    </div>
                    <br />
                    <div>
                        <TextField
                            variant="outlined"
                            multiline rows={4}
                            label={t('categoryDescription')}
                            value={categoryUpdatedDescription}
                            onChange={handleCategoryDescriptionChangeUpdate}
                        ></TextField>
                    </div>
                    <br />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCategoryUpdateSubmit}
                        >
                            {t('buttonUpdateCategory')}
                        </Button>
                    </div>
                    <br />
                    <DeleteDialog
                        t={t}
                        handleDelete={handleCategoryDeleteSubmit}
                        type={"category"}
                    />
                </form>
            </div>
        );
    };

    const displayAddCategory = () => {
        return (
            <Grid item xs={4}>
                <Typography variant="h6" gutterBottom>
                    {t('titleAddNewCategory')}
                </Typography>
                <form noValidate autoComplete="false">
                    <div>
                        <TextField
                            variant="outlined"
                            label={t('categoryName')}
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
                            label={t('categoryDescription')}
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
                            onClick={handleCategoryCreateSubmit}
                        >
                            {t('buttonAddCategory')}
                        </Button>
                    </div>
                </form>
            </Grid>
        )
    };

    const displayCategoryList = () => {
        return (
            <Grid container item xs={4}>
                    <Typography variant="h6">
                        {t('titleCategories')}
                    </Typography>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.categoryList}>
                            <List
                                component="nav"
                                aria-label="main mailbox folders"
                            >
                                {categories
                                    ? generateCategoryListItems()
                                    : null}
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        )
    };

    const displaySelectedCategory = () => {
        return (
            <Grid item xs={4}>
                {categories
                    ? generateCategoryDetails()
                    : null}
            </Grid>
        )
    };

    const displayTableWithUsers = () => {
        let component;

        // This table can be reached only if there exits at least one logged in user.
        // Therefore the null value is not even a possible situation.
        if (users === null || users.count === 0) {
            component = <div>Empty list>/</div>;
        } else {
            component = <UserTable t={t} users={users} controls={true} handleRefresch={() => getAllUsers()}/>
        };
        return component;
    };

    return (
        <div>
            {isLogged && isAdmin ? (
                <div>
                    <Head>
                        <title>Admin configurations</title>
                    </Head>

                    <Layout>
                        <Typography variant="h3" gutterBottom>
                            {t('title')}
                        </Typography>

                        {/*** Categories ********************/}
                        <Grid container spacing={4} >
                            {/* Add Category */}
                            {displayAddCategory()}

                            {/* CategoryList */}
                            {displayCategoryList()}

                            {/* Selected category */}
                            {displaySelectedCategory()}
                        </Grid>

                        <div style={{ height: '10vh' }} />

                        {/*** Table with registrered users *********************/}
                        <Typography variant="h6" gutterBottom>
                            {t('titleRegistredUsers')}
                        </Typography>

                        <form noValidate autoComplete="false">
                            <Grid container spacing={2}>
                                {displayTableWithUsers()}
                            </Grid>
                        </form>

                    </Layout>
                </div>
            ) : (
                <div>
                    <Head>
                        <title>Admin configurations</title>
                    </Head>

                    <Layout>
                        <Typography variant="h6" gutterBottom>
                            {t('title')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {t('notAllowed')}
                        </Typography>
                    </Layout>
                </div>
            )}
        </div>
    ); //TODO : edit or remove cat, display confirmation window with string to enter
};

// --- POPULATE PAGE ---
Admin.getInitialProps = async (ctx: any) => {
    return {namespacesRequired: ['common', 'admin'],};
};

export default withTranslation('admin')(Admin as any);
