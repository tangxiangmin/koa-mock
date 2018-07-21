let Mock = require('./mock')
let util = require('./util')


let middleware = function () {
    return async function (ctx, next) {
        let url = ctx.url,
            allConfig = util.getUrlAllConfig(Mock._urls, url),
            data

        if (Array.isArray(allConfig)) {
            let template = util.getMockTemplate(allConfig, ctx.method)
            data = template ? Mock.mock(template) : null
        }

        if (data) {
            ctx.body = data
        } else {
            await next()
        }
    }
}

middleware.Mock = Mock

module.exports = middleware