/**
 * Mymemories Page
 * User see his memories
 * Restricted, only is logged
 */

// --- IMPORTS ---
import React, {useEffect, useState} from 'react';
import {withTranslation} from '../i18n';
import {Card, Grid, Typography} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

import Layout from '../components/Layout';
import MemoryCard from '../components/MemoryCard';

import {Categories, Memories} from '../types';
import {apis} from '../services/apis';
import {NextPage} from 'next';
import Head from 'next/head';
import {useSnackbarContext} from '../contexts/SnackbarContext';

// --- COMPONENT ---
interface IMyMemories {
    t(key: string, opts?): string;
    categories: Categories;
    isLogged: boolean;
}
const MyMemories: NextPage<IMyMemories & any> = ({ t, categories, isLogged }) => {
    const snackbarContext = useSnackbarContext();

    const [userMemories, setUserMemories] = useState<Memories | null>(null);

    const getUserMemories = async () => {
        let tempMemories: Memories;
        await apis.memories
            .getUserMemories()
            .then((res) => {
                tempMemories = res.data;
                console.log('memories fetched: ', tempMemories.count);
                setUserMemories(tempMemories);
            })
            .catch((err) => {
                console.error('Error fetching memories', err);
            });
    };

    const handleDeleteMemory = (index: number, memoryId: number) => {
        apis.memories
            .deleteMemoryById(memoryId)
            .then((res) => {
                getUserMemories();
                snackbarContext.displaySuccessSnackbar('Muisto poistettu');
            })
            .catch((err) => {
                snackbarContext.displayErrorSnackbar('Muiston poistossa tapahtui virhe');
            });
    };

    const displayMemories = () => {
        let component;

        if (userMemories === null || userMemories.count === 0) {
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
            component = userMemories.rows.map((memory, index) => {
                return (
                    <Grid key={index} item xs={4}>
                        <MemoryCard
                            t={t}
                            handleDeleteMemory={() =>
                                handleDeleteMemory(index, memory.id)
                            }
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
    useEffect(() => {
        if (!isLogged) {
            window.location.href = process.env.BACK_URL + process.env.LOGIN_URL;
        } else {
            getUserMemories();
        }
    }, []);

    return (
        <div>
            {isLogged ? (
                <div>
                    <Head>
                        <title>My Memories</title>
                    </Head>
                    <Layout>
                        <Typography variant="h4" gutterBottom>
                            {t('title')}
                        </Typography>
                        <div>
                            <Typography variant="body1" gutterBottom>
                                {t('description')}
                            </Typography>
                            <br />
                        </div>

                        <Grid container spacing={3}>
                            {displayMemories()}
                        </Grid>
                    </Layout>
                </div>
            ) : null}
        </div>
    );
};

// --- POPULATE PAGE ---
MyMemories.getInitialProps = async (ctx: any) => {
    let categories: Categories = null;
    await apis.categories
        .getAllCategories()
        .then((res) => {
            categories = res.data.categories;
        })
        .catch((err) => console.error('Error fetching categories'));
    return {
        namespacesRequired: ['common', 'myMemories'],
        categories: categories,
    };
};

export default withTranslation('myMemories')(MyMemories as any);
