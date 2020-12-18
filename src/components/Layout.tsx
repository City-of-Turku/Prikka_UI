/**
 * Page layout
 * Apply custom style to children pages
 * Used for text pages
 */

// --- IMPORTS ---
import React, { ReactNode } from 'react';
import Footer from './Footer';
import { Divider } from '@material-ui/core';
// --- STYLES ---
const pageStyle = {
    width: '80%',
    margin: '20px auto',
    paddingTop: '100px',
};

// --- COMPONENTS ---
const Layout: React.FC<ReactNode> = ({ children }) => {
    return (
        <div>
            <div className="wrapper" style={pageStyle}>
                {/* Component to nest */}
                {children}
            </div>

            <div style={{ height: '5vh' }} />
            <Divider />
            <Footer />
        </div>
    );
};

export default Layout;
