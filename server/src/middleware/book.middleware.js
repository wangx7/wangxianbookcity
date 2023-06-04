const errorTypes = require('../constants/error-types');
const service = require('../service/book.service');
const userService = require('../service/user.service');

const verifyBook = async (ctx, next) => {
    const { labelId, bookName, bookHref, coverHref, blurb, author } = ctx.request.body;

    if (!(labelId && bookName && bookHref && coverHref && blurb && author)) {
        const error = new Error(errorTypes.BOOKS_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    await next();
};

const verifyList = async (ctx, next) => {
    let { limit, offset } = ctx.request.body;
    if (!(limit >= 0 && offset >= 0)) {
        ctx.request.body.limit = '10';
        ctx.request.body.offset = '0';
    }
    ctx.request.body.limit += '';
    ctx.request.body.offset += '';

    await next();
};

// 校验浏览量
const verifyLooks = async (ctx, next) => {
    const { id } = ctx.request.body;
    if (!id) {
        const error = new Error(errorTypes.ID_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    const [oldBook] = await service.getBookById(id);

    if (!oldBook) {
        const error = new Error(errorTypes.ID_ALREADY_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }

    ctx.newBook = {
        looks: 1
    };
    if (oldBook.looks) {
        ctx.newBook.looks = +oldBook.looks + 1;
    }

    ctx.oldBook = oldBook;

    await next();
};

const verifyBookHistory = async (ctx, next) => {
    console.log(ctx.user.name);
    const [user] = await userService.getUserByName(ctx.user.name);
    if (!user.bookHistory) {
        const error = new Error(errorTypes.ID_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    ctx.user.bookHistory = user.bookHistory;
    await next();
};

module.exports = {
    verifyBook,
    verifyList,
    verifyLooks,
    verifyBookHistory
};
