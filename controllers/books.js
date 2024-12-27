const Book = require('../models/Book');
const { customError } = require('../errors/customError');

const getStaticBooks = async (req, res) => {
    const { numericFilters } = req.query;
    const queryObject = {};
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };

        const regEx = /\b(>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );

        // console.log(filters);
        const options = [
            'price',
            'rating',
            'price_excl_tax',
            'price_incl_tax',
            'tax',
            'availability',
            'reviews',
        ];
        filters = filters.split(',').forEach((filter) => {
            const [field, operator, value] = filter.split('-');
            if (options.includes(field)) {
                console.log(field, operator, value);
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    // console.log(queryObject);

    const books = await Book.find(queryObject).limit(10);
    res.status(200).json(books);

    // res.send('hello');
};

const getBooks = async (req, res) => {
    const { title, category, sort, fields, numericFilters } = req.query;

    const queryObject = {};
    if (title) {
        queryObject.title = { $regex: title, $options: 'i' };
    }
    if (category) {
        queryObject.category = category;
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };

        const regEx = /\b(>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );

        const options = [
            'price',
            'rating',
            'price_excl_tax',
            'price_incl_tax',
            'tax',
            'availability',
            'reviews',
        ];
        filters = filters.split(',').forEach((filter) => {
            const [field, operator, value] = filter.split('-');
            if (options.includes(field)) {
                // console.log(field, operator, value);
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    let result = Book.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * 20;

    result = result.skip(skip).limit(limit);

    // result = result.limit(10);
    const books = await result;
    res.status(200).json(books);
};

const getBook = async (req, res) => {
    const { bookID } = req.params;
    const book = await Book.findOne({ _id: bookID });
    if (!book) {
        throw customError(`book with ID: ${bookID} not found!`, 404);
    }
    res.status(201).json(book);
};

module.exports = {
    getBooks,
    getBook,
    getStaticBooks,
};
