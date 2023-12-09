// index.ts
const app = getApp();
Page({
  data: {
    openID:app.globalData.openID,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    // 如需尝试获取用户信息可改为false
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), 
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    selectArray: [
      {
        "id": "0",
        "text": "全部"
      },
      {
        "id": "10",
        "text": "张三"
      },
      {
        "id": "21",
        "text": "李四"
      },
      {
        "id": "21",
        "text": "李四"
      },
      {
        "id": "21",
        "text": "李四"
      }
    ],
  },
  // 事件处理函数
  gotoFunction:function(e){
    this.setData({
      openID:app.globalData.openID
    })
    if(!this.data.openID){
      wx.showToast({
        title: '请先登录',
      })
      return 
    }
    const url = '../functions/' + e.target.id +'/' +e.target.id +'?id='+e.target.id ;
    wx.navigateTo({
      url,
    })
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onshow(){
    this.setData({
      openID:app.globalData.openID
    })
    console.log(this.data.openID,1111);
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  getDate: function (e) {
    console.log(e)//选中的值
  },
})
