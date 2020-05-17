/**
 * Custom App component
 * Initialize once when website is reached
 *
 * Allows to do things such as :
 * - Persisting layout between page changes
 * - Keeping state when navigating pages
 * - Custom error handling using componentDidCatch
 * - Inject additional data into pages
 * - Add global CSS
 */

// --- IMPORTS ---
import React from 'react';
import App, { AppContext } from 'next/app';
import { appWithTranslation } from '../i18n';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import { SnackbarProvider } from '../contexts/SnackbarContext';
import CustomAppBar from '../components/CustomAppBar';
import { apis, setCookies } from '../services/apis';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles.css';

// --- COMPONENT ---
const MyApp = ({ Component, pageProps }) => {
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <AuthProvider
                    isLogged={pageProps.isLogged}
                    isAdmin={pageProps.isAdmin}
                >
                    {/* Allow global snackbar */}
                    <SnackbarProvider>
                        {/* Menu appbar */}
                        <CustomAppBar {...pageProps} />
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        {/* Page Component */}
                        <Component {...pageProps} />
                    </SnackbarProvider>
                </AuthProvider>
            </ThemeProvider>
        </React.Fragment>
    );
};

// --- INITIAL DATA POPULATION ---
MyApp.getInitialProps = async (appContext: AppContext) => {
    //Get context
    const appProps = await App.getInitialProps(appContext);
    const ctx = appContext.ctx;

    //get cookies and set them in axios headers
    if (ctx.req) {
        const cookie = ctx.req.headers.cookie;
        if (cookie) {
            setCookies(cookie);
        }
        console.log('Cookie:', cookie);
    }

    //Check if user is logged and admin
    let isLogged: boolean = false;
    let isAdmin: boolean = false;

    await apis.auth
        .isLogged()
        .then((res) => {
            isLogged = res.data.isLogged;
            isAdmin = res.data.isAdmin;
            //console.log('User logged : ', isLogged);
            //console.log('User admin : ', isAdmin);
        })
        .catch((err) => console.error('Error getting user permissions', err));

    //TODO : check if admin

    //Adding variable to props
    appProps.pageProps['isLogged'] = isLogged;
    appProps.pageProps['isAdmin'] = isAdmin;

    return { ...appProps };
};

export default appWithTranslation(MyApp as any);
