// pages/editEnterprise/editEnterprise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"一家公司",
    date:"",
    num:"91",
    introduction:"我们公司很好我们公司很好我们公司很好我们公司很好我们公司很好",
    inputVisible: false,
    inputText: "",
    key:""
  },
  showInput: function (e) {
    var id = e.currentTarget.id

    this.setData({
      inputVisible: true,
      inputText: this.data[id], // 将输入框内容设置为 view 中的文字
      key:id
    });  
  },
  updateDisplayText: function (e) {
    var key = this.data.key;
    var newData = this.data;
    newData[key] = e.detail.value;
    newData.inputVisible = false;
    this.setData(newData);
  },
  dateChangeHandler: function (event) {
    const date = event.detail.value;
    this.setData({
      date: date
    });
  },
  saveChanges:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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