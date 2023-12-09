// pages/editEnterprise/editEnterprise.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID:app.globalData.openID,
    address:"",
    name:"",
    date:"",
    num:"",
    introduction:"",
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
      date
    });
  },
  addrChangeHandler: function (event) {
    const address = event.detail.value;
    this.setData({
      address
    });
  },
  saveChanges:function(){
    const enterpriseInfo = {
      name:this.data.name,
      address:this.data.address,
      date:this.data.date,
      num:this.data.num,
      introduction:this.data.introduction,
    }
    wx.cloud.callFunction({
      name:'postEnterprise',
      data:{
        enterpriseInfo
      }
    }).then(res => {
      console.log(res);
      if(res.result.success == true){
        wx.showToast({
          title: '保存成功',
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const enterpriseInfo = JSON.parse(options.enterpriseInfo)
    
    this.setData({
      name:enterpriseInfo.name,
      address:enterpriseInfo.address,
      date:enterpriseInfo.date,
      num:enterpriseInfo.num,
      introduction:enterpriseInfo.introduction,
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