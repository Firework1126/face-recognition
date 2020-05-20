const app = getApp();
Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    token: '',  //请求头
    student_id:'',
    picker: ['new_class','modian','modianyi','mo']
    // app.globalData.course
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
  add_students: function (e) {
    let index = e.detail.value.students_id
    this.setData({
      student_id: index
    })
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/copy?access_token=' + this.data.token,   //请求百度云
      method: 'POST',
      data: {
        user_id: this.data.student_id,
        src_group_id: 'Students',
        dst_group_id: this.data.picker[this.data.index]
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
         wx.showToast({
         title: '添加成功'
        })
      }
    })

  // 添加人脸
  },
})