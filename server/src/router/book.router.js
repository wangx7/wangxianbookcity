const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');

const { verifyBook, verifyList } = require('../middleware/book.middleware');
const { create, list } = require('../controller/book.controller.js');

const labelRouter = new Router({ prefix: '/book' });

labelRouter.post('/create', verifyAuth, verifyBook, create);
labelRouter.post('/list', verifyList, list);

module.exports = labelRouter;
