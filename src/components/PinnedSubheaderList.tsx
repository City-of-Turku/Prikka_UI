/**
 * List all memories in a list
 * Li are clickable elements
 * Appears on home page
 */

// --- IMPORTS ---
import React from 'react';
import { Memories, Memory, Categories } from '../types';
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Paper,
    Grid,
} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CategorySelect from './CategorySelect';

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
    }),
);

interface IPinnedSubheaderList {
    t(key, opts?): Function;
    memories: Memories;
    handleSelectMemory(memory: Memory): void;
    categories: Categories;
    handleCategoryFilterChange(categoryId: string): void;
}
// --- COMPONENT ---
const PinnedSubheaderList: React.FC<IPinnedSubheaderList> = ({
    t,
    memories,
    handleSelectMemory,
    categories,
    handleCategoryFilterChange,
}) => {
    //Contexts
    const classes = useStyles();

    //Functions
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
                <ListItem
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
                                generateMemoryList()
                            ) : (
                                <ListItem>
                                    <ListItemText
                                        primary={t('error')}
                                        secondary={t('noMemoriesFound')}
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
