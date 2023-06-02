const service = require('../service/book.service');

class BookController {
    async create(ctx, next) {
        const { id } = ctx.user;
        const body = ctx.request.body;
        body.createUserId = id;
        const result = await service.create(body);
        ctx.body = result;
    }

    async list(ctx, next) {
        let { limit, offset } = ctx.request.body;
        const result = await service.getBooks(offset, limit);
        ctx.body = result;
    }
}

module.exports = new BookController();
