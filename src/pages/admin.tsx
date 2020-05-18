/**
 * Admin Page
 * WIP
 * Add category,
 * Review reported posts
 */

// --- IMPORTS ---
import React, {useEffect, useState} from 'react';
import {withTranslation} from '../i18n';
import {
    Button,
    Card,
    createStyles,
    Grid,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import Layout from '../components/Layout';
import {apis} from '../services/apis';
import {useSnackbarContext} from '../contexts/SnackbarContext';
import {AxiosError, AxiosResponse} from 'axios';
import {Categories, Category, Memories, Users} from '../types';
import {NextPage} from 'next';
import Head from 'next/head';
import CardContent from "@material-ui/core/CardContent";
import ReportedMemoryCard from "../components/ReportedMemoryCard";
import UserTableRow from "../components/UserTableRow";
import UserTable from "../components/UserTable";

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
    const [reportedMemories, setReportedMemories] = useState<Memories | null>(null);
    const [users, setUsers] = useState<Users | null>(null);

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
            getAllReportedMemories();
            getAllUsers();
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
    const handleCategoryNameChangeUpdate = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCategoryUpdatedName(event.target.value);
        setCategoryUpdatedId(selectedIndex);
    };
    const handleCategoryDescriptionChangeUpdate = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCategoryUpdatedDescription(event.target.value);
        setCategoryUpdatedId(selectedIndex);
    };

    const handleSubmit = () => {
        const model = {
            name: categoryName,
            description: categoryDescription,
        };
        apis.admin
            .adminCreateCategory(model)
            .then((res: AxiosResponse) => {
                snackbarContext.displaySuccessSnackbar('Category added');
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
                <Typography variant="h6" gutterBottom>
                    Update selected category
                </Typography>
                <form noValidate autoComplete="false">
                    <div>
                        <TextField
                            variant="outlined"
                            label="Category Name"
                            onChange={handleCategoryNameChangeUpdate}
                            value={categorySelected.name}
                        ></TextField>
                    </div>
                    <br />
                    <div>
                        <TextField
                            variant="outlined"
                            multiline
                            rows={4}
                            label="Category Description"
                            value={categorySelected.description}
                            onChange={
                                handleCategoryDescriptionChangeUpdate
                            }
                        ></TextField>
                    </div>
                    <br />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCategoryUpdateSubmit}
                        >
                            Save updated category
                        </Button>
                    </div>
                </form>
            </div>
        );
    };

    const getAllReportedMemories = async () => {
        let tempMemories: Memories;
        await apis.memories
            .getAllReportedMemories()
            .then((res) => {
                tempMemories = res.data;
                console.log('memories fetched: ', tempMemories.count);
                setReportedMemories(tempMemories);
            })
            .catch((err) => {
                console.error('Error fetching memories', err);
            });
    };

    const displayReportedMemories = () => {
        let component;

        if (reportedMemories === null || reportedMemories.count === 0) {
            component = (
                <Grid item xs={4}>
                    <Card style={{ minWidth: '200px' }}>
                        <CardContent>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                component="p"
                            >
                                {t('emptyMemoryList')}
                                <br />
                                {t('addNewMemoryComment')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            );
        } else {
            component = reportedMemories.rows.map((memory, index) => {
                return (
                    <Grid key={index} item xs={4}>
                        <ReportedMemoryCard
//                            handleDeleteMemory={() =>
//                                handleDeleteMemory(index, memory.id)
//                           }
                            memory={memory}
                            category={categories.filter (item => item.id == memory.categoryId)[0]}
                            controls={true}
                        />
                    </Grid>
                );
            });
        }
        return component;
    };

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

    const displayUsers = () => {
        let component;

        // This table can be reached only if there exits at least one logged in user.
        // Therefore the null value is not even a possible situation.
        if (users === null || users.count === 0) {
            component = <div>Empty list>/</div>;
        } else {
            component = users.rows.map((user, index) => {
                return (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableCell >User name2</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Is admin</TableCell>
                            </TableHead>
                            <TableBody>
                                <UserTableRow user={user} controls={true} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            });
        }
        return component;
    };

    const displayUsers2 = () => {
        let component;

        // This table can be reached only if there exits at least one logged in user.
        // Therefore the null value is not even a possible situation.
        if (users === null || users.count === 0) {
            component = <div>Empty list>/</div>;
        } else {
            component = (users) => {(
                <UserTable users={users} controls={true}>testaus</UserTable>
            )}
        };
        return component;
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
                            <Grid container spacing={2}>
                                {displayReportedMemories()}
                            </Grid>
                        </form>

                        <div style={{ height: '5vh' }} />

                        {/* Review Reports */}
                        <Typography variant="h6" gutterBottom>
                            Users
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            //TODO,
                        </Typography>

                        <form noValidate autoComplete="false">
                            <Grid container spacing={2}>
                                {displayUsers()}
                                {displayUsers2()}
                            </Grid>
                        </form>

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
