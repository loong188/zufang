import Http from '../utils/Http'
import cache from '../utils/Cache'
import config from '../utils/config'
class Notice extends Http {
    getList(page = 1) {
        return this.httpReq({
            url: config.notices,
            data: {
                page,
                openid: cache.get('openid')
            }
        })
    }
}
export default new Notice;