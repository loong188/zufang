import Http from '../utils/Http'
import cache from '../utils/Cache'
import config from '../utils/config'
class Fav extends Http {
    //openid用户是否收藏
    isFav(fang_id) {
        return this.httpReq({
            url: config.isfav,
            data: {
                fang_id,
                openid: cache.get('openid')
            }
        })
    }
    fav({ fang_id, add = 1 }) {
        return this.httpReq({
            url: config.fav,
            data: {
                fang_id,
                openid: cache.get('openid'),
                add
            }
        })
    }
}
export default new Fav;