const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    token: '',  //请求头
    teacher_course:[],
    teacher_course_new:'',
    teacher_name:'耿艳利',
    teacher_id:185380,
    year: '', //年份
    season: '' //季节
  },
  onLoad:function(){
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
    var myDate = new Date();
    this.setData({
      year: myDate.getFullYear(),
      num: myDate.getMonth()
    })
    if (myDate.getMonth() <= 7) {
      this.setData({
        season: '春'
      })
    }
    else {
      this.setData({
        season: '秋'
      })
    }
    // 对学期动态说明
  },
  new_class:function(){
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/group/add?access_token=' + this.data.token,   //请求百度云
      method: 'POST',
      data: {
        group_id: 'new_class'
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  },
  // 创建课程
  add_face:function (){
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/copy?access_token=' + this.data.token,   //请求百度云
      method: 'POST',
      data: {
        user_id: 185379,
        src_group_id:'Students',
        dst_group_id:'183_184_ana_ele'
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  },
  // 添加人脸
  check_students:function(){
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/group/getusers?access_token=' + this.data.token,   //请求百度云
      method: 'GET',
      data: {
        group_id: 'Students',
        length: 100
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  },
  // 查看用户列表
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
    if (this.data.teacher_course.indexOf(this.data.teacher_course_new) ==-1){
      this.data.teacher_course.push(this.data.teacher_course_new)
      app.globalData.teacher_course = this.data.teacher_course
      wx.showToast({
        title: '课程创建成功',
      })
    }
    else{
      wx.showToast({
        title: '课程创建出错',
        icon:'none'
      })
    }
  },
  // 创建课程
  getInputValue(e) {
    this.setData({
      teacher_course_new: e.detail
    })
  }
  // 获取输入框内容
})