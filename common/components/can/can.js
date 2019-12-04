// common/components/can/can.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      //自定义属性
        value: {
            type: String,
            value: ''
        },
        gid: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        mycan() {
          //自定义事件
            this.triggerEvent('mycan', this.properties, false);
        }
    }
})