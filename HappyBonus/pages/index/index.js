//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    houBaoStyle:1,
    userInfo : [],
    choseimg : '' ,
    picRandName:'',
    picUrl:'',
    price:'',
    uid:'',
    text:'',
    token : '',
    shuoming1:'小伙伴们说对口令就能获得随即打赏',
    shuoming2:'好友听完你说的话就能领取赏金',
    shuoming3:'好友念出你的答案就能领取赏金',
    kongling:'',
    Money:'',
    Number:'',
    answer:'',
  },
  //事件处理函数
  ChangeTab:function(e){
    var that = this;
    console.log("currentTab")
    var currentTab = e.currentTarget.dataset.id;
    that.setData({
      houBaoStyle: currentTab,
    })
  },
  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success:function(user){
        console.log(user)
        that.setData({
          userInfo:user.userInfo,
          choseimg:user.userInfo.avatarUrl,
        })
      }
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


  // 获取语音
  startVoice: function () {
    console.log("开始录音");
    wx.startRecord({
      success: function (res) {
        console.log("录音结束")
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);

      },
      fail: function () {

      }
    })
    setTimeout(function () {
      wx.stopRecord({
        success: function (res) {
          console.log(res)
        }
      });
    }, 10000)
  },
  endstartVoice: function () {
    wx.stopRecord({
      success: function (res) {
        console.log(res)
      }
    });
  },

  // 跳转链接

  tomyRecord:function(){
    var that = this;
    wx.navigateTo({
      url: './mRecord/myRecord',
    })

  },
  // 获取页面填入的值
  koulingInput:function(e){
    var that = this;
    console.log(e.detail.value)
    that.setData({
      kouling:e.target.value,
    })
  },
  MoneyInput:function(e){
    var that = this;
    console.log(e.detail.value)
    that.setData({
      Money: e.target.value,
    })
  },
  NumberInput: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      Number: e.target.value,
    })
  },
  jubenAnswerInput:function(e){
    var that = this;
    console.log(e.detail.value);
    that.setData({
      answer:e.detail.value,
    })
  },
  pubimg:function(){
    var that=this;
      wx.chooseImage({
        count: 1, 
        sizeType: ['compressed'], 
        sourceType: ['album', 'camera'],
        success: function(res){
        that.setData({
           choseimg:res.tempFilePaths[0],
           picRandName:Math.random().toString(36).substr(2)
        })
        }
      })    
  },
  tapshare:function(){
    var that= this;
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
                  uid:101074,
                  price:9.99,
                  text:'卖萌',
                })
                createOrder();
              }
          },
          fail: function(error) {
              console.log(error)
          }
      })
    }
   var createOrder=function(){
        //开始图文入库
      wx.request({
        url: 'https://baby.mamid.cn/User/Order/createOrder',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          picUrl:that.data.picUrl,
          uid:that.data.uid,
          price:that.data.price,
          text:that.data.text,
      },
      //发布图片成功
      success:function(res){
      console.log(res)
      if(res.statusCode==200){
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 500
        })
        //跳转到分享页面
      }
      }
    })
    }
    if(that.data.choseimg.length!=0){
      upload();
    }
  }


})
