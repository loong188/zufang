import model from '../../models/Notice'
// pages/fangmsg/fangmsg.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        model.getList().then(ret => {
            this.setData({ items: ret.data.data });
        })
    },
    //拨打电话
    callphone(evt) {
        console.log(evt);
        let phoneNumber = evt.target.dataset.phone;
        wx.makePhoneCall({ phoneNumber });
    }
})