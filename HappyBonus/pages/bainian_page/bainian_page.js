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
    picUrl:'',
    showAlert:false,
    newOrder:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.hideShareMenu()
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
    that.setData({
      title:con
    })
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
      var title=that.data.title==''?'恭喜发财，红包拿来！':that.data.title;
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
          that.setData({
              newOrder:res.data.order_id,
              showAlert:true,
            })
        },
        fail:function (res){
          console.log('fale'+res.data)
        }
      })
    }
    if(that.data.choseimg.length!=0){
      if(that.data.title.length>15){
        wx.showModal({
          title: '拜年提醒',
          content: '标题最多15个字',
          showCancel:false
        })
      }else{
        upload();
      }
    }else{
      wx.showModal({
        title: '拜年',
        content: '请添加一张图片再开始拜年吧',
        showCancel:false
      })
    }
  },
    closeAlaertBox:function(){
    var that=this;
    that.setData({
      showAlert:false
    })
    wx.redirectTo({
      url: '../newyear_lucky_page/newyear_lucky_page?id='+that.data.newOrder,
    })
  },
  formSubmit:function(e){
    var that=this;
    var formid=e.detail.formId
    wx.request({
      url: 'https://baby.mamid.cn/User/User/getBuyNotice', 
      method: 'POST',
      data: {
        form_id:formid,
        user_id:getApp().globalData.userInfo.user_id,
        order_id:that.data.newOrder
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
        wx.redirectTo({
          url: '../newyear_lucky_page/newyear_lucky_page?id='+that.data.newOrder,
        })
      },
      fail:function (res){
        console.log('fale'+res.data)
      }
    })
  }
})