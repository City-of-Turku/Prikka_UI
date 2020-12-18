// --- IMPORTS ---
import React, { useEffect } from 'react';
import Router from 'next/router';
import { withTranslation } from '../i18n';
import {
    Button,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
    ClickAwayListener,
    Grid, Typography,
} from '@material-ui/core';

// --- COMPONENT ---
const Footer: React.FC = () => {

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
                    <Typography variant="body1" gutterBottom onClick={handleServiceInfoClick}>
                        Tietoa palvelusta
                    </Typography>
                    <Typography variant="body1" gutterBottom onClick={handleAccessibilityStatementClick}>
                        Saavutettavuusseloste
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
