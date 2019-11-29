import Http from '../utils/Http'
import cache from '../utils/Cache'
import config from '../utils/config'
class Article extends Http {
    getList(page = 1) {
            return this.httpReq({
                url: config.articles,
                data: { page }
            })
        }
        //根据文章ID获取信息
    getIdByInfo(id = 1) {
        return this.httpReq({
            url: config.articles + '/' + id
        });
    }
    setCount(art_id) {
        return this.httpReq({
            url: config.articlesHistory,
            data: {
                openid: cache.get('openid'),
                art_id
            },
            method: 'POST'
        })
    }
}
export default new Article;