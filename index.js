const express = require('express')
const app = express()
require('dotenv').config()
// import library cors
const cors = require('cors');
app.use(cors());
// import body parser
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/**
 * ROUTES
 */

// import route quiz
const quiz = require('./routes/quiz');
app.use('/api/quizzes', quiz); // use route quiz
// import route article
const article = require('./routes/article');
app.use('/api/articles', article); // use route article
// import route sundanese
const sundanese = require('./routes/sundanese');
app.use('/api/sundaneses', sundanese); // use route sundanese
// import route javanese
const javanese = require('./routes/javanese');
app.use('/api/javaneses', javanese); // use route javanese
const auth = require('./routes/auth');
app.use('/api/auth', auth); // use route auth
const content = require('./routes/content');
app.use('/api/contents', content); // use route content




const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})