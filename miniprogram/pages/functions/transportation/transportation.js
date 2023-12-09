// pages/functions/management/management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVisible:false,
    addVisible:false,
    key:"",
    inputValue:"",
    totalCost:0,
    transArr:[],
    trans:"",
    fuel:0,
    car:0,
    road:0,
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
    const fuel = parseInt(this.data.fuel);
    const car = parseInt(this.data.car);
    const road = parseInt(this.data.road);
    const totalCost = fuel +  car + road
    this.setData({
      fuel,
      car,
      road,
      totalCost
    })
  },
  addBack(){
    this.setData({
      addVisible:false
    })
  },
  addArrayItem(){
    this.setData({
      addVisible:true
    })
  },
  addConfirm(){
    var newArr = this.data.transArr
    newArr.push(this.data.inputValue);
    this.setData({
      transArr:newArr,
      trans:this.data.inputValue,
      addVisible:false
    })
    this.getTransInfo();
  },
  onChange(e){
    const index = e.detail.value
    this.setData({
      trans:this.data.transArr[index]
    })
    this.getTransInfo();
  },
  updateTransInfo(){
    const transInfo = {
      name:this.data.trans,
      fuel:this.data.fuel,
      car: this.data.car,
      road:this.data.road,
    }
    wx.cloud.callFunction({
      name:"postTransInfo",
      data:{
        transInfo
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
  getTransInfo(){
    wx.cloud.callFunction({
      name:"getTransInfo",
      data:{
        name:this.data.trans
      }
    }).then(res => {
      console.log(res);
      const transInfo = res.result.transInfo
      this.setData({
        fuel:transInfo.fuel,
        car: transInfo.car,
        road:transInfo.road,
      })
      this.updateData();
    })
  },
  deleteSelf(){
    wx.cloud.callFunction({
      name:"deleteTransInfo",
      data:{
        name:this.data.trans
      }
    }).then(res => {
      if(res.result.success){
        wx.showToast({
          title: "删除成功",
        })
        wx.cloud.callFunction({
          name:"getAllTransName"
        }).then(res => {
          const transArr = res.result.data || []
          this.setData({
            trans:transArr[0] || '无运输记录',
            transArr:transArr,
          })
          this.getTransInfo();
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

    wx.cloud.callFunction({
      name:"getAllTransName"
    }).then(res => {
      const transArr = res.result.data || []
      this.setData({
        trans:transArr[0] || '无运输记录',
        transArr:transArr,
      })
        this.getTransInfo();
    })
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