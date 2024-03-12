**Frontend ENV file**
VITE_API_URL = http://192.168.1.56:4500/api/  // backend url
VITE_OAUTH_CLIENTID = "************************************************************************" // your google client id

**Backend ENV file**
PORT=4500 // backend hosted port
MONGO_URL=mongodb://0.0.0.0:27017/MarsEMS // locally hosted mongo
WEB_TOKEN_SECRET=hdjfhsdufgerg57yfbskdfaadhbfsdjf // used for jwt verification

**Instructions**
Make sure your node version is v18 or above.
1. Once you clone the project, just go into server and client folders and do 'npm install' to install required dependencies for both folders.
2. To run backend, please type 'npm run start:dev'. This will run the backend on your system.
3. For frontend, please type 'npm run dev' and this will run the react frontend for you (make sure ENV files are initiated by you)
4. Also, to sign in you have to make sure you have attached the oauth client ID in react as in the ENV above and the google credential JSON in the backend root folder. If you don't have those, we can provide ours separately.
