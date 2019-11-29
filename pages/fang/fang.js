import model from '../../models/Fang'
// pages/fang/fang.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        markers: [],
        id: 0,
        info: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        let id = 1;
        model.getFangDetail(id).then(ret => {
            console.log(ret);
            this.setData({
                id,
                info: ret.data,
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
        })
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})