//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    houBaoStyle: 1,
    receive_count: 3,
    send_count: 2,
    receive_data:[],
    send_data:[],
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
    wx.request({
      url: 'https://baby.mamid.cn/User/Order/getPersonOrder/uid/'+app.globalData.userInfo.user_id, //仅为示例，并非真实的接口地址
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          receive_data:res.data.receive,
          send_data:res.data.send,
        })
      },
      fail:function (res){
        console.log('fale'+res.data)
      }
    })
  },


})
