const express = require('express');
const app = express();
require('express-async-errors');
const connectDB = require('./db/connect');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const booksRouter = require('./routes/books');
const userRouter = require('./routes/users');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
// 673652a8376722ee86fc8abc

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
});

app.use('/api/v1/books', booksRouter);
app.use('/api/v1/users', userRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        const connection = await connectDB(process.env.MONGO_URI);
        if (!connection) {
            console.log(`Connection error: ${connection}`);
            return;
        }
        app.listen(port, () =>
            console.log(`Server running on: http://127.0.0.1:${port}`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
