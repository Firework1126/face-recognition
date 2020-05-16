const app = getApp();
Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    imgList: [],
    photo_base64:'',
    token:'',
    student_id:'',
    message:''
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  //图片查看
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  //选择图片
  DelImg(e) {
    wx.showModal({
      title: '客官',
      content: '确定要删除这张照片吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  //删除图片
  student_registe: function (e) {
    console.log(e.detail.value.student_id)
    let index = e.detail.value.student_id
    this.setData({
      student_id: index
    })
    console.log(this.data.student_id)
    wx.showToast({
      title: '等待中',
      image: '/images/geren/soccer.png',
      duration: 2000
    })
    wx.navigateTo({
      url: '../../student_check_in/student_check_in',
    })
  },
  // 学生注册弹窗等待
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
  },
  //初始化页面
  student_registe_photo:function(){
    var that = this
    this.setData({
      photo_base64: wx.getFileSystemManager().readFileSync(this.data.imgList[0], "base64")
    })
    //图片转化为base64格式
    wx.request({
      url:'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token='+this.data.token,   //请求百度云
      method:'POST',
      data:{
        image: this.data.photo_base64,
        image_type: 'BASE64',
        group_id: 'Students', //自己建的用户组id
        user_id: this.data.student_id, //这里储存用户学号
        quality_control:'LOW',
        action_type:'REPLACE'
      },
      header:{
        'Content-Type': 'application/json' // 默认值
      },
      success(res){
        console.log(res)
        that.setData({
          message:res.data.error_msg
        })
        if (that.data.message == 'SUCCESS') {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          })
        }
        if (that.data.message !== 'SUCCESS') {
          wx.showToast({
            title: '请再次点击添加',
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  }
})