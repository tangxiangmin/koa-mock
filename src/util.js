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
    getMockTemplate(configArr, requestMethod) {

        let mockTemplate,
            commonMockTemplate

        // 后定义的模板会覆盖先定义的模板
        // 指定请求方式的模板优先级大于通用的模板
        for (let i = 0; i < configArr.length; ++i) {
            let config = configArr[i]
            let {template, method} = config
            let isSameMethod = requestMethod.toLowerCase() === method.toLowerCase(),
                isCommonMethod = method === 'any'
            if (isSameMethod) {
                mockTemplate = template
            } else if (isCommonMethod) {
                commonMockTemplate = template
            }
        }
        return mockTemplate || commonMockTemplate
    },
};
