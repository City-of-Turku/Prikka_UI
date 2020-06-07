/**
 * Display a panel containing informations
 * when memory is selected
 * Appears on home page
 */

// --- IMPORTS ---
import React from 'react';
import Moment from 'react-moment';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    Button,
    createMuiTheme,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    MuiThemeProvider,
    Paper,
    Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';

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
            margin: theme.spacing(1),
        },
    }),
);

const redTheme = createMuiTheme({ palette: { primary: red } });
const blueTheme = createMuiTheme({ palette: { primary: blue } });

interface IMemoryDetails {
    t(key, opts?): Function;
    handleUnselectMemory(): void;
    selectedMemory: Memory;
}

// component
function Photo(props) {
    console.log(props);
    const photo = JSON.parse(props.photo);
    if (photo) {
        return (
            <ListItem>
                <img src={`${process.env.BACK_URL}/uploads/${photo.filename}`}/>
            </ListItem>
            )
    }
    return (
        <ListItem>
            <img src={`/images/placeholder_small.jpg`}/>
        </ListItem>
    )
}

// --- COMPONENT ---
const MemoryDetails: React.FC<IMemoryDetails> = ({
    t,
    handleUnselectMemory,
    selectedMemory,
}) => {
    const classes = useStyles();
    const shareUrl = `${process.env.FRONT_URL}/?memory=${selectedMemory.id}`;
    const shareTitle = 'Check out this memory at Prikka';

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

                {/*TODO : add picture */}
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
                    <Typography variant="body2" align="left">
                        {selectedMemory.description}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Photo photo={selectedMemory.photo}></Photo>
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <MuiThemeProvider theme={redTheme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<FavoriteSharpIcon />}
                                >
                                    Favorite
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                        <Grid item>
                            <ShareMemoryPopup shareMemoryUrl={shareUrl} shareMemoryTitle={shareTitle} />
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
