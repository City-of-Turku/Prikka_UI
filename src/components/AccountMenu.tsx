/**
 * Account Menu Component
 *
 * Showed when user is logged in
 * Display choice between :
 * - My memories
 * - Settings
 *  - Logout
 */

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
} from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface IAccountMenu {
    t(key, opts?): Function;
    isAdmin: boolean;
}
// --- COMPONENT ---
const AccountMenu: React.FC<IAccountMenu> = ({ t, isAdmin}) => {
    //State
    const [open, setOpen] = React.useState(false);

    //Anchor for menu
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    //Functions
    /**
     * Toggle menu on or off
     */
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    /**
     * Close menu on click
     */
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };

    /**
     * Close menu on tab key down
     */
    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleSettingsClick = (event: React.MouseEvent<EventTarget>) => {
        handleClose(event);
        Router.push('/user_settings');
    };
    const handleMymemoriesClick = (event: React.MouseEvent<EventTarget>) => {
        handleClose(event);
        Router.push('/my_memories');
    };
    const handleReportedMemoriesClick = (event: React.MouseEvent<EventTarget>) => {
        handleClose(event);
        Router.push('/reported_memories');
    };
    const handleAdminClick = (event: React.MouseEvent<EventTarget>) => {
        handleClose(event);
        Router.push('/admin');
    };
    const handleCampaignClick = (event: React.MouseEvent<EventTarget>) => {
        handleClose(event);
        Router.push('/admin_campaigns');
    };

    //TODO Check how this param is sent here
    isAdmin = true;
    return (
        <div id="account-menu">
            {/* Account button */}
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                endIcon={<ExpandMoreIcon />}
            >
                {t('accountmenu.navbar')}
            </Button>
            {/* Popup Menu */}

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                        }}
                    >
                        {/* Content */}

                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleMymemoriesClick}>
                                        {t('accountmenu.mymemories')}
                                    </MenuItem>
                                    {isAdmin ? (
                                        <MenuItem onClick={handleReportedMemoriesClick}>
                                            {t('accountmenu.reportedmemories')}
                                        </MenuItem>
                                    ) : null}
                                    {isAdmin ? (
                                        <MenuItem onClick={handleAdminClick}>
                                            {t('accountmenu.configurations')}
                                        </MenuItem>
                                    ) : null}
                                    {isAdmin ? (
                                        <MenuItem onClick={handleCampaignClick}>
                                            {t('accountmenu.campaigns')}
                                        </MenuItem>
                                    ) : null}
                                    <MenuItem onClick={handleSettingsClick}>
                                        {t('accountmenu.settings')}
                                    </MenuItem>
                                    <MenuItem
                                        component="a"
                                        href={
                                            process.env.BACK_URL +
                                            process.env.LOGOUT_URL
                                        }
                                    >
                                        {t('accountmenu.logout')}
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default withTranslation('common')(AccountMenu as any);
