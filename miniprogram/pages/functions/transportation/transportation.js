// pages/functions/management/management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'当月',
  },
  onCustomClick:function(event){
    // 在这里处理自定义组件点击事件的逻辑
    // console.log('自定义组件被点击了', event.detail.message);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.setData({
      id:id,
    })
  },
  onChange: function(event){
    const date = event.detail.value.slice(0,7);
    console.log(date);
    this.setData({
      date: date
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.selectComponent('#navigation').setData({
      indexId: this.data.id,
    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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