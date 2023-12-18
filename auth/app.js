import express from 'express';
import dbConnection from './config/dbConnection.js';
import routes from './routes/routes.js';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
// Cors
app.use(cors());
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * ROUTES
 */

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/auth', routes);
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message,
    });
});


dbConnection
    .getConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(`Failed to connect to the database: ${err.message}`);
    });
