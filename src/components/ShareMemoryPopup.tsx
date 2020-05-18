import React from 'react';
import Button from '@material-ui/core/Button';
import Popup from "reactjs-popup";
import ShareSharpIcon from "@material-ui/icons/ShareSharp";
import {Divider, Grid, Typography} from "@material-ui/core";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton, TwitterIcon, TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";

interface IShareMemoryPopup {
    shareMemoryUrl: string;
    shareMemoryTitle: string;
}
const ShareMemoryPopup: React.FC<IShareMemoryPopup> = ({
    shareMemoryUrl,
    shareMemoryTitle
}) => {

    return (
        <div>
            <Popup
                trigger={
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShareSharpIcon />}
                    >
                        Share
                    </Button>
                }
                modal
            >
                <div>
                    <Typography variant="h4">
                        Share this memory on social media
                    </Typography>
                    <Divider />

                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Grid item>
                            <EmailShareButton
                                url={shareMemoryUrl}
                                body={shareMemoryTitle}
                            >
                                <EmailIcon size={50} round />
                            </EmailShareButton>
                        </Grid>
                        <Grid item>
                            <WhatsappShareButton
                                url={shareMemoryUrl}
                                title={shareMemoryTitle}
                            >
                                <WhatsappIcon size={50} round />
                            </WhatsappShareButton>
                        </Grid>
                        <Grid item>
                            <FacebookShareButton
                                url={shareMemoryUrl}
                                quote={shareMemoryTitle}
                            >
                                <FacebookIcon size={50} round />
                            </FacebookShareButton>
                        </Grid>
                        <Grid item>
                            <TwitterShareButton
                                url={shareMemoryUrl}
                                title={shareMemoryTitle}
                            >
                                <TwitterIcon size={50} round />
                            </TwitterShareButton>
                        </Grid>
                    </Grid>
                </div>
            </Popup>

        </div>
    );
};

export default ShareMemoryPopup;
