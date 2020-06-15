/**
 * Index  / Home Page
 * Contains :
 * - Map  (MapboxContainer)
 * - list of most recent memories (PinnedSubheaderList)
 */

// --- IMPORTS ---
import React, {useEffect, useState} from 'react';
import {apis} from '../services/apis';
import {withTranslation} from '../i18n';
import {Categories, Memories, Memory} from '../types';
import {NoSsr} from '@material-ui/core';
import MapboxContainer from '../components/MapboxContainer';
import PinnedSubheaderList from '../components/PinnedSubheaderList';
import MemoryDetails from '../components/MemoryDetails';
import {useSnackbarContext} from '../contexts/SnackbarContext';
import Head from 'next/head';
import {NextPage} from 'next';
import {useRouter} from 'next/router';

// --- COMPONENT ---
interface IIndex {
    t(key: string, opts?: any): string;
    categories: Categories;
    isLogged: boolean;
    selectedMemoryId: string;
}

const Index: NextPage<IIndex & any> = ({
    t,
    categories,
    isLogged,
    selectedMemoryId,
}) => {
    //Contexts
    const snackbarContext = useSnackbarContext();
    const router = useRouter();

    //States
    const [selectedMemory, setSelectedMemory] = useState<Memory>(null);

    const [memories, setMemories] = useState<Memories>();
    const [categoryId, setCategoryId] = useState<string>('');
    const [page, setpage] = useState<number>(1);
    const [amount, setAmount] = useState<number>(0);

    let queryString = '';

    //functions
    const handleSelectMemory = (memory: Memory) => {
        setSelectedMemory(memory);
        queryString = `/?memory=${memory.id}`;
        router.replace(queryString, queryString, { shallow: true });
    };
    const handleUnselectMemory = () => {
        setSelectedMemory(null);
        router.replace('/', '/', { shallow: true });
    };

    const handlePageFilterChange = (page: number) => {
        setpage(page);
        getMemories(page, categoryId);
    };

    const handleCategoryFilterChange = (categoryIdTmp: string) => {
        setCategoryId(categoryIdTmp);
        setpage(1);
        getMemories( page, categoryIdTmp);
    };

    const getMemories = async (page: number, categoryId: string) => {
        apis.memories
            .getAllMemories(page, categoryId)
            .then((res) => {
                let memoriesTmp = res.data;
                setMemories(memoriesTmp);
                setAmount(memoriesTmp.count);
                console.log('Memories fetched: ', memoriesTmp.count);
            })
            .catch((err) => {
                if (categoryId!=null){
                    snackbarContext.displayWarningSnackbar(
                        'No memories in this category',
                    );
                }
                setMemories(null);
                console.error('Error fetching memories', err)
            });
    };

    useEffect(() => {
        if (selectedMemoryId) {
            apis.memories
                .getMemoryById(selectedMemoryId)
                .then((res) => {
                    setSelectedMemory(res.data);
                    console.log('memory loaded');
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            getMemories(1, '');
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            {/* Only rendered client side */}
            <NoSsr>
                <MapboxContainer
                    memories={memories}
                    selectedMemory={selectedMemory}
                    handleSelectMemory={handleSelectMemory}
                />
            </NoSsr>
            {selectedMemory ? (
                <MemoryDetails
                    t={t}
                    selectedMemory={selectedMemory}
                    handleUnselectMemory={handleUnselectMemory}
                />
            ) : (
                <PinnedSubheaderList
                    t={t}
                    memories={memories}
                    handleSelectMemory={handleSelectMemory}
                    categories={categories}
                    handleCategoryFilterChange={handleCategoryFilterChange}
                    handlePageFilterChange={handlePageFilterChange}
                />
            )}
        </div>
    ); //TODO : create placeholder when map loading  <PinnedSubheaderList />
};

// --- POPULATE PAGE ---
/**
 * Fetch memories from back
 */
Index.getInitialProps = async ({ req, query }) => {
    let selectedMemoryId = null;

    if (query) {
        selectedMemoryId = query.memory ? query.memory : null;
    }

    let categories: Categories;
    await apis.categories
        .getAllCategories()
        .then((res) => {
            categories = res.data.categories;

            console.log('Categories fetched: ', categories.length);
        })
        .catch((err) => console.error('Error fetching categories'));

    return {
        namespacesRequired: ['common', 'index'],
        categories,
        selectedMemoryId,
    };
};

export default withTranslation('index')(Index as any);
