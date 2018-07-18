/**
 * 劫持Mock.mock，并做一些处理
 */

let Mock = require("mockjs");

let mock = Mock.mock

Mock._urls = {}

Mock.mock = function () {
    let args = arguments
    let len = args.length

    if (len === 2) {
        let url = args[0],
            template = args[1]
        // if (url instanceof RegExp) {
        //     url = url.toString()
        // }

        Mock._urls[url] = template;
    } else if (len === 3) {
        // todo 区分请求方法
    }

    return mock.apply(Mock, args)
}

module.exports = Mock