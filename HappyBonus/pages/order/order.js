// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  picUrl:'',
  text:'',
  price:'',
  order_id:'',
  nickname:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this;
    that.setData({
      order_id:options.id
    })
    wx.request({
    url: 'https://baby.mamid.cn/User/Order/shareGetOrder/order_id/'+that.data.order_id, //仅为示例，并非真实的接口地址
    method:'get',
    success: function(res) {
      console.log(res.data)
      that.setData({
        picUrl:res.data.picurl,
        text:res.data.text,
        price:res.data.price,
        nickname:getApp().globalData.userInfo.nickName,
      })
    }
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
      var that=this;
      var user_id=getApp().globalData.userInfo.user_id
      var name = ''
      return {
        title: '卖了一个萌',
        desc: that.data.text,
        path: '/pages/order/order?id='+that.data.order_id,
        success: function(res) {
        // 转发成功
        },
        fail: function(res) {
          // 转发失败
        }
      }
  },
})