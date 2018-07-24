/**
 * 2018/7/23 下午11:40
 */

let assert = require("chai").assert

let util = require('../src/util')

describe('util tests', function () {
    it('shoule 100% pass', function () {
        assert(true === true)
    })

    describe('util.formatUrl tests', function () {
        it('util.formatUrl 应该返回请求url的格式化对象', function () {
            let input = '/'
            let res = util.formatUrl(input)

            assert(res === '/')
        })
        it('util.formatUrl 应该处理带query参数的url', function () {
            let input = '/index?id=123&name=test'

            let res = util.formatUrl(input)
            assert(res === '/index')
        })
    })

    describe('util.match tests', function () {
        it('两个相同的字符串应返回true', function () {
            let expected = '/',
                actual = '/'
            let res = util.match(expected, actual)
            assert(res === true)
        })
        it('两个大小写不同的相同的字符串应返回true', function () {
            let expected = 'GET',
                actual = 'get'
            let res = util.match(expected, actual)
            assert(res === true)
        })

        it('两个不同的字符串应返回false', function () {
            let expected = '/',
                actual = '/test'
            let res = util.match(expected, actual)
            assert(res === false)
        })

        it('expected 为正则表达式，匹配到actual字符串应返回false', function () {
            let expected = /\//,
                actual = '/'
            let expected2 = /\/id\/\d+/,
                actual2 = '/id/5'

            let res = util.match(expected, actual)
            let res2 = util.match(expected2, actual2)
            assert(res === true)
            assert(res2 === true)
        })
        it('expected 为正则表达式，匹配不到actual字符串应返回false', function () {
            let expected = /\/id\/\d+/,
                actual = '/abcd'
            let res = util.match(expected, actual)
            assert(res === false)
        })
        it('actual为空时应当做空字符串处理', function () {
            let expected = '',
                expected2 = 'get'
            let res = util.match(expected)
            let res2= util.match(expected2)

            assert(res === true)
            assert(res2 === false)
        })

    })


    describe('util.getUrlAllConfig tests', function () {
        it('util.getUrlAllConfig 应该返回url字符串的配置', function () {
            let testConfig1 = {
                rurl: '/test',
                template: {},
                method: 'get',
            }, testConfig2 = {
                rurl: '/',
                template: []
            }

            let url1 = '/test',
                url2 = '/',
                pageMap = [
                    testConfig2
                    ,
                    testConfig1
                ];
            let result1 = util.getUrlConfig(pageMap, url1, 'get')
            let result2 = util.getUrlConfig(pageMap, url2, 'get')

            assert(result1 === testConfig1)
            assert(result2 === testConfig2)
        })

        it('util.getUrlAllConfig 应该返回url字符串指定请求方法的配置', function () {
            let url = '/test'

            let postConfig = {
                    rurl: url,
                    method: 'post',
                    template: {}
                },
                getConfig = {
                    rurl: url,
                    method: 'get',
                    template: {}
                }

            let pageMap = [
                postConfig,
                getConfig,
                {
                    rurl: url,
                    template: {}
                },
            ];
            let postResult = util.getUrlConfig(pageMap, url, 'post'),
                getResult = util.getUrlConfig(pageMap, url, 'get')

            assert(postResult === postConfig)
            assert(getResult === getConfig)
        })

        it('util.getUrlAllConfig 应该返回url正则的配置', function () {
            let testConfig = {
                rurl: /id\/\d+/,
                template: {}
            }
            let url = '/id/5',
                pageMap = [
                    {
                        rurl: '/',
                        template: []
                    },
                    testConfig
                ];

            let result = util.getUrlConfig(pageMap, url)
            assert(result === testConfig)
        })

    })
})