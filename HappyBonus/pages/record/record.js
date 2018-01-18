//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    houBaoStyle: 1,
    receive_count: 3,
    send_count: 2,
    receive_data:[],
    send_data:[],
    detail_data:[],
  },
  //事件处理函数
  ChangeTab: function (e) {
    var that = this;
    console.log("currentTab")
    var currentTab = e.currentTarget.dataset.id;
    that.setData({
      houBaoStyle: currentTab,
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://baby.mamid.cn/User/Order/getPersonOrder/uid/'+app.globalData.userInfo.user_id, //仅为示例，并非真实的接口地址
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          receive_data:res.data.receive,
          send_data:res.data.send,
          detail_data:res.data.detail,
        })
      },
      fail:function (res){
        console.log('fale'+res.data)
      }
    })
    wx.setNavigationBarTitle({
      title: '个人记录'
      })
  },
  turnTopage:function (e) {
    console.log(e)
    var id=e.currentTarget.dataset.index
    var type=e.currentTarget.dataset.type
    if(type==1){
      var url='../sell_adorable_page/sell_adorable_page?id='+id
    }else{
      var url='../newyear_lucky_page/newyear_lucky_page?id='+id
    }
    wx.navigateTo({
      url: url 
    })

  }


})
