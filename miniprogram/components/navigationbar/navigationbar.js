// components/navigationbar/navigationbar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    indexId:{
      type:String,
      observer:function (newValue) {
        this.setData({
          selectedFunction: this.data.functionObj[newValue]
        });
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
    desArr:['management','land','equipment','personnel','transportation','revenue'],
    functionArr:['管理成本核算','土地成本核算','器械租聘成本核算','人员成本核算','运输成本管理','季节性收入'],
    functionObj:{
      management:'管理成本核算',
      land:'土地成本核算',
      equipment:'器械租聘成本核算',
      personnel:'人员成本核算',
      transportation:'运输成本管理',
      revenue:'季节性收入'
    },
    selectedFunction:''
  },
  attached: function() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    gotoBack: function() {
      wx.navigateBack({
        delta: 1 // 返回的页面数，1表示返回上一页
      });
      // this.triggerEvent('customClick', { message: '自定义组件被点击了' }, {});
    },
    gotoHome: function () {
      wx.reLaunch({
        url: '/pages/index/index' // 首页的路径
      });
    },
    onChange: function (event) {
      const index = event.detail.value;
      
      const url = '../' +  this.data.desArr[index] + '/' + this.data.desArr[index] + '?id=' +  this.data.desArr[index]
      wx.navigateTo({
        url
      })
    },
  }
})
