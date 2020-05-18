const app = getApp();
Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    imgList: [],  //图片
    photo_base64: '', //图片为64格式
    token: '',  //请求头
    student_id: 185379,  //学生id
    message: '',
    student_name:"卢春雨",
    year:'', //年份
    season:'', //季节
    month:'',  //按钮的月份
    btn:'' //上传按钮判断
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
      sourceType: ['album', 'camera'], //从相册选择
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
    var myDate = new Date();
    this.setData({
      year: myDate.getFullYear(),
      num: myDate.getMonth()
    })
    if (myDate.getMonth()<=7){
      this.setData({
        season:'春'
      }) 
    }
    else{
      this.setData({
        season: '秋'
      }) 
    }
    // 对学期动态说明
   },
  //初始化页面
  dianji:function(){
    console.log('点击')
  },
  student_change_photo: function () {
    console.log('我被点击了')
    var that = this
    this.setData({
      photo_base64: wx.getFileSystemManager().readFileSync(this.data.imgList[0], "base64")
    })
    //图片转化为base64格式
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/update?access_token=' + this.data.token,   //请求百度云
      method: 'POST',
      data: {
        image: this.data.photo_base64,
        image_type: 'BASE64',
        group_id: 'Students', //自己建的用户组id
        user_id: this.data.student_id, //这里储存用户学号
        quality_control: 'LOW',
        action_type: 'UPDATE'
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          message: res.data.error_msg
        })
        if (that.data.message == 'SUCCESS') {
          wx.showToast({
            title: '更换成功',
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
    var myDate = new Date();
    this.setData({
      month: myDate.getMonth()
    })
    if (this.data.num == this.data.month){
      this.setData({
       btn:true
      })
    }
    else{
      this.setData({
        btn: false
      })
    }
  },
  go_student_check_in:function(){
    wx.navigateTo({
      url: '../student_check_in/student_check_in',
    })
  }
})