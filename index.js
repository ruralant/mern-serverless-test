const express = require('express');
const Webtask = require('webtask-tools');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./middlewares/db').connectDisconnect);
require('./routes/tasks')(app);

// export a function created from the Express app
module.exports = Webtask.fromExpress(app);