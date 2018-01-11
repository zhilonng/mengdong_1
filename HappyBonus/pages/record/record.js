//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    houBaoStyle: 1,
    receive_count: 3,
    send_count: 2,
  },
  //事件处理函数
  ChangeTab: function (e) {
    var that = this;
    console.log("currentTab")
    var currentTab = e.currentTarget.dataset.id;
    that.setData({
      houBaoStyle: currentTab,
    })
  },
  onLoad: function () {
    var that = this;
  },


})
