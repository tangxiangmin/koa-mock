/**
 * 劫持Mock.mock，并做一些处理
 */

let Mock = require("mockjs");

let mock = Mock.mock

Mock._urls = {}

Mock.mock = function () {
    let args = arguments
    let len = args.length
    let url = args[0]

    let method,
        template

    if (len === 2) {
        template = args[1]
        method = 'any'
    } else if (len === 3) {
        method = args[1]
        template = args[2]
    }

    let config = {
        method,
        template
    }

    if (!Mock._urls[url]) {
        Mock._urls[url] = []
    }

    Mock._urls[url].push(config)


    return mock.apply(Mock, args)
}

module.exports = Mock