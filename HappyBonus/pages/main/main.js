// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    user_avatar:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (user) {
        console.log(user)
        that.setData({
          userInfo: user.userInfo,
          user_avatar: user.userInfo.avatarUrl,
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '卖萌啦'
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

  turnToBaiNianPage: function() {
    wx.navigateTo({
      url: '../bainian_page/bainian_page',
    })
  },

  turnToSelAdorable: function() {
    wx.navigateTo({
      url: '../maimeng_page/maimeng_page',
    })
  }
})