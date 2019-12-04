import Http from '../utils/Http'
import cache from '../utils/Cache'
import config from '../utils/config'
class Fang extends Http {
    //推荐房源
    getRecommend() {
        return this.httpReq({
            url: config.recommend
        }).then(ret => {
            // console.log(ret);
            //返回Promise对象让链式结构不断
            return new Promise((resolve, reject) => {
                let data = ret.data;
                data = data.map(item => {
                    item['fang_pic'] = item.fang_pic[0];
                    return item;
                });
                resolve(data);
            })
        });
    }
    getGroupList() {
            return this.httpReq({
                url: config.group
            })
        }
        //房源列表
    getFangList(page = 1) {
            return this.httpReq({
                url: config.fanglist,
                data: { page }
            })
        }
        //房源详情
    getFangDetail(id = 1) {
        return this.httpReq({

            url: config.detail,
            data: { id }
        })
    }
    fangAttr() {
        return this.httpReq({
            url: config.fangAttr

        })
    }
    search(kw) {
        return this.httpReq({
            url: config.search,
            data: { kw }
        })
    }

}
export default new Fang;