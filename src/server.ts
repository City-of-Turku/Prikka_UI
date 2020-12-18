/**
 * Custom server
 * We cannot use nextJS default server
 * because we require nextI18Next middleware
 */

// --- IMPORTS ---
import compression from 'compression';
import express from 'express';
import next from 'next';
import nextI18NextMiddleware from 'next-i18next/middleware';
import nextI18next from './i18n';
import dotenv from 'dotenv';
import {
    createProxyMiddleware,
    Filter,
    Options,
    RequestHandler,
} from 'http-proxy-middleware';

// --- CONFIG ---
dotenv.config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// --- SERVER ---
app.prepare()
    .then(() => {
        //Init
        const server = express();

        //Middlewares
        server.use(
            '/api',
            createProxyMiddleware({
                target: process.env.BACK_URL,
                changeOrigin: true,
                secure: false,
            }),
        );
        server.use(nextI18NextMiddleware(nextI18next));
        server.use(compression());

        //Routes
        // handle any other requests
        server.get('*', (req, res) => {
            handle(req, res);
        });

        server.listen(process.env.PORT, (err) => {
            console.log(`> Ready on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
