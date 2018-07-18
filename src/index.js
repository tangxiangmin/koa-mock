let Mock = require('./mock')
let util = require('./util')

module.exports = function () {
    return async function (ctx, next) {
        let url = ctx.url;
        let template = util.getMockTemplate(Mock._urls, url);
        data = template ? Mock.mock(template): null
        if (data) {
            ctx.body = data
        } else {
            await next();
        }
    };
};