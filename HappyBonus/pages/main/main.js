// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    user_avatar:'',
    showAlert:[],
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
  turnToRecord: function () {
    wx.navigateTo({
      url: '../record/record',
    })
  },
  turnToSelAdorable: function() {
    wx.navigateTo({
      url: '../maimeng_page/maimeng_page',
    })
  },
    alertBox:function (){
    var that=this;
    that.setData({
      showAlert:true
    })
  },
  closeAlaertBox:function(){
    var that=this;
    that.setData({
      showAlert:false
    })
  },
    formSubmit:function(e){
    var that=this;
    var formid=e.detail.formId
    wx.request({
      url: 'https://baby.mamid.cn/User/User/robotNotice', 
      method: 'POST',
      data: {
        form_id:formid,
        user_id:getApp().globalData.userInfo.user_id
      },
      header: { 
        'content-type':'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var notice=res.data.statusCode==200?'开启成功':'开启失败';
        that.setData({
          showAlert:false
        })
        wx.showToast({
          title: notice,
          icon: 'loading',
          duration: 1000
        })
      },
      fail:function (res){
        console.log('fale'+res.data)
      }
    })
  }
})