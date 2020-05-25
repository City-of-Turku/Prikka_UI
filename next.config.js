require('dotenv').config();

module.exports = {
    env: {
        // Reference a variable that was defined in the .env file and make it available at Build Time
        REACT_APP_MAPBOX_TOKEN: process.env.REACT_APP_MAPBOX_TOKEN,
        FRONT_URL: process.env.FRONT_URL,
        BACK_URL: process.env.BACK_URL,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        IMAGE_UPLOAD_PATH: process.env.IMAGE_UPLOAD_PATH,
    },
};
