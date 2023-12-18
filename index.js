const express = require('express')
const app = express()
// import library cors
const cors = require('cors');
app.use(cors());
// import body parser
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const auth = require('./routes/auth')
app.use('/api/auth', auth); // use route auth

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})