//app.js
App({
  onLoad:function(){
    console.log("App onLoad")
    
  },
  onLaunch: function () {
    var that = this
    console.log("App OnLaunch")
    wx.login({
      success:function(res){
        console.log(res)
        if(res.code){
              wx.getUserInfo({
              success: function (user) {
                 console.log(user)
                var userinfo = user.userInfo
                var username = userinfo.nickName
                var useravatar =userinfo.avatarUrl
                var usersex=userinfo.gender
                // that.setglobalData({
                //   userInfo :user.userInfo
                // })
                that.globalData.userInfo = user.userInfo
                    wx.request({
                      url: 'https://baby.mamid.cn/User/Public/login',
                      method: 'POST',
                      data: {
                        'code':user.encryptedData,
                        'sscode':res.code,
                        'user_name':username,
                        'user_avatar':useravatar,
                        'user_sex':usersex
                      },
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success: function(res) {
                        console.log(res.data)
                        if(res.data.statusCode==200){
                          that.globalData.userInfo.user_id=res.data.user_id;
                        }
                        
                      }
                  })
              }
            })
        }else{
          consoel.log('获取用户状态失败')
        }
      }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: [],
    
  },
  // 登录
  login:function(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
  },
})