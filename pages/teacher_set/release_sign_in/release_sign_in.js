const app = getApp();
Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    latitude: "",
    longitude: "",
    token:"",
    index:null,
    picker: ['new_class', 'modian', 'modianyi', 'mo']
  },
  onLoad: function () {
    var that = this
    //进行acess_token获取
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //百度云的接口地址
      data: {
        grant_type: 'client_credentials',  //默认参数
        client_id: 'FnrydhHo6kfkc3BC9KIQWvea', //卢春雨百度云人脸识别的API Key
        client_secret: '5jKSF7BGdm5w6xUaUjYmZBtPaRFxXgNA' //卢春雨百度云人脸识别的Secret Key
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          token: res.data.access_token //获取到token
        })
      }
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 选择课程
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
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + that.data.token,
      method: 'POST',
      data: {
        image: app.globalData.base64,
        image_type: 'BASE64',
        group_id: 'student', //自己建的用户组id
        user_id: this.data.picker[this.data.index].concat('4'),
        user_info: 100603
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + that.data.token,
      method: 'POST',
      data: {
        image: app.globalData.base64,
        image_type: 'BASE64',
        group_id: 'student', //自己建的用户组id
        user_id: this.data.picker[this.data.index].concat('5'),
        user_info: 5666220
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  },
  open_sign_in:function(){
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/group/add?access_token=' + this.data.token,   //请求百度云
      method: 'POST',
      data: {
        group_id: this.data.picker[this.data.index].concat('1')
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  },
  // 打开考勤
  close_sign_in:function(){
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/group/delete?access_token=' + this.data.token,   //请求百度云
      method: 'POST',
      data: {
        group_id: this.data.picker[this.data.index].concat('1')
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  }
  // 关闭考勤
})