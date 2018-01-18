//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    detail_data:[],
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
      url: 'https://baby.mamid.cn/User/User/getMoneyRecord/uid/'+app.globalData.userInfo.user_id, //仅为示例，并非真实的接口地址
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
         detail_data:res.data
        })
      },
      fail:function (res){
        console.log('fale'+res.data)
      }
    })
    wx.setNavigationBarTitle({
      title: '余额明细'
      })
  },

})
