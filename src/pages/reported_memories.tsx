/**
 * Reported Memories Page (admin)
 * - check reported memories
 * - override reports where needed
 * - delete memories
 */

// --- IMPORTS ---
import React, {useEffect, useState} from 'react';
import {withTranslation} from '../i18n';
import {Card, createStyles, Grid, makeStyles, Theme, Typography,} from '@material-ui/core';
import Layout from '../components/Layout';
import {apis} from '../services/apis';
import {useSnackbarContext} from '../contexts/SnackbarContext';
import {Categories, Memories} from '../types';
import {NextPage} from 'next';
import Head from 'next/head';
import CardContent from "@material-ui/core/CardContent";
import ReportedMemoryCard from "../components/ReportedMemoryCard";

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
interface IReportedMemory {
    t(key: string, opts?: any): string;
    categories: Categories;
    isLogged: boolean;
    isAdmin: boolean;
}

const ReportedMemory: NextPage<IReportedMemory & any> = ({
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

    useEffect(() => {
        if (!isLogged || !isAdmin) {
            window.location.href =
                process.env.BACK_URL! + process.env.LOGIN_URL!;
        } else {
            getAllCategories();
            getAllReportedMemories();
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
                                {t('emptyReportedMemoryList')}
                                <br />
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

    return (
        <div>
            {isLogged && isAdmin ? (
                <div>
                    <Head>
                        <title>Reported Memories</title>
                    </Head>

                    <Layout>
                        <Typography variant="h6" gutterBottom>
                            {t('title')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {t('description')}
                        </Typography>

                        <form noValidate autoComplete="false">
                            <Grid container spacing={2}>
                                {displayReportedMemories()}
                            </Grid>
                        </form>

                    </Layout>
                </div>
            ) : null}
        </div>
    ); //TODO : edit or remove cat, display confirmation window with string to enter
};

// --- POPULATE PAGE ---
ReportedMemory.getInitialProps = async (ctx: any) => {
    return {namespacesRequired: ['common', 'reportedMemories'],};
};

export default withTranslation('reportedMemories')(ReportedMemory as any);
