// pages/qr_page/qr_page.js
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
  type:'',
  access_token:'',
  qrcodePic:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '二维码生成中',
    })
    console.log(options)
    var that=this;
    that.setData({
      order_id:options.order_id
    })
    wx.request({
    url: 'https://baby.mamid.cn/User/Order/shareGetOrder/order_id/'+options.order_id, //仅为示例，并非真实的接口地址
    method:'get',
    success: function(res) {
      console.log(getApp().globalData)
      console.log(res.data)
      var data=res.data.show
      that.setData({
        picUrl:data.picurl,
        text:data.text,
        price:data.price,
        nickname:getApp().globalData.userInfo.nickName,
        type:data.order_type,
      })
    }
    })
    wx.request({
      url: 'https://baby.mamid.cn/User/Public/getQrCode/oid/'+that.data.order_id, //仅为示例，并非真实的接口地址
      method:'get',
      success: function(res) {
        if(res.data.statusCode==200){
          wx.hideLoading()
          var url='https://baby.mamid.cn'+res.data.qrcodeurl;
          that.setData({
            qrcodePic:url
          })
        }
        console.log(res.data)
       
      }
    })
    wx.setNavigationBarTitle({
      title: '分享页面'
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
      var str='';
      var type=that.data.type;
      //可以合并
      if(type==1){
        str=' 卖了一个萌'
         return {
          title: getApp().globalData.userInfo.nickName+str,
          desc: that.data.text,
          path: '/pages/sell_adorable_page/sell_adorable_page?id='+that.data.order_id,
          success: function(res) {
          // 转发成功
            wx.redirectTo({
              url: '../sell_adorable_page/sell_adorable_page?order_id='+res.data.order_id,
            })
          },
          fail: function(res) {
            // 转发失败
          }
        }
      }else{
        str=' 向你拜年啦'
         return {
          title: getApp().globalData.userInfo.nickName+str,
          desc: that.data.text,
          path: '/pages/newyear_lucky_page/newyear_lucky_page?id='+that.data.order_id,
          success: function(res) {
          // 转发成功
          wx.redirectTo({
              url: '../newyear_lucky_page/newyear_lucky_page?order_id='+res.data.order_id,
            })
          },
          fail: function(res) {
            // 转发失败
          }
        }
      }
     
  },
  showqrcode:function (){
    var that=this;
    var url=that.data.qrcodePic
    console.log(url)
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
  })
  }
})