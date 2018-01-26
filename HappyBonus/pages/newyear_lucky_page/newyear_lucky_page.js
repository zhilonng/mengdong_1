// pages/newyear_lucky_page/newyear_lucky_page.js
var app = getApp();
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
    pubUid: '',
    user_id: 0,
    share_img:'',
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
    if (getApp().globalData.userInfo.user_id != undefined) {
      that.setData({
        user_id: getApp().globalData.userInfo.user_id
      })
    }
    if (options.scene) {
      that.setData({
        order_id: options.scene
      })
    } else {
      that.setData({
        order_id: options.id
      })
    }

    wx.request({
      url: 'https://baby.mamid.cn/User/Order/shareGetOrder/order_id/' + that.data.order_id, //仅为示例，并非真实的接口地址
      method: 'get',
      success: function (res) {
        console.log(res.data)
        var data = res.data.show
        that.setData({
          picUrl: data.picurl,
          text: data.text,
          nickname: data.nickname,
          user_avatar: data.user_avatar,
          record: res.data.record,
          pubUid: data.uid,
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

  onShareAppMessage: function () {
    var that = this;
    var nickname = that.data.nickname
    return {
      title: that.data.text,
      desc: nickname + '来拜年啦',
      path: '/pages/newyear_lucky_page/newyear_lucky_page?id=' + that.data.order_id,
    }
  },
  more_game: function () {
    console.log(22)
    wx.reLaunch({
      url: '../main/main'
    })
  },
  buyBtn: function () {
    var that = this;
    that.setData({
      showBuybox: 1,
      clickDialog: 0,
      showAlert: true

    })
  },
  payBtn: function () {
    var that = this;
    var payJoinfee = function () {
      wx.request({
        url: 'https://baby.mamid.cn/User/Pay/payJoinfee', //仅为示例，并非真实的接口地址
        method: 'POST',
        data: {
          uid: getApp().globalData.userInfo.user_id,
          order_id: that.data.order_id,
          price: that.data.price
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.hideLoading()
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
                  //成功
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

                } else if (res.errMsg == "requestPayment:fail cancel") {
                  wx.showToast({
                    title: '取消支付',
                    icon: 'fail',
                    duration: 2000
                  })
                } else {
                  wx.showToast({
                    title: '支付失败',
                    icon: 'fail',
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
    }
    if (that.data.price == '' || that.data.price == 0 || that.data.price > 999) {
      wx.showModal({
        title: '支付提醒',
        content: '价格需要大于0元且小于999',
        showCancel: false
      })
      that.setData({
        price: 8.88
      })
    } else {
      wx.showLoading({
        title: '支付中',
      })
      payJoinfee();
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
      console.log(that.data.picUrl)
      wx.previewImage({
        current: that.data.picUrl, // 当前显示图片的http链接
        urls: [that.data.picUrl] // 需要预览的图片http链接列表
      })
    }
  },
  closeBox: function () {
    var that = this;
    if (that.data.clickDialog == 0) {
      that.setData({
        showBuybox: 0,
        showAlert: false
      })
    } else {
      that.setData({
        clickDialog: 0
      })
    }

  },
  clickDialog: function () {
    var that = this;
    that.setData({
      clickDialog: 1
    })
  },
  turnToRecord: function () {
    wx.navigateTo({
      url: '../record/record',
    })
  },
  turnToBaiNian: function () {
    wx.navigateTo({
      url: '../bainian_page/bainian_page',
    })
  },
  turnToFriend: function () {
    var that = this
    var show = function(imgurl){
       wx.previewImage({
            current: imgurl, // 当前显示图片的http链接
            urls: [imgurl] // 需要预览的图片http链接列表
        })
    }
    // wx.navigateTo({
    //   url: '../qr_page/qr_page?order_id=' + that.data.order_id,
    // })
     wx.showLoading({
      mask:true,
      title: '生成中',
    })
    if(that.data.share_img==''){
      wx.request({
        url: 'https://baby.mamid.cn/User/Public/getQrCode/oid/'+that.data.order_id, //仅为示例，并非真实的接口地址
        method:'get',
        success: function(res) {
          if(res.data.statusCode==200){
            wx.hideLoading()
            var imgurl='https://baby.mamid.cn'+res.data.share_img;
            that.setData({
              share_img:imgurl
            })
            show(imgurl);
          }else{
            wx.showModal({
              title: '提示',
              content: '生成失败，请稍后再试',
              showCancel:false
            })
          }
          console.log(res.data)
        }
      })
    }else{
      wx.hideLoading()
      var imgurl=that.data.share_img;
      show(imgurl)
    }
    
  },
  inpuCheck: function (e) {
    var that = this;
    var money = e.detail.value;
    if (money > 999) {
      wx.showToast({
        title: '价格最高999',
        icon: 'fail',
        duration: 1000
      })
      money = 999
    } else if (money.indexOf(".") != -1) {
      money = money.substring(0, money.indexOf(".") + 3);
    }
    console.log(money)
    that.setData({
      price: money,
    })
  },
  closeAlaertBox: function () {
    var that = this;
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