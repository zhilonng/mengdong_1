// pages/bainian_page/bainian_page.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    user_avatar: '',
    choseimg: '',
    picRandName: '',
    title:'',
    token : '',
    picUrl:''
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
      title: '拜年'
      })
    wx.request({
      url: 'https://baby.mamid.cn/User/Upload/getToken', 
      method: 'POST',
      data: {},
      header: { 
        'content-type':'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          token:res.data,
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
  chosePhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          choseimg: res.tempFilePaths[0],
          picRandName: Math.random().toString(36).substr(2)
        })
      }
    })
  },
  titleinput:function (e) {
    var that=this;
    console.log(e.detail.value)
    var con=e.detail.value;
    if(con!=''){
      that.setData({
        title:con
      })
    }
  },
  orderbtn: function () {
    var that=this;
    var upload = function() {
    console.log('开始上传图片了')
    wx.uploadFile({
      url: 'https://up.qbox.me',
      filePath: that.data.choseimg,
      name: 'file',
      formData: {
          'key': that.data.picRandName ,
          'token': that.data.token
      },
      success: function(result) {
          console.log(result)
          if(result.statusCode==200){
            that.setData({
              picUrl:'http://p2bl4mkhf.bkt.clouddn.com/'+that.data.picRandName,
            })
            createOrder();
          }
      },
      fail: function(error) {
          console.log(error)
          wx.showToast({
            title: '图片上传失败',
            icon: 'loading',
            duration: 2000
          })
      }
    })
    }
    var createOrder=function () {
      var title=that.data.title==''?'恭喜发财，红包拿来':that.data.title;
      wx.request({
        url: 'https://baby.mamid.cn/User/Order/createOrder', //仅为示例，并非真实的接口地址
        method: 'POST',
        data:{
          uid:that.data.userInfo.user_id,
          picUrl:that.data.picUrl,
          qrcodeUrl:'',
          order_type:2,
          text:title,
          price:0
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.redirectTo({
            url: '../qr_page/qr_page?order_id='+res.data.order_id,
          })
        },
        fail:function (res){
          console.log('fale'+res.data)
        }
      })
    }
    if(that.data.choseimg.length!=0){
      upload();
    }
  }
})