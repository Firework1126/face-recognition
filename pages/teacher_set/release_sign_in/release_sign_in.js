const app = getApp();
Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    latitude: "",
    longitude: "",
  },
  getLocation: function (e) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude * 100000,
          longitude: res.longitude * 100000
        })
      }
    })
  }
})