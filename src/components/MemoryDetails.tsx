/**
 * Display a panel containing informations
 * when memory is selected
 * Appears on home page
 */

// --- IMPORTS ---
import React from 'react';
import Moment from 'react-moment';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
    List,
    ListItem,
    Divider,
    Typography,
    Button,
    Paper,
    IconButton,
    Grid,
    createMuiTheme,
    MuiThemeProvider,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ShareSharpIcon from '@material-ui/icons/ShareSharp';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';

import { Memory } from '../types';
import { red, blue } from '@material-ui/core/colors';
import ReportDialog from './ReportDialog';

import Popup from 'reactjs-popup';
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share';
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
    handleUnselectMemory(): void;
    selectedMemory: Memory;
}

// component
function Photo(props) {
    console.log(props)
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
    handleUnselectMemory,
    selectedMemory,
}) => {
    const classes = useStyles();
    const shareUrl = `${process.env.FRONT_URL}/?memory=${selectedMemory.id}`;
    const shareTitle = 'Check out this memory at Prikka';
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
                    <Typography variant="h3">{selectedMemory.title}</Typography>
                </ListItem>

                <ListItem alignItems="flex-start">
                    <Typography variant="subtitle1">
                        <Moment fromNow>{selectedMemory.createdAt}</Moment>
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
