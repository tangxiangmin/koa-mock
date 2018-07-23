let Mock = require('./mock')
let util = require('./util')


let middleware = function () {
    return async function (ctx, next) {
        let url = ctx.url,
            allConfig = util.getUrlAllConfig(Mock._urls, url), // 根据url获取对应的配置数组
            data

        if (Array.isArray(allConfig)) {
            let config = util.getMockConfig(allConfig, ctx.method)
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