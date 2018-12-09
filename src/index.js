let Mock = require('./mock')
let util = require('./util')

let middleware = function () {
    return async function (ctx, next) {
        let url = util.formatUrl(ctx),
            config = util.getUrlConfig(Mock._urls, url, ctx.method), // 根据url获取对应的配置数组
            data

        if (config) {
            data = await util.getMockData(config)
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