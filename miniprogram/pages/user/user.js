 
const app = getApp();

Page({
  data: {
    hasUserInfo:false,
    openID:""
  }, 
  onLoad(){
    this.setData({
      openID:app.globalData.openID
    })
    console.log(app.globalData.openID,123123123);
  },
//退出登录
  loginOut() {
    this.setData({
      hasUserInfo:false,
      openID:""
    })
    app.globalData.openID = this.data.openID;
    wx.showToast({
      title: '已退出登录',
    })
  },
 
//获取用户信息
  getUersProfile:function() {
    if(!this.data.hasUserInfo) {
      wx.getUserProfile({
        desc: '登陆后使用全部功能',
        success:(res)=> {
          var userInfo = res.userInfo
          var query = {
            encryptedData:res.encryptedData,
            iv:res.iv,
            rawData:res.rawData,
            signature:res.signature,
          }
          wx.login({
            success:(res) => {
              query.code = res.code;
              console.log(query,"请求对象");
              wx.cloud.callFunction({
                name:"addUer",
                data:{
                  userInfo
                }
              }).then(res => {
                this.setData({
                  hasUserInfo:true,
                  openID:res.result.data._openid
                })
                app.globalData.openID = this.data.openID;
              })

             
              wx.showToast({
                title: '登陆成功',
              })

            },
            fail:(res) => {
              wx.showToast({
                title: '登录失败',
              })
            }
          })
        },
        fail:(res)=> {
          wx.showToast({
            title: '授权失败',
          })
        }
      })
    }
    else {
      wx.showToast({
        title: '您已经登录了',
      })
    }
}
})