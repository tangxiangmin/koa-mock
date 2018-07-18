
module.exports = {
    /**
     * 根据url获取对应的模板
     * @param {*} pageMap 
     * @param {*} path 
     */
    getMockTemplate(pageMap, path) {
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
    }
};
