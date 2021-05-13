/**
 * List all memories in a list
 * Li are clickable elements
 * Appears on home page
 */

// --- IMPORTS ---
import React from 'react';
import {Categories, Memories, Memory} from '../types';
import {Grid, List, ListItem, ListItemText, ListSubheader, Paper,} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CategorySelect from './CategorySelect';
import {Pagination} from '@material-ui/lab';

// --- STYLES ---
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: '8px',
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            position: 'absolute',
            top: '100px',
            marginLeft: theme.spacing(4),
            overflow: 'auto',
            maxHeight: 550,
        },
        pagination: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
        list: {},
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
        subheader: {
            paddingLeft: '0px',
            paddingRight: '0px',
            textAlign: 'center',
        },
        memoryItem: {
            "& .MuiListItemText-root": {
                marginTop: "0px",
                marginBottom: "0px"
            }
        }
    }),
);

interface IPinnedSubheaderList {
    t(key, opts?): Function;
    memories: Memories;
    handleSelectMemory(memory: Memory): void;
    categories: Categories;
    handleCategoryFilterChange(categoryId: string): void;
    handlePageFilterChange(page: number): void;
}
// --- COMPONENT ---
const PinnedSubheaderList: React.FC<IPinnedSubheaderList> = ({
    t,
    memories,
    handleSelectMemory,
    categories,
    handleCategoryFilterChange,
    handlePageFilterChange,
}) => {
    //Contexts
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        handlePageFilterChange(value);
    };

    //    // TODO This does not help for the refresch of selected page when changing category
    //    const handleCategoryFilterChangeTmp = (categoryId: string) => {
    //        setPage(1);
    //        handleCategoryFilterChange(categoryId);
    //        handlePageFilterChange(page);
    //    };

    //Functions
    const getCount = () => {
        return Math.ceil(((memories.count) / 10));
    };

    const handleClickListItem = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
    ): void => {
        handleSelectMemory(memories['rows'][index]);
    };

    const generateMemoryList = () => {
        return memories['rows'].map((memory, index) => {
            let content: string;

            if (memory.description.length > 100) {
                content = memory.description!.slice(0, 100) + '...';
            } else {
                content = memory.description;
            }

            return (
                <ListItem className={classes.memoryItem}
                    button
                    key={memory.id}
                    onClick={(event) => handleClickListItem(event, index)}
                >
                    <ListItemText primary={memory.title} secondary={content} />
                </ListItem>
            );
        });
    };

    return (
        <Paper elevation={4} className={classes.root}>
            {/* Header */}
            <List subheader={<li />}>
                {[0].map((sectionId) => (
                    <li
                        key={`section-${sectionId}`}
                        className={classes.listSection}
                    >
                        <ul className={classes.ul}>
                            <ListSubheader className={classes.subheader}>
                                <Paper>
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Grid item xs={6}>
                                            {t('recentMemories')}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CategorySelect
                                                t={t}
                                                selectedCategoryId={null}
                                                categories={categories}
                                                handleCategoryFilterChange={
                                                    handleCategoryFilterChange
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </ListSubheader>

                            {/* List or error message */}
                            {memories ? (
                                <div className={classes.pagination}>
                                    {/* <Typography>Debug:  Page: {page}  Amount: {memories.count}</Typography> */}
                                    <Pagination count={getCount()} page={page} onChange={handlePageChange} size="small"/>
                                    {generateMemoryList()}
                                </div>
                            ) : (
                                <ListItem>
                                    <ListItemText
                                        primary={t('noMemoriesFound')}
                                        secondary={t('noMemoriesFoundDescription')}
                                    />
                                </ListItem>
                            )}
                        </ul>
                    </li>
                ))}
            </List>
        </Paper>
    );
};
export default PinnedSubheaderList;
