const service = require('../service/label.service');
const errorTypes = require('../constants/error-types');

const verifyLabel = async (ctx, next) => {
    const { name } = ctx.request.body;
    if (!name) {
        const error = new Error(errorTypes.LABEL_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    const newInfo = await service.getLabelByName(name);
    if (newInfo) {
        const error = new Error(errorTypes.LABEL_ALREADY_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }

    await next();
};

const verifyList = async (ctx, next) => {
    let { limit, offset } = ctx.request.body;
    if (!(limit >= 0 && offset >= 0)) {
        ctx.request.body.limit = 0;
        ctx.request.body.offset = 10;
    }

    await next;
};

const verifyLabelExists = async (ctx, next) => {
    // 1.取出要添加的所有的标签
    const { labels } = ctx.request.body;

    // 2.判断每一个标签在label表中是否存在
    const newLabels = [];
    for (let name of labels) {
        const labelResult = await service.getLabelByName(name);
        const label = { name };
        if (!labelResult) {
            // 创建标签数据
            const result = await service.create(name);
            label.id = result.insertId;
        } else {
            label.id = labelResult.id;
        }
        newLabels.push(label);
    }
    ctx.labels = newLabels;
    await next();
};

module.exports = {
    verifyLabelExists,
    verifyLabel,
    verifyList
};
