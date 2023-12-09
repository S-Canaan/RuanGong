// pages/enterprise/enterprise.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID:app.globalData.openID,
    name:"",
    address:"",
    date:"",
    num:"",
    introduction:"",
  },
  gotoEdit: function(){
    const enterpriseInfo = {
      name:this.data.name,
      address:this.data.address,
      date:this.data.date,
      num:this.data.num,
      introduction:this.data.introduction,
    }
    wx.navigateTo({
      url: '../editEnterprise/editEnterprise?enterpriseInfo=' + JSON.stringify(enterpriseInfo),
    })
  },
  loadData(){
    this.setData({
      openID:app.globalData.openID
    })
    wx.cloud.callFunction({
      name:'getEnterpriseInfo'
    }).then(res => {
      const enterpriseInfo = res.result.enterpriseInfo
      this.setData({
        name:enterpriseInfo.name,
        address:enterpriseInfo.address,
        date:enterpriseInfo.date,
        num:enterpriseInfo.num,
        introduction:enterpriseInfo.introduction,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})