const Router = require('koa-router');
const { create, updateUserInfo, avatarInfo } = require('../controller/user.controller');
const { verifyUser, handlePassword, verifyBookHistory } = require('../middleware/user.middleware');

const { verifyAuth } = require('../middleware/auth.middleware');

const userRouter = new Router({ prefix: '/users' });

userRouter.post('/register', verifyUser, handlePassword, create);
userRouter.post('/updata', verifyAuth, handlePassword, updateUserInfo);
userRouter.get('/:userId/avatar', avatarInfo);
userRouter.post('/addBookHistory', verifyAuth, verifyBookHistory, updateUserInfo);

module.exports = userRouter;
