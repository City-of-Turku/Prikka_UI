/**
 * Language Menu
 * Used in CustomAppBar
 * Change language to EN, FI or SV
 * Store cookie in browser automaticaly
 */

// --- IMPORTS ---
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withTranslation } from '../i18n';

// --- Component ---
const LanguageMenu = ({ t, i18n }) => {
    //states
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<string>(i18n.language);

    //Vars
    const options: any[] = [
        { key: 'en', value: 'English' },
        { key: 'fi', value: 'Suomi' },
        { key: 'sv', value: 'Svenska' },
    ];
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleChangeLanguage = (option) => {
        i18n.changeLanguage(option.key);
        setSelectedIndex(option.key);
        handleToggle();
    };
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

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

    return (
        <div>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                aria-label="Change language"
                //startIcon={<TranslateIcon />}
                endIcon={<ExpandMoreIcon />}
            >
                {selectedIndex}
            </Button>
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
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {options.map((option) => (
                                        <MenuItem
                                            key={option.key}
                                            selected={
                                                option.key === selectedIndex
                                            }
                                            onClick={() =>
                                                handleChangeLanguage(option)
                                            }
                                        >
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default withTranslation('common')(LanguageMenu as any);
