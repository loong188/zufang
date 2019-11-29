//缓存类
class Cache {
    //设置缓存 有效期单位秒
    set(key, value, expire = 3600) {
            expire = new Date().getTime() + expire * 1000;
            //缓存的数据
            let data = { expire, value };
            wx.setStorageSync(key, data);
            return true;
        }
        //判断是否以缓存
    has(key) {
            //当前时间
            let ctime = new Date().getTime();
            let data = wx.getStorageSync(key);
            if (data == '') return false;
            //如果过期时间小有效，大无效
            let expire = data.expire;
            if (ctime > expire) {
                //删除key
                wx.removeStorageSync(key);
                return false;
            }
            return true;
        }
        //获取
    get(key, val = '默认值') {
            if (!this.has(key)) {
                return val || '';
            }
            //获取数据
            let { value } = wx.getStorageSync(key);
            return value;
        }
        //永久存储
    forever(key, value) {
        return this.set(key, value, 99999999999);
    }
    del(key) {
        wx.removeStorageSync(key);
        return true;
    }
}
export default new Cache;