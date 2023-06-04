const service = require('../service/book.service');

class BookController {
    async create(ctx, next) {
        const { id } = ctx.user;
        const body = ctx.request.body;
        body.userId = id;
        const result = await service.create(body);
        console.log(result, 'result');
        ctx.body = result;
    }

    async list(ctx, next) {
        let { limit, offset } = ctx.request.body;
        const result = await service.getBooks(offset, limit);
        ctx.body = result;
    }

    async updata(ctx) {
        const result = await service.updataBooks(ctx.newBook, ctx.oldBook);
        ctx.body = result;
    }

    async getBookHistory(ctx) {
        const books = await service.getBookById(ctx.user.bookHistory);
        ctx.body = books;
    }
}

module.exports = new BookController();
