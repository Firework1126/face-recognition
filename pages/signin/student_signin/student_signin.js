const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  student_approve:function() {
    wx.navigateTo({
      url: '../student_signin/student_approve',
    })
  },
  student_sign_in: function () {
    wx.navigateTo({
      url: '../../student_set/student_set',
    })
  }
})