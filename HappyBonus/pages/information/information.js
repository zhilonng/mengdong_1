// pages/newyear_lucky_page/newyear_lucky_page.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var user_id=options.user_id;
    wx.request({
      url: 'https://baby.mamid.cn/User/User/getNoRecord/user_id/' + user_id, //仅为示例，并非真实的接口地址
      method: 'get',
      success: function (res) {
        console.log(res.data)
        if(res.data.statusCode==200){
          that.setData({
            record:res.data.data
          })
        }
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
  turnToPage:function (e) {
    var that=this
    var id=e.currentTarget.dataset.id
    var turnTo=function(){
      if(e.currentTarget.dataset.type==1){
        var url='../newyear_lucky_page/newyear_lucky_page?id='+id;
      }else{
        var url='../sell_adorable_page/sell_adorable_page?id='+id;
      }
      wx.navigateTo({
        url: url,
      })
      var data=that.data.record
      //为了防止循环删除后元素位置被取代 所以用i=i-1
      for (var i = 0; i < data.length; i++) {
        if(data[i].order_id==id){
          data.splice(i,1);
          i=i-1;
        }
      }
      that.setData({
        record:data
      })
    }
    wx.request({
      url: 'https://baby.mamid.cn/User/User/turnToread/order_id/' + id, //仅为示例，并非真实的接口地址
      method: 'get',
      success: function (res) {
        console.log(res.data)
        if(res.data.statusCode==200){
         turnTo();
        }
      }
    })
  },

})