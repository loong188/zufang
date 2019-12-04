import model from '../../models/Fang'
// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: ['', '', '', ''],
        showflag: [false, false, false, false],
        arrows: ['icon-xiangxia', 'icon-xiangxia', 'icon-xiangxia', 'icon-xiangxia'],
        fangs: [],
        page: 1,
        attrlist: {},
        pageurl: '/pages/search/search',
        fang_area: '',
        fang_rent_class: '',
        fang_rent_range: '',
        kw: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let fang_area = options.fang_area ? options.fang_area : '';
        let fang_rent_class = options.fang_rent_class ? options.fang_rent_class : '';
        let fang_rent_range = options.fang_rent_range ? options.fang_rent_range : '';
        this.getmore();
        // 房源列表
        model.fangAttr().then(ret => {
            // console.log(ret);
            this.setData({
                attrlist: ret.data,
                fang_area,
                fang_rent_class,
                fang_rent_range
            })
        })
    },

    // 加载更多
    getmore() {
        // 房源列表
        model.getFangList(this.data.page).then(ret => {
            let page = this.data.page;
            if (ret.data.length > 0) { // 如果有数据则++
                this.setData({
                    fangs: [...this.data.fangs, ...ret.data],
                    page: ++page
                })
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