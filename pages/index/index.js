import model from '../../models/Fang'
// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: ['', '', '', ''],
        showflag: [false, false, false, false],
        arrows: ['icon-xiangxia', 'icon-xiangxia', 'icon-xiangxia', 'icon-xiangxia'],
        recommends: [],
        group: [],
        fangs: [],
        page: 1,
        top: 0,
        kw: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //推荐房源
        let p1 = model.getRecommend();
        let p2 = model.getGroupList();
        Promise.all([p1, p2]).then(([ret1, ret2]) => {
            // console.log(ret1);
            this.setData({
                recommends: ret1,
                groups: ret2.data
            })
        })

        this.getmore()
    },
    getmore() {
        model.getFangList(this.data.page).then(ret => {
            console.log(ret)
            let page = this.data.page;
            if (ret.data.length > 0) {
                this.setData({
                    fangs: [...this.data.fangs, ...ret.data],
                    page: ++page
                })
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
    // 遮罩
    onShadeDiv(evt) {
        let index = evt.currentTarget.dataset.index;
        let show = this.data.show;
        let showflag = this.data.showflag;
        let arrows = this.data.arrows;

        if (showflag[index]) { // 已显示，再次点击隐藏起来
            show[index] = '';
            showflag[index] = false;
            arrows[index] = 'icon-xiangxia';
        } else {
            for (let key in show) {
                if (key == index) {
                    show[key] = 'now';
                    showflag[key] = true;
                    arrows[key] = 'icon-xiangshang';
                } else {
                    show[key] = '';
                    showflag[key] = false;
                    arrows[key] = 'icon-xiangxia';
                }
            }
        }
        this.setData({
            show,
            showflag,
            arrows
        })
    },
    //回到顶部
    gotoTop() {
        this.setData({
            top: 0
        })
    },
    search(evt) {
        let kw = evt.detail.value;
        model.search(kw).then(ret => {
            this.setData({
                fangs: ret.data,
                kw
            })
        })
    }
})