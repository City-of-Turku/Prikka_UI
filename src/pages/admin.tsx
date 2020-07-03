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
    createStyles,
    Grid,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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
import {withStyles} from '@material-ui/core/styles';
import {AddCircleRounded, DeleteRounded, EditRounded} from '@material-ui/icons';


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
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '35ch',
          },
    }),
);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

// --- COMPONENT ---
interface IAdmin {
    t(key: string, opts?: any): string;
    categories: Categories;
    isLogged: boolean;
    isAdmin: boolean;
    categoryUpdatedName: {nameFI: string; nameSE: string; nameEn: string;}
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
    const [showEditCategory, setShowEditCategory] = useState<boolean>(false);
    const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
    const [categoryDescription, setCategoryDescription] = useState<string>('');
    const [categoryUpdatedId, setCategoryUpdatedId] = useState<number>(0);
    const [categoryName, setCategoryName] = React.useState({
        nameFI: "",
        nameSV: "",
        nameEN: "",
    });
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
                setCategories(categories);
                console.log(categories);
                console.log('Categories fetched: ', categories.length);
            })
            .catch((err) => console.error('Error fetching categories', err));
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

    const handleCategoryNameChangeUpdate = (
        name: string,
        param: string
    ) => {
        if(param === 'nameFI'){
            setCategoryName({
                nameFI: name,
                nameSV: categoryName['nameSV'],
                nameEN: categoryName['nameEN']
            });
        } else if(param === 'nameSV') {
            setCategoryName({
                nameFI: categoryName['nameFI'],
                nameSV: name,
                nameEN: categoryName['nameEN']
            });
        } else {
            setCategoryName({
                nameFI: categoryName['nameFI'],
                nameSV: categoryName['nameSV'],
                nameEN: name
            });
        }
    };

    const handleCategoryCreateSubmit = () => {
        const model = {
            nameFI: categoryName['nameFI'],
            nameSV: categoryName['nameSV'],
            nameEN: categoryName['nameEN'],
            descriptionFI: categoryDescription,
            descriptionSV: "",
            descriptionEN: ""
        };
        apis.admin
            .adminCreateCategory(model)
            .then((res: AxiosResponse) => {
                snackbarContext.displaySuccessSnackbar('Category added');
                getAllCategories();
                setCategoryName({
                    nameFI: '',
                    nameSV: '',
                    nameEN: ''
                });
                setCategoryDescription('');
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    const handleCategoryUpdateSubmit = () => {
        const model = {
            nameFI: categoryName['nameFI'],
            nameSV: categoryName['nameSV'],
            nameEN: categoryName['nameEN'],
            descriptionFI: categoryDescription,
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
    const handleCategoryUpdateCancel= () => {
        setShowEditCategory(false);
        resetCategoryNameState();
    };
    const handleAddCategory = () => {
        if(showEditCategory)
            handleCategoryUpdateCancel();
        setShowAddCategory(true);
    };
    const handleAddCategoryCancel= () => {
        setShowAddCategory(false);
        resetCategoryNameState();
    };

    const resetCategoryNameState = () => {
        setCategoryName({
            nameFI: '',
            nameSV: '',
            nameEN: ''
        });
        setCategoryDescription('');
    };
    const handleCategoryDeleteSubmit = () => {
        apis.admin
            .adminDeleteCategoryById(categoryUpdatedId)
            .then((res: AxiosResponse) => {
                snackbarContext.displaySuccessSnackbar('Category deleted');
                getAllCategories();
                setCategoryUpdatedId(0);
                setCategoryName({
                    nameFI: '',
                    nameSV: '',
                    nameEN: ''
                });
                setCategoryDescription('');
            })
            .catch((err: AxiosError) => {
                snackbarContext.displayErrorSnackbar('Error');
            });
    };

    const generateCategoryDetails = () => {
        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    {t('titleSelectedCategory')}
                </Typography>
                <form noValidate autoComplete="false">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            variant="outlined"
                            label={t('categoryNameFI')}
                            value={categoryName['nameFI']}
                            className={classes.textField}
                            onChange={event => handleCategoryNameChangeUpdate(event.target.value,'nameFI')}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            label={t('categoryNameSV')}
                            value={categoryName['nameSV']}
                            className={classes.textField}
                            onChange={event => handleCategoryNameChangeUpdate(event.target.value,'nameSV')}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            label={t('categoryNameEN')}
                            value={categoryName['nameEN']}
                            className={classes.textField}
                            onChange={event => handleCategoryNameChangeUpdate(event.target.value,'nameEN')}
                        ></TextField>
                    </div>
                    <br />
                    <div>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            multiline rows={4}
                            label={t('categoryDescription')}
                            value={categoryDescription}
                            onChange={event => setCategoryDescription(event.target.value)}
                        ></TextField>
                        </Grid>
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
                        &nbsp;&nbsp;
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCategoryUpdateCancel}
                        >
                            {t('buttonCancel')}
                        </Button>
                    </div>
                </form>
            </div>     
        );
    };

    const displayAddCategory = () => {
        return (
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    {t('titleAddNewCategory')}
                </Typography>
                <form noValidate autoComplete="false">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                     <TextField
                            variant="outlined"
                            label={t('categoryNameFI')}
                            value={categoryName['nameFI']}
                            className={classes.textField}
                            onChange={event => handleCategoryNameChangeUpdate(event.target.value,'nameFI')}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            label={t('categoryNameSV')}
                            value={categoryName['nameSV']}
                            className={classes.textField}
                            onChange={event => handleCategoryNameChangeUpdate(event.target.value,'nameSV')}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            label={t('categoryNameEN')}
                            value={categoryName['nameEN']}
                            className={classes.textField}
                            onChange={event => handleCategoryNameChangeUpdate(event.target.value,'nameEN')}
                        ></TextField>
                    </div>
                    <br />
                    <div>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            multiline
                            rows={4}
                            label={t('categoryDescription')}
                            value={categoryDescription}
                            onChange={event => setCategoryDescription(event.target.value)}
                        ></TextField>
                        </Grid>
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
                        &nbsp;&nbsp;
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddCategoryCancel}
                        >
                            {t('buttonCancel')}
                        </Button>
                    </div>
                </form>
            </Grid>
        )
    };
   
    const handleCategoryListItemClick = (
        event: React.MouseEvent<SVGSVGElement>,
        index: number,
    ) => {
        setSelectedIndex(index);
        if(showAddCategory === true)
            handleAddCategoryCancel();
        setShowEditCategory(true);
        const categorySelected: Category = categories[index];
        setCategoryUpdatedId(categorySelected.id);
        setCategoryName({
            nameFI: categorySelected['nameFI'],
            nameSV: categorySelected['nameSV'],
            nameEN: categorySelected['nameEN']
        });
        setCategoryDescription(categorySelected['descriptionFI']);
        // Saved into finnish description col. for now, not shown to public, might change in future versions
    };

    const generateCategoryListItems = () => {
        return categories.map((category: Category, index: number) => {
            return (
                <TableRow>
                    <TableCell>{category['nameFI']}</TableCell>
                    <TableCell>{category['nameSV']}</TableCell>
                    <TableCell>{category['nameEN']}</TableCell>
                    <TableCell>{category['descriptionFI']}</TableCell>
                    <TableCell style={{ width:'100px'}}>
                        <EditRounded  onClick={(event) => handleCategoryListItemClick(event, index)} style={{ marginRight: '10px', fontSize: '1.3rem', cursor: 'pointer' }}/>
                        <DeleteRounded onClick={(event) => handleCategoryDeleteSubmit()} style={{ fontSize: '1.3rem', cursor: 'pointer' }}/>
                        {/* <DeleteDialog
                        t={t}
                        handleDelete={handleCategoryDeleteSubmit}
                        type={"category"}
                        /> */}
                    </TableCell>
                </TableRow>
            );
        });
    };

    const displayCategoryList = () => {
        return (
            <Grid container item xs={12}>
                    <Typography variant="h6">
                        {t('titleCategories')}
                    </Typography>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <StyledTableCell >{t('categoryTable.headerFI')}</StyledTableCell>
                                        <StyledTableCell>{t('categoryTable.headerSV')}</StyledTableCell>
                                        <StyledTableCell>{t('categoryTable.headerEN')}</StyledTableCell>
                                        <StyledTableCell>{t('categoryTable.description')}</StyledTableCell>
                                    </TableHead>
                                    <TableBody>
                                        {categories
                                        ? generateCategoryListItems()
                                        : null}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <AddCircleRounded onClick={(event) => handleAddCategory()} style={{ marginTop: '20px', fontSize: '2.5rem', cursor: 'pointer'}}/>
                    </Grid>
                </Grid>
            </Grid>
        )
    };

    const displaySelectedCategory = () => {
        return (
            <Grid item xs={12}>
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
            component = <div>Empty list</div>;
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
                            {/* CategoryList */}
                            {displayCategoryList()}

                            {/* Add Category */}
                            {showAddCategory == true ? displayAddCategory() : ""}

                            {/* Selected category */}
                            {showEditCategory == true ? displaySelectedCategory() : ""}
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
