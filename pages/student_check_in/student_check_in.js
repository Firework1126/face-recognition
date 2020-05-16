const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    token:'',
    message:'',
    photo_base64:'',
    src:'',
    camera: app.globalData.camera
  },
  open_camera:function(){
    app.globalData.camera = 0
    this.setData({
      camera: app.globalData.camera
    })
    this.onLoad()
  },
  // 打开摄像头
  end_camera:function(){
    app.globalData.camera = 1
    this.setData({
      camera: app.globalData.camera
    })
    this.onLoad()
  },
  // 关闭摄像头
  take_photo:function(){
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  // 进行拍摄照片
  student_check_in:function(){
    var that = this
    // wx.getFileSystemManager().readFile({
    //   filePath: this.data.src,
    //   encoding: "base64",
    //   success: res => {
    //     console.log(res)
    //     this.setData({
    //       photo_base64: res.data
    //     })
    //   }
    // })
    this.setData({
      photo_base64: wx.getFileSystemManager().readFileSync(this.data.src, "base64")
    })
    if (that.data.photo_base64 !== ""){
    console.log(this.data.photo_base64)
      wx.request({
        url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + that.data.token,
        method:'POST',
        data:{
          image:this.data.photo_base64,
          image_type: 'BASE64',
          group_id_list:'Students', //用户组
          user_id:185379  //指定id进行比对
        },
        header: {
          'Content-Type': 'application/json' // 默认值
        },
        success(res){
          console.log(res)
        }
      })
    }
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
})