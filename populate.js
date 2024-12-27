require('dotenv').config();
const connectDB = require('./db/connect');
const Book = require('./models/Book');
const books = require('./data/books.json');

const mongo_url = process.env.MONGO_URI;

const start = async () => {
    try {
        await connectDB(mongo_url);
        await Book.deleteMany();
        await Book.create(books);
        console.log('books inserted successfully.');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
