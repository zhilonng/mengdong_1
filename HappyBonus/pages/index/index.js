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
    showModalStatus: false,
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

  //修改金额
  modifyMoney: function() {
    wx.showModal({
      title: '提示',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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

                //跳转页面
                wx.navigateTo({
                  url: '../qr_page/qr_page',
                })
              }
          },
          fail: function(error) {
              console.log(error)
              wx.showToast({
                title: 'fail',
                icon: 'loading',
                duration: 2000
              })

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
  },

  //弹窗逻辑
  modifyMoney: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  } 


})
