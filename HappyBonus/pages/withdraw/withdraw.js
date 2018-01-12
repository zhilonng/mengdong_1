// pages/withdraw/withdraw.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    userMoney: 0,
    allMoney:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = app.globalData.userInfo;
    that.setData({
      userInfo: app.globalData.userInfo,
    })
      wx.setNavigationBarTitle({
      title: '余额提现'
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
    var that = this;
    wx.request({
      url: 'https://baby.mamid.cn/User/User/getmoney/uid/' + that.data.userInfo.user_id, //仅为示例，并非真实的接口地址
      method: 'get',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userMoney: res.data.user_money
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
  withdrawBtn: function () {
    wx.navigateTo({
      url: 'withdraw/withdraw'
    })

  },
  inpuCheck: function (e){
    var that=this;
    var now=that.data.userMoney
    if(e.detail.value>now){
      wx.showToast({
        title: '余额不足',
        icon: 'fail',
        duration: 1000
      })
    }
    if(e.detail.value!='' && e.detail.value<1){
       wx.showToast({
        title: '提现最低一元',
        icon: 'fail',
        duration: 1000
      })
    }
    console.log(e.detail.value)
  },
  allbtn:function (){
    var that=this;
    that.setData({
      allMoney:that.data.userMoney
    })
  },
})