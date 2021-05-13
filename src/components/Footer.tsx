// --- IMPORTS ---
import React from 'react';
import Router from 'next/router';
import {Button, Grid,} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    buttonLink: {
        fontSize: "16px",
        fontWeight: 400,
        textTransform: "none",
        padding: "0px"
    }
});

const Footer: React.FC = () => {

    const classes = useStyles();
    const handleServiceInfoClick = (event: React.MouseEvent<EventTarget>) => {
        Router.push('/service_info');
    };
    const handleAccessibilityStatementClick = (event: React.MouseEvent<EventTarget>) => {
        Router.push('/accessibility_statement');
    };

    return (
        <div style={{ padding: '24px 24px' }}>
            <Grid container direction="row">
                <Grid item xs={3}>
                    <a href="https://www.turku.fi/museo" target={"_blank"}>Turun museokeskus</a>
                    <br /><br />
                    All rights reserved. Copyright ©{new Date().getFullYear()}{' '}
                    Museum of Turku.
                </Grid>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        onClick={handleServiceInfoClick}
                        className={classes.buttonLink}
                        style={{ backgroundColor: 'transparent' }}>
                        Tietoa palvelusta
                    </Button>
                    <br/>
                    <Button
                        onClick={handleAccessibilityStatementClick}
                        className={classes.buttonLink}
                        style={{ backgroundColor: 'transparent' }}>
                        Saavutettavuusseloste
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
