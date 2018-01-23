// pages/common_problem_page/common_problem_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    wx.setNavigationBarTitle({
      title: '提现相关问题'
      })
    var that=this;
    wx.request({
    url: 'https://baby.mamid.cn/User/Public/getCommonquestion', //仅为示例，并非真实的接口地址
    method:'get',
    success: function(res) {
      console.log(res.data)
      that.setData({
        data:res.data
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
  
  },

  showOrHide:function(e) {
    var index=e.currentTarget.dataset.index
    console.log(index)
    var that = this;
    var newdata=that.data.data
    console.log(newdata[index].is_show)
    newdata[index].is_show==0?newdata[index].is_show=1:newdata[index].is_show=0
    // newdata.index.show=1
    that.setData({
      data:newdata,
    })
  }
})