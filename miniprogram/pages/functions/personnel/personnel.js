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
    personArr:[],
    person:"",
    basicSalary:0,
    workHour:0,
    sInsurance:0,
    mInsurance:0,
    pension:0,
    KPI:0,
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
    const basicSalary = parseInt(this.data.basicSalary);
    const sInsurance = parseInt(this.data.sInsurance);
    const mInsurance = parseInt(this.data.mInsurance);
    const workHour = parseInt(this.data.workHour);
    const pension = parseInt(this.data.pension);
    const KPI = parseInt(this.data.KPI);
    const totalCost = KPI - (basicSalary +  sInsurance + mInsurance )
    this.setData({
      basicSalary,
      workHour,
      pension,
      sInsurance,
      mInsurance,
      KPI,
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
    var newArr = this.data.personArr
    newArr.push(this.data.inputValue);
    console.log(this.data.inputValue);
    this.setData({
      personArr:newArr,
      person:this.data.inputValue,
      addVisible:false
    })
    this.getPersonInfo();
  },
  onChange(e){
    const index = e.detail.value
    this.setData({
      person:this.data.personArr[index]
    })
    this.getPersonInfo();
  },
  updatePersonInfo(){
    const personInfo = {
      name:this.data.person,
      basicSalary:this.data.basicSalary,
      workHour: this.data.workHour,
      sInsurance:this.data.sInsurance,
      mInsurance:this.data.mInsurance,
      pension:this.data.pension,
      KPI:this.data.KPI,
      meet:this.data.meet,
    }
    wx.cloud.callFunction({
      name:"postPersonInfo",
      data:{
        personInfo
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
  getPersonInfo(){
    wx.cloud.callFunction({
      name:"getPersonInfo",
      data:{
        name:this.data.person
      }
    }).then(res => {
      console.log(res);
      const personInfo = res.result.personInfo
      this.setData({
        basicSalary:personInfo.basicSalary,
        workHour: personInfo.workHour,
        sInsurance:personInfo.sInsurance,
        mInsurance:personInfo.mInsurance,
        pension:personInfo.pension,
        KPI:personInfo.KPI,
        meet:personInfo.meet,
      })
      this.updateData();
    })
  },
  deleteSelf(){
    wx.cloud.callFunction({
      name:"deletePersonInfo",
      data:{
        name:this.data.person
      }
    }).then(res => {
      if(res.result.success){
        wx.showToast({
          title: "删除成功",
        })
        wx.cloud.callFunction({
          name:"getAllPersonName"
        }).then(res => {
          const personArr = res.result.data || []
          this.setData({
            person:personArr[0] || '无人员',
            personArr:personArr,
          })
          this.getPersonInfo();
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
      name:"getAllPersonName"
    }).then(res => {
      const personArr = res.result.data || []
      this.setData({
        person:personArr[0] || '无人员',
        personArr:personArr,
      })
        this.getPersonInfo();
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