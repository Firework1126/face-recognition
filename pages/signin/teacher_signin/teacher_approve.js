const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    numList: [{
      name: '开始'
    }, {
      name: '继续'
    }, {
      name: '加油'
    }, {
      name: '完成'
    },],
    num: 0,
    scroll: 0,
    index: null,
    picker: ['人工智能与数据科学学院', '电气工程学院', '材料科学与工程学院','化工学院','机械工程学院','经济管理学院','土木与交通学院','电子信息工程学院','能源与环境工程学院','理学院','建筑与艺术设计学院','马克思主义学院','外国语学院','人文与法律学院','国际教育学院','校本级','其他'],
    imgList: [],
  },
  numSteps() {
    this.setData({
      num: this.data.num == this.data.numList.length - 1 ? 1 : this.data.num + 1,
      scrollLeft: this.data.num * 60,
      TabCur: this.data.num + 1
    })
  },
  //模块更改(下一步)
  numSteps_front() {
    this.setData({
      num: this.data.num == this.data.numList.length - 1 ? 2 : this.data.num - 1,
      scrollLeft: this.data.num * 60,
      TabCur: this.data.num - 1
    })
    console.log(this.data.num)
  },
  // 模块更改（上一步）
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  // 选择学院
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
      title: '恩师',
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
  teacher_registe:function(){
    wx.showToast({
      title: '等待中',
      image:'/images/geren/trundle.png',
      duration: 2000
    })
    wx.navigateTo({
      url: '../../teacher_set/teacher_set',
    })
  }
  // 老师认证弹窗等待
})