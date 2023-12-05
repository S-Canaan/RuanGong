// Componet/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propArray: {
      type: Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false,//初始option不显示
    nowText: "",//初始内容
    animationData: {},//右边箭头的动画
    selectData:[]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    selectToggle: function () {
      this.setData({
        selectData: JSON.parse(JSON.stringify(this.properties.propArray))
      })
      var nowShow = this.data.selectShow;//获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },
    //设置内容
    setText: function (e) {
      var nowData = this.properties.propArray;//当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIndx = e.target.dataset.index;//当前点击的索引
      var nowText="";
      // var nowText = nowData[nowIndx].text;//当前点击的内容
      for (var i in nowData){
        if (nowData[i].id == nowIndx){
          console.log(nowData[i].text)
          nowText = nowData[i].text;//当前点击的内容
          break;
        }
      }
      // var nowIdx = nowData[nowIndx].id;
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      this.setData({
        selectShow: false,
        nowText: nowText,
        animationData: this.animation.export()
      })

      var nowDate = {
        id: nowIndx,
        text: nowText
      }
      this.triggerEvent('myget', nowDate)
    },
    vagueFun:function(e){
      // console.log(this.data.selectData)
      var data=[]
      console.log(this.properties.propArray)
      for (var i in this.properties.propArray){
        // console.log(this.properties.propArray[i].text)
        console.log(this.properties.propArray[i].text)
        var y=this.properties.propArray[i].text.indexOf(e.detail.value)
        console.log(y)
        console.log(this.properties.propArray[y])
        if(y!=-1){
          data.push({
            id: this.properties.propArray[i].id,
            text: this.properties.propArray[i].text
          })
        }
      }

      this.setData({
        selectData: data
      })
      
    }
  }
})

