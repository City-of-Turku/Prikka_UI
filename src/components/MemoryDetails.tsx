/**
 * Display a panel containing informations
 * when memory is selected
 * Appears on home page
 */

// --- IMPORTS ---
import React from 'react';
import Moment from 'react-moment';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {createMuiTheme, Divider, Grid, IconButton, List, ListItem, Paper, Table,
    TableCell,
    TableRow,
    Typography,} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {Memory} from '../types';
import {blue, red} from '@material-ui/core/colors';
import ReportDialog from './ReportDialog';
import ShareMemoryPopup from "./ShareMemoryPopup";

// --- STYLES ---
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            height: '100%',
            position: 'absolute',
            top: '100px',
            borderRadius: '8px',
            marginLeft: theme.spacing(4),
            overflow: 'auto',
            maxHeight: 550,
        },
        buttonBack: {
            margin: theme.spacing(1)
        },
        customDescription: {
            whiteSpace: 'pre-line'
        },
        customPhotoInfoTable: {
            "& .MuiTableCell-root": {
                padding: "3px 0px 3px 3px",
                borderBottom : '0px'
            }
        }
    }),
);

const redTheme = createMuiTheme({ palette: { primary: red } });
const blueTheme = createMuiTheme({ palette: { primary: blue } });

interface IMemoryDetails {
    t(key, opts?): Function;
    handleUnselectMemory(): void;
    selectedMemory: Memory;
    isAdmin: boolean;
}

// --- COMPONENT ---
const MemoryDetails: React.FC<IMemoryDetails> = ({
    t,
    handleUnselectMemory,
    selectedMemory,
    isAdmin
}) => {
    const classes = useStyles();
    const shareUrl = `${process.env.FRONT_URL}/?memory=${selectedMemory.id}`;
    const shareTitle = 'Check out this memory at Prikka';

    const showPhoto = () => {
        const photo = JSON.parse(selectedMemory.photo);
        if (photo) {
            return (
                <ListItem>
                    <img src={`${process.env.BACK_URL}/uploads/${photo.filename}`}/>
                </ListItem>
            )
        }
        return null;
    };

    const showPhotoInfo = () => {
        const photo = JSON.parse(selectedMemory.photo);
        const sharePhotoInfo = selectedMemory.sharePhotoInfo;
        if (photo && (sharePhotoInfo || isAdmin)) {
            return (
                <ListItem alignItems="flex-start">
                    <Table className={classes.customPhotoInfoTable}>
                        <TableRow>
                            <TableCell>{t('photographer')}:</TableCell>
                            <TableCell>{selectedMemory.photographer}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{t('whenIsPhotoTaken')}:</TableCell>
                            <TableCell>{selectedMemory.whenIsPhotoTaken}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{t('whereIsPhotoTaken')}:</TableCell>
                            <TableCell>{selectedMemory.whereIsPhotoTaken}</TableCell>
                        </TableRow>
                    </Table>
                </ListItem>
            )
        }
        return null;
    };

    function showUserDisplayName2() {
        if(selectedMemory.User){
            return (selectedMemory.User.displayName);
        }
        return (<>{t('anonymous')}</>);
    };

    return (
        <Paper elevation={4} className={classes.root}>
            <List>
                <ListItem alignItems="flex-start">
                    <IconButton
                        aria-label="previous"
                        className={classes.buttonBack}
                        onClick={handleUnselectMemory}
                        color="secondary"
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </ListItem>

                <ListItem alignItems="flex-start">
                    <Typography variant="h5">{selectedMemory.title}</Typography>
                </ListItem>

                <ListItem alignItems="flex-start">
                    <Typography variant="subtitle1">
                        <Moment fromNow>{selectedMemory.createdAt}</Moment> / {showUserDisplayName2()}
                    </Typography>
                </ListItem>
                <Divider variant="fullWidth" component="li" />

                <ListItem alignItems="flex-start">
                    <Typography variant="body2" className={classes.customDescription}>
                        {selectedMemory.description}
                    </Typography>
                </ListItem>
                {showPhoto()}
                {showPhotoInfo()}

                <Divider variant="fullWidth" component="li" />
                <ListItem>
                    <Grid container justify="center" spacing={2}>
                        {/*<Grid item>*/}
                        {/*    <MuiThemeProvider theme={redTheme}>*/}
                        {/*        <Button*/}
                        {/*            variant="contained"*/}
                        {/*            color="primary"*/}
                        {/*            startIcon={<FavoriteSharpIcon />}*/}
                        {/*        >*/}
                        {/*            Favorite*/}
                        {/*        </Button>*/}
                        {/*    </MuiThemeProvider>*/}
                        {/*</Grid>*/}
                        <Grid item>
                            <ShareMemoryPopup t={t} shareMemoryUrl={shareUrl} shareMemoryTitle={shareTitle} />
                        </Grid>
                    </Grid>
                    <ReportDialog memory={selectedMemory} />
                </ListItem>
            </List>
        </Paper>
    );
};
//<ReportModal /> TODO

export default MemoryDetails;
