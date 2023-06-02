const service = require('../service/label.service');

class LabelController {
    async create(ctx, next) {
        const { name } = ctx.request.body;
        const result = await service.create(name);
        ctx.body = result;
    }

    async list(ctx, next) {
        let { limit, offset } = ctx.request.body;
        if (!(limit >= 0 && offset >= 0)) {
            limit = 0;
            offset = 10;
        }
        const result = await service.getLabels(+limit, +offset);
        ctx.body = result;
    }
}

module.exports = new LabelController();
