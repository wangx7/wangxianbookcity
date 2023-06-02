const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');
const { verifyLabel, verifyList } = require('../middleware/label.middleware');
const { create, list } = require('../controller/label.controller.js');

const labelRouter = new Router({ prefix: '/label' });

labelRouter.post('/create', verifyAuth, verifyLabel, create);
labelRouter.post('/list', verifyList, list);

module.exports = labelRouter;
