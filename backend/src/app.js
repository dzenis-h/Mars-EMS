
//config env file
require('dotenv').config()
const express = require('express');
const { ApplicationRouting } = require('./api');
require('./database/connection')
const app = express();
//configure routing 
ApplicationRouting(app)

//new server
const port = process.env.PORT || 4949;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
