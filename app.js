// 小程序的入口文件  使用es6导入可以不写.js扩展名
import Http from './utils/Http';
import config from './utils/config';
import cache from './utils/Cache';
const http = new Http;
App({
    onLaunch() {

        // 判断是否进行过openid获取
        if (!cache.has('openid')) { // 缓存中没有对应的openid数据，进行网络请求换得openid
            // 小程序wx.login来获取code值
            wx.login({
                timeout: 10000,
                success: ({ code }) => {
                    // 发起一个网络请求
                    http.httpReq({
                        url: config.wxlogin,
                        method: 'POST',
                        data: { code }
                    }).then(ret => {
                        // 得到的openid写入到缓存
                        cache.forever('openid', ret.openid);
                    });
                }
            });
        }
    }
})