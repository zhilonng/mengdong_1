// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    userMoney:0,
    user_avatar:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;
   var userInfo = app.globalData.userInfo;
   that.setData({
     userInfo: app.globalData.userInfo,
     user_avatar: app.globalData.userInfo.avatarUrl,
   })
   wx.setNavigationBarTitle({
      title: '个人主页'
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.request({
      url: 'https://baby.mamid.cn/User/User/getmoney/uid/'+that.data.userInfo.user_id, //仅为示例，并非真实的接口地址
      method:'get',
      success: function(res) {
        console.log(res.data)
        that.setData({
          userMoney:res.data.user_money
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  withdrawBtn : function (){
    console.log('haa')
    wx.navigateTo({
      url: '../withdraw/withdraw'
    })

  },
  turnToRecord: function() {
    wx.navigateTo({
      url: '../record/record',
    })
  },
  turnToMoneyrecord:function (){
    wx.navigateTo({
      url: '../money_record_page/money_record_page',
    })
  }
})