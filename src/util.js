let Mock = require('./mock')
let fs = require('fs')

module.exports = {
    /**
     * 根据url获取对应的mock配置
     * @param {*} pageMap
     * @param {*} path
     */
    getUrlAllConfig(pageMap, path) {
        let page = pageMap[path];
        if (!page) {
            for (let key in pageMap) {
                if (pageMap.hasOwnProperty(key)) {
                    // key = key.replace(/\\/g, '')
                    let re = new RegExp(`^${key}$`);
                    if (re.test(path)) {
                        page = pageMap[key];
                        break;
                    } else {
                        console.log("=====not match=====");
                    }
                }
            }
        }

        return page;
    },
    // 根据请求方法获取对应的mock配置
    getMockConfig(configArr, requestMethod) {
        let mockConfig,
            commonMockConfig

        // 后定义的模板会覆盖先定义的模板
        for (let i = 0; i < configArr.length; ++i) {
            let config = configArr[i]
            let {method} = config
            let isSameMethod = requestMethod.toLowerCase() === method.toLowerCase(),
                isCommonMethod = method === 'any'

            if (isSameMethod) {
                mockConfig = config
            } else if (isCommonMethod) {
                commonMockConfig = config
            }
        }

        // 指定请求方式的模板优先级大于通用的模板
        return mockConfig || commonMockConfig
    },
    getMockData(config) {
        let {template, jsonpCallBack, fileUrl} = config
        let data = template ? Mock.mock(template) : null

        let response = data
        // 处理jsonp
        if (jsonpCallBack) {
            response = `${jsonpCallBack}(${JSON.stringify(data)});`
        }
        // 处理本地文件
        else if (fileUrl) {
            response = new Promise((resolve, reject) => {
                fs.readFile(fileUrl, 'utf-8', (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(content)
                    }
                })
            })
        }

        return response
    },
};
