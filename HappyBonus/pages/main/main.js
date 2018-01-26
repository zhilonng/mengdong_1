// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    user_avatar:'',
    showAlert:[],
    noread:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var timeset= function(){
      setTimeout(function(){
        that.setData({
          userInfo:getApp().globalData.userInfo
        })
        wx.request({
          url: 'https://baby.mamid.cn/User/User/getNoread/user_id/' + that.data.userInfo.user_id, //仅为示例，并非真实的接口地址
          method: 'get',
          success: function (res) {
            console.log(res.data)
            if(res.data.count>0){
              that.setData({
                noread:res.data.count
              })
            }
          }
        })
        console.log(that.data.userInfo.user_id)
        wx.hideLoading()
      },1500)
    }
    wx.getUserInfo({
      success: function (user) {
        console.log(user)
        that.setData({
          userInfo: user.userInfo,
        })
      }
    })
    if(!that.data.userInfo.user_id){
      wx.showLoading({
        title: '加载中',
        mask:true,
      })
      timeset()
    }else{
    }
   
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
    var that=this
    wx.request({
          url: 'https://baby.mamid.cn/User/User/getNoread/user_id/' + that.data.userInfo.user_id, //仅为示例，并非真实的接口地址
          method: 'get',
          success: function (res) {
            console.log(res.data)
              that.setData({
                noread:res.data.count
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
  turnToInformation: function () {
    var that=this
    wx.navigateTo({
      url: '../information/information?user_id='+that.data.userInfo.user_id,
    })
  },
  turnToSelAdorable: function() {
    wx.navigateTo({
      url: '../maimeng_page/maimeng_page',
    })
  },
  onShareAppMessage: function () {
    var that = this;
    var nickname = that.data.nickname
    return {
      title: '卖萌是一件正经事',
      desc: '卖萌啦',
      path: '/pages/main/main',
    }
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