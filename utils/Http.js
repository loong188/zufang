import config from './config';
export default class Http {
    //发起一个http请求
    httpReq({ url, data = {}, method = "GET" }) {
            wx.showLoading({
                title: '正在加载...',
                mask: true,
            });
            return new Promise((resolve, reject) => {
                wx.request({
                    url: config.domain + url,
                    data,
                    header: {
                        'username': config.username,
                        'password': config.password
                    },
                    method,
                    success: ret => resolve(ret.data),
                    fail: err => reject(err),
                    complete: () => {
                        wx.hideLoading();
                    }
                });
            });
        }
        // 上传请求
    upLoadFile({ url, filePath, name = "file" }) {
        // 返回也是一个promise
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: config.domain + url,
                filePath,
                name,
                success: res => resolve(res.data)
            })
        })
    }
}