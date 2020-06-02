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
    Grid,
} from '@material-ui/core';

// --- COMPONENT ---
const Footer: React.FC = () => {
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
                    Tietoa palvelusta <br />
                    Saavutettavuusseloste
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
