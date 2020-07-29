const app = getApp();
Page({
  data:{},
  onLoad: function (options) {
    this.setData({
      sysConfig: app.global.sysConfig
    })
  },
})