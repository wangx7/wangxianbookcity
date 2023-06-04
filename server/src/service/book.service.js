const connection = require('../app/database');

class BookService {
    async create({ labelId, bookName, bookHref, coverHref, blurb, author, userId }) {
        console.log(labelId, bookName, bookHref, coverHref, blurb, author, userId);
        const statement = `INSERT INTO book (labelId, bookName, bookHref, coverHref, blurb, author, userId) VALUES (?,?,?,?,?,?,?);`;
        const [result] = await connection.execute(statement, [labelId, bookName, bookHref, coverHref, blurb, author, userId]);
        return result;
    }

    async getBookById(id) {
        const ids = (id + '').split(',');
        const placeholders = ids.map(() => '?').join(', ');
        const statement = `SELECT * FROM book WHERE id IN (${placeholders}) ORDER BY FIELD(id, ${placeholders});`;
        const [res] = await connection.execute(statement, [...ids, ...ids]);
        return res;
    }

    async getBooks(offset, limit, yourValue, labelId) {
        // 假设 JavaScript 变量 yourValue 代表传递的 your_value 值
        let yourValueCondition = yourValue ? `(bookName LIKE '%?%' OR author LIKE '%?%')` : true;

        // 假设 JavaScript 变量 labelId 代表传递的 labelId 值
        let labelIdValue = labelId ? labelId : null;

        const arr = yourValue ? [yourValue, yourValue, labelIdValue, labelIdValue, offset, limit] : [labelIdValue, labelIdValue, offset, limit];

        // 构建 SQL 查询
        let statement = `
            SELECT *
            FROM book
            WHERE ${yourValueCondition}
            AND (labelId = ? OR ? IS NULL)
            ORDER BY looks DESC, createAt ASC
            LIMIT ?, ?;
        `;

        const [res] = await connection.execute(statement, arr);

        let statement2 = `SELECT COUNT(id)
                        FROM book
                        WHERE ${yourValueCondition}
                        AND (labelId = ? OR ? IS NULL)
                        `;
        const arr2 = yourValue ? [yourValue, yourValue, labelIdValue, labelIdValue] : [labelIdValue, labelIdValue];
        const [res2] = await connection.execute(statement2, arr2);

        return {
            data: res,
            count: res2[0]['COUNT(id)']
        };
    }

    async updataBooks(newBook, oldBook) {
        if (!(oldBook.id && Object.keys(newBook).length > 0)) {
            return Promise.resolve('未修改');
        }
        let statement = `UPDATE book SET `;
        let values = [];
        let i = 0;

        for (let key in oldBook) {
            if (['id', 'creteAt', 'updateAt', 'userId'].some(item => item !== 'key') && newBook[key] && newBook[key] !== oldBook[key]) {
                if (i > 0) {
                    statement += ' , ';
                }
                statement += key + ' = ?';

                values.push(newBook[key]);
                i++;
            }
        }
        statement += ' WHERE id = ?;';
        values.push(oldBook.id);

        if (values.length === 1) {
            return Promise.resolve('未修改');
        }

        const [result] = await connection.execute(statement, values);
        return result;
    }
}

module.exports = new BookService();
