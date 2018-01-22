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
    loadpage:1,
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
    wx.hideShareMenu()
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
      title: '记录'
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
  },
  // 上拉加载
lower:function(e){
  console.log('lower')
  var that=this
  var oldpage=that.data.loadpage
  var action = function(){
    wx.request({
      url: 'https://baby.mamid.cn/User/Order/lowerLoadpage/uid/'+app.globalData.userInfo.user_id+'/loadpage/'+that.data.loadpage+'/style/'+that.data.houBaoStyle,
      method: 'GET',
      success:function(res) {
        console.log(res.data)
        if(res.data.statusCode==200){
          wx.showLoading({
            title: '加载中',
          })
          that.setData({
            loadpage:oldpage+1
          })
          if(that.data.houBaoStyle==1){
            var receive_data=that.data.receive_data
            for(var i=0;i<res.data.data.length;i++){
              receive_data.push(res.data.data[i])
            }
            that.setData({
              receive_data:receive_data
            })
          }else{
            var send_data=that.data.send_data
            console.log(send_data);
            for(var i=0;i<res.data.data.length;i++){
              send_data.push(res.data.data[i])
            }
            wx.hideLoading()
            that.setData({
              send_data:send_data
            })
          }
        }else{
          wx.hideLoading()
          wx.showToast({
            title: '无更多记录',
            icon: 'loading',
            duration: 1000
          })
          return false;
        }
      }
    })
  }
  if(that.data.houBaoStyle<3){
    action();
  }

}



})
