import Http from '../utils/Http'
import cache from '../utils/Cache'
import config from '../utils/config'
class Renting extends Http {
    getOpenidToInfo() {
            // 返回promise
            return this.httpReq({
                url: config.renting,
                data: { openid: cache.get('openid') }
            });
        }
        //根据用户openid
    editRenting(data) {
            console.log(data);
            data.openid = cache.get('openid')
            return this.httpReq({
                url: config.editrenting,
                data,
                method: 'PUT'
            });
        }
        //选择图片
    chooseImage(count = 3) {
        //返回promise
        return new Promise((reslove, reject) => {
            wx.chooseImage({
                count,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: res => reslove(res.tempFilePaths)
            })
        })
    }
    upfile({ filePath }) {
        return this.upLoadFile({
            url: config.upfile,
            filePath,
            name: 'cardimg'
        })
    }

}
export default new Renting;