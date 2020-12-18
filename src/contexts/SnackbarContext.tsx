/**
 * Snackbar Context
 * Globally available snackbars
 * 4 types :
 *  - Info, Success, Warning, Error
 */

// --- IMPORTS ---
import React, { useState, ReactNode } from 'react';
import MuiAlert, { Color, AlertProps } from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

interface SnackbarContextInterface {
    displaySuccessSnackbar(newMessage: string): void;
    displayInfoSnackbar(newMessage: string): void;
    displayWarningSnackbar(newMessage: string): void;
    displayErrorSnackbar(newMessage: string): void;
}
// --- CONTEXT ---
const SnackbarContext = React.createContext<
    SnackbarContextInterface | undefined
>(undefined);

// --- HOOK ---
export const useSnackbarContext = () => {
    const c = React.useContext(SnackbarContext);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
};

// --- SNACKBAR CONTENT ---
const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

// --- PROVIDER ---
export const SnackbarProvider: React.FC<ReactNode> = props => {
    //States
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<Color>('error');

    //Functions
    const openSnackbar = (newMessage: string, newSeverity: Color) => {
        setOpen(true);
        setMessage(newMessage);
        setSeverity(newSeverity);
    };

    const displaySuccessSnackbar = (newMessage: string) => {
        openSnackbar(newMessage, 'success');
    };
    const displayInfoSnackbar = (newMessage: string) => {
        openSnackbar(newMessage, 'info');
    };
    const displayWarningSnackbar = (newMessage: string) => {
        openSnackbar(newMessage, 'warning');
    };
    const displayErrorSnackbar = (newMessage: string) => {
        openSnackbar(newMessage, 'error');
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <SnackbarContext.Provider
            value={{
                displayInfoSnackbar,
                displayWarningSnackbar,
                displaySuccessSnackbar,
                displayErrorSnackbar,
            }}
        >
            {props.children}
            {/* Add one snackbar to component tree */}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
