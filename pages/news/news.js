import model from '../../models/Article'
// pages/news/news.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //文章数据
        items: [],

        //页码
        page: 1,
        //回到顶部
        top: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getmore();
    },
    //获取更多
    getmore() {
        // console.log(111);
        let page = this.data.page
        model.getList(page).then(ret => {
            if (ret.data.data.length > 0) {
                this.setData({
                        //数据展开
                        items: [...this.data.items, ...ret.data.data],

                        //下拉获取第二页
                        page: ++page
                    })
                    // console.log(items);
            } else {
                wx.showToast({
                    title: '已经没有更多数据了',
                    icon: 'none',
                    duration: 1500,
                    mask: true,
                });
            }
        })
    },
    //回到顶部
    gotoTop() {
        this.setData({
            top: 0
        })
    },
})