const app = getApp();
Page({
  data:{},
  onLoad: function (options) {
    this.setData({
      sysConfig: app.global.sysConfig
    })
  },
  onReady(){
    this.topPopup = this.selectComponent('#topPopup');
    this.bottomPopup = this.selectComponent('#bottomPopup');
    this.centerPopup = this.selectComponent('#centerPopup');
    this.leftPopup = this.selectComponent('#leftPopup');
    this.rightPopup = this.selectComponent('#rightPopup');
  },
  openTop(){
    this.topPopup.open();
  },
  openBottom(){
    this.bottomPopup.open();
  },
  openLeft(){
    this.leftPopup.open();
  },
  openRight(){
    this.rightPopup.open();
  },
  openCenter(){
    this.centerPopup.open();
  },
  close(event){
    console.log(event)
  }
})