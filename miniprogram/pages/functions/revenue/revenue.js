// pages/functions/management/management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVisible:false,
    // addVisible:false,
    key:"",
    inputValue:"",
    totalCost:0,
    seasonArr:['春季','夏季','秋季','冬季'],
    season:'春季',
    type:"",
    seed:0,
    water:0,
    spread:0,
    harvest:0,
    gains:0,
  },
  showInput(e){
    var id = e.currentTarget.id
    this.setData({
      inputVisible: true,
      inputText: this.data[id], // 将输入框内容设置为 view 中的文字
      key:id
    });  
  },
  confirm() {
    var key = this.data.key;
    var newData = this.data;
    newData[key] = this.data.inputValue;
    newData.inputVisible = false;
    this.setData(newData);
    this.updateData();
  },
  back(){
    this.setData({
      inputVisible:false
    })
  },
  updateDisplayText(e) {
    this.setData({
      inputValue: e.detail.value // 更新 inputValue 数据
    });
  },
  updateData() {
    const seed = parseInt(this.data.seed);
    const water = parseInt(this.data.water);
    const spread = parseInt(this.data.spread);
    const harvest = parseInt(this.data.harvest);
    const gains = parseInt(this.data.gains);
    const totalCost =  gains - (seed +  water + spread + harvest)
    this.setData({
      seed,
      water,
      spread,
      harvest,
      gains,
      totalCost
    })
  },
  onChange(e){
    const index = e.detail.value
    this.setData({
      season:this.data.seasonArr[index]
    })
    this.getSeasonInfo();
  },
  updateSeasonInfo(){
    const seasonInfo = {
      name:this.data.season,
      type:this.data.type,
      seed: this.data.seed,
      water:this.data.water,
      spread:this.data.spread,
      harvest:this.data.harvest,
      gains:this.data.gains,
    }
    wx.cloud.callFunction({
      name:"postSeasonInfo",
      data:{
        seasonInfo
      }
    }).then(res => {
      if(res.result.success){
        wx.showToast({
          title: '更新成功',
        })
      }else{
        wx.showToast({
          title: '更新失败',
        })
      }
    })
  },
  getSeasonInfo(){
    wx.cloud.callFunction({
      name:"getSeasonInfo",
      data:{
        name:this.data.season
      }
    }).then(res => {
      console.log(res);
      const seasonInfo = res.result.seasonInfo
      this.setData({
        type:seasonInfo.type,
        seed: seasonInfo.seed,
        water:seasonInfo.water,
        spread:seasonInfo.spread,
        harvest:seasonInfo.harvest,
        gains:seasonInfo.gains,
      })
      this.updateData();
    })
  },
  deleteSelf(){
    wx.cloud.callFunction({
      name:"deleteSeasonInfo",
      data:{
        name:this.data.season
      }
    }).then(res => {
      if(res.result.success){
        wx.showToast({
          title: "删除成功",
        })
      }
      else{
        wx.showToast({
          title:"删除失败",
        })
      }
     
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.setData({
      id
    })
    this.getSeasonInfo();

    // wx.cloud.callFunction({
    //   name:"getAllSeasonName"
    // }).then(res => {
    //   const seasonArr = res.result.data || []
    //   this.setData({
    //     season:seasonArr[0] || '无人员',
    //     seasonArr:seasonArr,
    //   })
    //     this.getSeasonInfo();
    // })
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