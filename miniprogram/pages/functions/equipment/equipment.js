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
    equipmentArr:[],
    equipment:'',
    leaseTerm:"",
    method:"",
    rentalAmount:0,
    lifespan:0,
    value:0,
    otherCost:0,
    usedEffect:"",
  },
  onCustomClick:function(event){
    // 在这里处理自定义组件点击事件的逻辑
    // console.log('自定义组件被点击了', event.detail.message);

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
    const rentalAmount = parseInt(this.data.rentalAmount);
    const otherCost = parseInt(this.data.otherCost);
    const lifespan = parseInt(this.data.lifespan);
    const value = parseInt(this.data.value);
    const totalCost = rentalAmount +  otherCost
    this.setData({
      rentalAmount,
      otherCost,
      lifespan,
      value,
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
    var newArr = this.data.equipmentArr
    newArr.push(this.data.inputValue);
    this.setData({
      equipmentArr:newArr,
      equipment:this.data.inputValue,
      addVisible:false
    })
    this.getEquipmentInfo();
  },
  onChange(e){
    const index = e.detail.value
    this.setData({
      equipment:this.data.equipmentArr[index]
    })
    this.getEquipmentInfo();
  },
  updateEquipmentInfo(){
    const equipmentInfo = {
      name:this.data.equipment,
      leaseTerm:this.data.leaseTerm,
      method: this.data.method,
      rentalAmount:this.data.rentalAmount,
      lifespan:this.data.lifespan,
      value:this.data.value,
      otherCost:this.data.otherCost,
      usedEffect:this.data.usedEffect,
    }
    wx.cloud.callFunction({
      name:"postEquipmentInfo",
      data:{
        equipmentInfo
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
  getEquipmentInfo(){
    wx.cloud.callFunction({
      name:"getEquipmentInfo",
      data:{
        name:this.data.equipment
      }
    }).then(res => {
      console.log(res);
      const equipmentInfo = res.result.equipmentInfo
      this.setData({
        leaseTerm:equipmentInfo.leaseTerm,
        method: equipmentInfo.method,
        rentalAmount:equipmentInfo.rentalAmount,
        lifespan:equipmentInfo.lifespan,
        value:equipmentInfo.value,
        otherCost:equipmentInfo.otherCost,
        usedEffect:equipmentInfo.usedEffect,
      })
      this.updateData();
    })
  },
  deleteSelf(){
    console.log(1);
    wx.cloud.callFunction({
      name:"deleteEquipmentInfo",
      data:{
        name:this.data.equipment
      }
    }).then(res => {
      if(res.result.success){
        wx.showToast({
          title: "删除成功",
        })
        wx.cloud.callFunction({
          name:"getAllEquipmentName"
        }).then(res => {
          const equipmentArr = res.result.data || []
          this.setData({
            equipment:equipmentArr[0] || '无器械',
            equipmentArr:equipmentArr,
          })
          this.getEquipmentInfo();
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
      name:"getAllEquipmentName"
    }).then(res => {
      const equipmentArr = res.result.data || []
      this.setData({
        equipment:equipmentArr[0] || '无器械',
        equipmentArr:equipmentArr,
      })
        this.getEquipmentInfo();
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