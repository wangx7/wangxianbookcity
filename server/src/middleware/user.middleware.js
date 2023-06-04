const errorTypes = require('../constants/error-types');
const service = require('../service/user.service');
const serviceBook = require('../service/book.service');
const md5password = require('../utils/password-handle');

const verifyUser = async (ctx, next) => {
    // 1.获取用户名和密码
    const { name, password } = ctx.request.body;

    // 2.判断用户名或者密码不能空
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    // 3.判断这次注册的用户名是没有被注册过
    const result = await service.getUserByName(name);
    if (result.length) {
        const error = new Error(errorTypes.USER_ALREADY_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }

    await next();
};

const handlePassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    if (password) {
        ctx.request.body.password = md5password(password);
    }

    await next();
};

const verifyBookHistory = async (ctx, next) => {
    const { id } = ctx.request.body;

    if (!id && !isNaN(id)) {
        const error = new Error(errorTypes.ID_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    const [oldBook] = await serviceBook.getBookById(id);
    if (!oldBook) {
        const error = new Error(errorTypes.ID_ALREADY_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }

    const [oldUser] = await service.getUserByName(ctx.user.name);

    if (!oldUser) {
        const error = new Error(errorTypes.USER_ALREADY_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }
    ctx.user = oldUser

    ctx.request.body = {
        bookHistory: id
    };

    if (oldUser.bookHistory) {
        let historys = oldUser.bookHistory.split(',');
        historys.unshift(id);
        ctx.request.body.bookHistory = [...new Set(historys.map(id => +id))].splice(0,10).join(',');
    }

    await next();
};

module.exports = {
    verifyUser,
    handlePassword,
    verifyBookHistory
};
