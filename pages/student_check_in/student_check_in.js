const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  student_recognize:function(){
    wx.startSoterAuthentication({
      requestAuthModes: ['facial'],
      challenge: '123456',
      authContent: '请用人脸',
      success(res) {
        console.log("识别成功", res)
      },
      fail(res) {
        console.log("识别失败", res)
      }
    })
  }
})