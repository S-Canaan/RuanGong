// components/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goto:function(e) {
      const det = e.currentTarget.id
      const url = '../../'+det+'/'+det;
      wx.switchTab({
        url:url
      })
    }
  }
})
