import model from '../../models/Article'
import cache from '../../utils/Cache'


const WxParse = require('../../wxParse/wxParse.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: {},
        id: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        model.setCount();
        model.getIdByInfo(options.id).then(ret => {
            // console.log(ret);
            this.setData({
                info: ret.data,
                id: options.id
            });
            WxParse.wxParse('body', 'html', ret.data.body, this, 5);
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            //自定义分享的标题
            title: this.data.info.title,
            //自定义分享的路径
            path: '/pages/newsdetail/newsdetail?id=' + this.data.id + '&openid=' + cache.get('openid'),
            //自定义分享的图片
            imageUrl: this.data.info.pic
        }
    }
})