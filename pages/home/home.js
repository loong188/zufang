import cache from '../../utils/Cache'
import config from '../../utils/config'
import Http from '../../utils/Http'
import model from '../../models/Fang'
const http = new Http;

Page({

    data: {
        // 用户信息
        userInfo: {},
        // 授权是否显示 false显示  true不显示
        isShow: false,
        recommends: []
    },

    onLoad(options) {
        if (cache.has('userInfo')) {
            this.setData({
                userInfo: cache.get('userInfo'),
                isShow: true
            })
        }
        model.getRecommend().then(ret => {
            // console.log(ret)
            this.setData({
                recommends: ret
            })
        })
    },
    // 用户授权
    getuserInfo() {
        wx.getUserInfo({
            timeout: 10000,
            success: ({ userInfo }) => {
                this.setData({ userInfo, isShow: true });
                // 写入缓存
                cache.set('userInfo', userInfo);

                //发起请求
                http.httpReq({
                    url: config.userinfo,
                    method: 'POST',
                    data: {
                        openid: cache.get('openid'),
                        nickname: userInfo.nickName,
                        sex: userInfo.gender == 1 ? '男' : '女',
                        avatar: userInfo.avatarUrl
                    }
                });
            }
        });

    }
})