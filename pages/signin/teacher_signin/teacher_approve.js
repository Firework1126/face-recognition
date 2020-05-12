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
  },
  numSteps() {
    this.setData({
      num: this.data.num == this.data.numList.length - 1 ? 0 : this.data.num + 1,
      state:this.data.state + 1
    })
  },
  // 状态图改变
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  //模块更改
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  // 选择学院
})