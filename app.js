const express = require('express');
const app = express();
const port = 4000;
const accountRouter = require('./routes/accountRoutes');
const db = require('./util/database');
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors())
app.use('/account', accountRouter);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
});