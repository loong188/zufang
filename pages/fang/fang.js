import model from '../../models/Fang'
import cache from '../../utils/Cache'
import fav from '../../models/Fav'
const WxParse = require('../../wxParse/wxParse.js');
// pages/fang/fang.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        markers: [],
        id: 0,
        info: [],
        favmsg: '添加收藏',
        cancel: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options.id);
        let fang_id = options.id;
        this.getInfo(fang_id);
        fav.isFav(fang_id).then(ret => {
            // console.log(ret)
            this.setData({
                favmsg: ret.msg,
                cancel: ret.data
            })

        })

    },
    getInfo(id) {
        model.getFangDetail(id).then(ret => {
            // console.log(ret)
                //顶部文字修改
            wx.setNavigationBarTitle({
                title: ret.data.fang_xiaoqu
            });
            this.setData({
                id,
                info: ret.data,
                //地图定位
                markers: [...this.data.markers, {
                    title: '位置所在',
                    iconPath: "https://fang.1314000.cn/zfw/location.png",
                    id: 0,
                    latitude: ret.data.latitude,
                    longitude: ret.data.longitude,
                    width: 30,
                    height: 30
                }]
            })
            WxParse.wxParse('body', 'html', ret.data.fang_body, this, 5);
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage({ from }) {
        return {
            title: this.data.info.fang_name,
            path: "/pages/fang/fang?id=" + this.data.info.id + "&openid" + cache.get('openid'),
            imageUrl: this.data.info.fang_pic[0]
        }
    },
    //打电话功能实现
    callphone(evt) {
        //获取电话号码
        let phoneNumber = evt.target.dataset.phone;
        wx.makePhoneCall({ phoneNumber });
    },
    //收藏功能实现
    addFav() {
        // console.log(111);
        let favmsg = '添加收藏';
        let cancel = 0;
        if (this.data.cancel == 0) {
            favmsg = '取消收藏';
            cancel = 1;
        }
        //添加收藏
        fav.fav({
            fang_id: this.data.id,
            add: cancel
        }).then(ret => {
            this.setData({
                favmsg,
                cancel
            });
            wx.showToast({
                title: cancel == 1 ? '添加收藏' : "取消收藏成功",
                icon: 'success',
                duration: 1500,
                mask: true,
            });
        })

    },
    mycan(evt) {
        console.log(evt.detail);
    }
})