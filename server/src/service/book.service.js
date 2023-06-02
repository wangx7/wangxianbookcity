const connection = require('../app/database');

class BookService {
    async create({ labelId, bookName, bookHref, coverHref, blurb, author, createUserId }) {
        const statement = `INSERT INTO book (labelId, bookName, bookHref, coverHref, blurb, author, createUserId) VALUES (?,?,?,?,?,?,?);`;
        const [result] = await connection.execute(statement, [labelId, bookName, bookHref, coverHref, blurb, author, createUserId]);
        return result;
    }

    async getBooks(offset, limit) {
        const statement = `SELECT * FROM book LIMIT ?, ?;`;
        const [result] = await connection.execute(statement, [offset, limit]);
        return result;
    }
}

module.exports = new BookService();
