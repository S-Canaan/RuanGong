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
    integerValue:0,
    totalCost:0,
    managerArr:[],
    manager:'',
    billCost:0,
    meet:"",
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
    const billCost = parseInt(this.data.billCost);
    const totalCost = billCost 
    this.setData({
      billCost,
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
    var newArr = this.data.managerArr
    newArr.push(this.data.inputValue);
    this.setData({
      managerArr:newArr,
      manager:this.data.inputValue,
      addVisible:false
    })
    this.getMaganerInfo();
  },
  onChange(e){
    const index = e.detail.value
    this.setData({
      manager:this.data.managerArr[index]
    })
    this.getMaganerInfo();
  },
  updateMaganerInfo(){
    const managerInfo = {
      name:this.data.manager,
      billCost:this.data.billCost,
      meet: this.data.meet,
    }
    wx.cloud.callFunction({
      name:"postMaganerInfo",
      data:{
        managerInfo
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
  getMaganerInfo(){
    wx.cloud.callFunction({
      name:"getMaganerInfo",
      data:{
        name:this.data.manager
      }
    }).then(res => {
      console.log(res);
      const managerInfo = res.result.managerInfo
      this.setData({
        billCost:managerInfo.billCost,
        meet: managerInfo.meet,
      })
      this.updateData();
    })
  },
  deleteSelf(){
    wx.cloud.callFunction({
      name:"deleteMaganerInfo",
      data:{
        name:this.data.manager
      }
    }).then(res => {
      if(res.result.success){
        wx.showToast({
          title: "删除成功",
        })
        wx.cloud.callFunction({
          name:"getAllMaganerName"
        }).then(res => {
          const managerArr = res.result.data || []
          this.setData({
            manager:managerArr[0] || '无管理人员',
            managerArr:managerArr,
          })
          this.getMaganerInfo();
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
      name:"getAllMaganerName"
    }).then(res => {
      const managerArr = res.result.data || []
      this.setData({
        manager:managerArr[0] || '无管理人员',
        managerArr:managerArr,
      })
        this.getMaganerInfo();
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