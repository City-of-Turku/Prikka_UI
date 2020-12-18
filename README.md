# Prikka application
The Prikka application is used for gathering memories, events and stories about the City of Turku. The application consists of prikka_backend and prikka_ui.  

This project was started and mainly done as a Capstone-project at Turun AMK. The first version of the Prikka application is not optimized for mobile use.

## Frontend

Uses React with typescript. 
Created with next.js v9.44.

### Setup
Setting up a development environment.  

Be sure to have the backend server & database running before starting the frontend.

1. Clone repo

2. Install node dependencies.

    ```
    npm install
    ```

4. Make sure you have nodemon installed  
   ```
   npm install nodemon -g
   ```

5. You will also need a .env file   
    Mapbox token info here: https://docs.mapbox.com/help/how-mapbox-works/access-tokens/

    Example .env file, for local development
    ```
    REACT_APP_MAPBOX_TOKEN=
    FRONT_URL=http://localhost:3000
    BACK_URL=http://localhost:4500
    LOGIN_URL=/api/auth-management/login
    LOGOUT_URL=/api/auth-management/logout
    PORT=3000
    ```

6. Start it      
   
   #### Local development
   
   ```
   npm run dev
   ```
    Runs the app in the development mode.  
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  

   #### Production
   ```
    npm run build
    npm run prod
   ```
    Builds the app for production to the `/build` folder.  
    It correctly bundles NextJS in production mode and optimizes the build for the best performance.
    Also transpile the Typescript into Javascript  
    The build is minified and the filenames include the hashes.
