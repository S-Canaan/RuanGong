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
    landArr:[],
    land:'',
    integerValue:0,
    totalCost:0,
    landPurchaseCost:0,
    serviceLife:0,
    leaseTerm:0,
    rentalAmount:0,
    paymentMethod:"",
    type:"",
    cost:0,
    date:"",
    fixed:"",
    policy:0,
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
    // console.log(this.data.key);
    // this.setData({
    //   [key]:this.data.inputValue
    // })
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
    console.log(e);
    this.setData({
      inputValue: e.detail.value // 更新 inputValue 数据
    });
  },
  updateData() {
    const landPurchaseCost = parseInt(this.data.landPurchaseCost);
    const rentalAmount = parseInt(this.data.rentalAmount);
    const cost = parseInt(this.data.cost);
    const integerValue = Math.ceil((landPurchaseCost+rentalAmount+cost)*(this.data.policy/100));
    const totalCost = landPurchaseCost +  rentalAmount + cost - integerValue
    this.setData({
      integerValue,
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
    var newArr = this.data.landArr
    newArr.push(this.data.inputValue);
    this.setData({
      landArr:newArr,
      land:this.data.inputValue,
      addVisible:false
    })
    this.getLandInfo();
  },
  onChange(e){
    const index = e.detail.value
    this.setData({
      land:this.data.landArr[index]
    })
    this.getLandInfo();
  },
  updateLandInfo(){
    const landInfo = {
      name:this.data.land,
      landPurchaseCost:this.data.landPurchaseCost,
      serviceLife:this.data.serviceLife,
      leaseTerm:this.data.leaseTerm,
      rentalAmount:this.data.rentalAmount,
      paymentMethod:this.data.paymentMethod,
      type:this.data.type,
      cost:this.data.cost,
      date:this.data.date,
      fixed:this.data.fixed,
      policy:this.data.policy,
    }
    wx.cloud.callFunction({
      name:"postLandInfo",
      data:{
        landInfo
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
  getLandInfo(){
    wx.cloud.callFunction({
      name:"getLandInfo",
      data:{
        name:this.data.land
      }
    }).then(res => {
      console.log(res);
      const landInfo = res.result.landInfo
      this.setData({
        landPurchaseCost:landInfo.landPurchaseCost,
        serviceLife:landInfo.serviceLife,
        leaseTerm:landInfo.leaseTerm,
        rentalAmount:landInfo.rentalAmount,
        paymentMethod:landInfo.paymentMethod,
        type:landInfo.type,
        cost:landInfo.cost,
        date:landInfo.date,
        fixed:landInfo.fixed,
        policy:landInfo.policy,
      })
      this.updateData();
    })
  },
  deleteSelf(){
    wx.cloud.callFunction({
      name:"deleteLandInfo",
      data:{
        name:this.data.land
      }
    }).then(res => {
      if(res.result.success){
        wx.showToast({
          title: "删除成功",
        })
        wx.cloud.callFunction({
          name:"getAllLandName"
        }).then(res => {
          const landArr = res.result.data || []
          this.setData({
            land:landArr[0] || '无土地',
            landArr:landArr,
          })
          if(this.data.land != '无土地'){
            this.getLandInfo();
          }
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
      name:"getAllLandName"
    }).then(res => {
      const landArr = res.result.data || []
      this.setData({
        land:landArr[0] || '无土地',
        landArr:landArr,
      })
      if(this.data.land != '无土地'){
        this.getLandInfo();
      }
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
    this.updateData();
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