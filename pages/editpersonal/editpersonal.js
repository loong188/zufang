import model from '../../models/Renting'
// import config from '../../utils/config';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //用户信息
        userinfo: {},
        //上传的图片
        card_img: '',
        //显是图片数量
        imglist: [],
        //限制允许上传图片数量
        count: 3
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        model.getOpenidToInfo().then(ret => {
            // console.log(ret.data);
            this.setData({
                //用户信息
                userinfo: ret.data,
                //身份证图片
                imglist: ret.data.card_img,
                //修改允许上传数量
                count: 3 - ret.data.card_img.length
            });
        });
    },
    dopost(evt) {
        // 表单数据
        let data = evt.detail.value;
        // console.log(data);
        model.editRenting(data).then(ret => {
            // 提示信息
            wx.showToast({
                title: ret.msg,
                icon: 'success',
                duration: 1500,
                mask: true
            });
        })
    },
    upfile() {
        model.chooseImage().then(ret => {
            // console.log(ret);
            if (ret.length == this.data.count) {
                let arr = [];
                let imglist = [];
                ret.forEach((item, index) => {
                        imglist.push(item);
                        arr.push(model.upfile({ filePath: item }))
                    })
                    //上传的临时文件用于图片展示
                this.setData({ imglist });
                //promise all要么全部成功，一个失败则全部失败
                return Promise.all(arr);
            }
        }).then(res => {
            let arr = [];
            res.forEach(item => {
                item = JSON.parse(item)
                arr.push(item.path)
            });
            this.setData({
                card_img: arr.join('#')
            })
        })
    }
})