// pages/enterprise/enterprise.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID:app.globalData.openID,
    enterName:"企业名称",
    enterAddress:"企业地址"
  },
  gotoEdit: function(){
    wx.navigateTo({
      url: '../editEnterprise/editEnterprise',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      openID:app.globalData.openID
    })
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
    this.setData({
      openID:app.globalData.openID
    })
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