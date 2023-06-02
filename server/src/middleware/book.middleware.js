const errorTypes = require('../constants/error-types');

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
    ctx.request.body.limit += ''
    ctx.request.body.offset += ''

    await next();
};

module.exports = {
    verifyBook,
    verifyList
};
