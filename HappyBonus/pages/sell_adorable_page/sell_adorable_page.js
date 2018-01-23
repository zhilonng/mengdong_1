// pages/sell/sell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    text: '',
    price: '',
    order_id: '',
    nickname: '',
    user_avatar: '',
    record: [],
    showBuybox: 0,
    clickDialog: 0,
    showAlert: false,
    showNotice: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    if (options.from == 'tmpmsg') {
      console.log('From tmpmsg')
      that.setData({
        showNotice: true,
      })
    }
    that.setData({
      order_id: options.id,
    })
    wx.request({
      url: 'https://baby.mamid.cn/User/Order/shareGetOrder/order_id/' + that.data.order_id, //仅为示例，并非真实的接口地址
      method: 'get',
      success: function (res) {
        console.log(res.data)
        var data = res.data.show
        that.setData({
          picUrl: data.picurl,
          text: data.text,
          price: data.price,
          nickname: data.nickname,
          user_avatar: data.user_avatar,
          record: res.data.record,
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
  buyBtn: function () {
    var that = this;
    that.setData({
      showBuybox: 1,
      showAlert: true
    })
  },
  payBtn: function () {
    var that = this;
    wx.request({
      url: 'https://baby.mamid.cn/User/Pay/payJoinfee', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        uid: getApp().globalData.userInfo.user_id,
        order_id: that.data.order_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.statusCode == 200) {
          var result = res.data
          wx.requestPayment({
            'timeStamp': result.timeStamp,
            'nonceStr': result.nonceStr,
            'package': result.package,
            'signType': 'MD5',
            'paySign': result.paySign,
            'complete': function (res) {
              console.log(res)
              if (res.errMsg == 'requestPayment:ok') {
                var newarr = {};
                newarr.pay_uid = getApp().globalData.userInfo.user_id;
                newarr.buy_time = '刚刚';
                newarr.pay_price = that.data.price;
                newarr.buy_useravatar = getApp().globalData.userInfo.avatarUrl;
                newarr.buy_username = getApp().globalData.userInfo.nickName;
                console.log(newarr);
                var record = that.data.record;
                record.unshift(newarr)
                that.setData({
                  showBuybox: 2,
                  record: record
                })
                that.setData({
                  showBuybox: 2
                })
              } else {
                wx.showToast({
                  title: '支付失败',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '支付订单创建失败，请稍后再试',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  more_game: function () {
    wx.reLaunch({
      url: '../main/main'
    })
  },
  onShareAppMessage: function () {
    var that = this;
    var nickname = that.data.nickname
    return {
      title: nickname + '卖了一个萌',
      desc: that.data.text,
      path: '/pages/sell_adorable_page/sell_adorable_page?id=' + that.data.order_id,
    }
  },

  closeOrPreview: function () {
    var that = this;
    if (that.data.showBuybox == 1 || that.data.showBuybox == 2) {
      if (that.data.clickDialog == 0) {
        that.setData({
          showBuybox: 0,
        })
      } else {
        that.setData({
          clickDialog: 0,
        })
      }
    } else {
      wx.previewImage({
        current: that.data.picUrl, // 当前显示图片的http链接
        urls: [that.data.picUrl] // 需要预览的图片http链接列表
      })
    }
  },
  closeBox: function () {
    var that = this;
    that.setData({
      showBuybox: 0,
      showAlert: false
    })
  },
  turnToRecord: function () {
    wx.navigateTo({
      url: '../record/record',
    })
  },
  turnToMaimeng: function () {
    wx.navigateTo({
      url: '../sell_adorable_page/sell_adorable_page',
    })
  }, turnToFriend: function () {
    var that = this
    wx.navigateTo({
      url: '../qr_page/qr_page?order_id=' + that.data.order_id,
    })
  },
  closeAlaertBox: function () {
    var that = this;
    console.log('close')
    that.setData({
      showNotice: false
    })
  },
  formSubmit: function (e) {
    var that = this;
    var formid = e.detail.formId
    wx.request({
      url: 'https://baby.mamid.cn/User/User/getBuyNotice',
      method: 'POST',
      data: {
        form_id: formid,
        user_id: getApp().globalData.userInfo.user_id,
        order_id: that.data.order_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var notice = res.data.statusCode == 200 ? '开启成功' : '开启失败';
        that.setData({
          showNotice: false
        })
        wx.showToast({
          title: notice,
          icon: 'loading',
          duration: 1000
        })
      },
      fail: function (res) {
        console.log('fale' + res.data)
      }
    })
  }
})