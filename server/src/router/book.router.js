const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');

const { verifyBook, verifyList, verifyLooks, verifyBookHistory } = require('../middleware/book.middleware');
const { create, list, updata, getBookHistory } = require('../controller/book.controller.js');

const labelRouter = new Router({ prefix: '/book' });

labelRouter.post('/create', verifyAuth, verifyBook, create);
labelRouter.post('/list', verifyList, list);
labelRouter.post('/looks', verifyAuth, verifyLooks, updata);
labelRouter.get('/bookHistory', verifyAuth, verifyBookHistory, getBookHistory);

module.exports = labelRouter;
