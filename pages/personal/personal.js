import model from '../../models/Renting'

Page({
    data: {
        // 定义一个数据源
        userinfo: {}
    },
    // 页面加载事件
    onLoad(options) {
        // 请求
        model.getOpenidToInfo().then(ret => {
            // 得到值返回到视图层
            this.setData({ userinfo: ret.data });
        });
    }
})