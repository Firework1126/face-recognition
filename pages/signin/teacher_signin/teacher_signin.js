const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  teacher_approve: function () {
    wx.navigateTo({
      url: '../teacher_signin/teacher_approve',
    })
  },
  teacher_sign_in:function(){
    wx.navigateTo({
      url: '../../teacher_set/teacher_set',
    })
  }
})