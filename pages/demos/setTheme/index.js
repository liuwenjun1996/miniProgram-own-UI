import { theme } from '../../../utils/mode.js';
import {setTabBar,setNavigationBar } from '../../../utils/theme.js'
const app = getApp();
Page({
  data: {
    themeList: theme, //主题列表
    checkTheme:app.global.sysConfig
  },

  
  onLoad (options) {
    setNavigationBar();
    this.setData({
      checkTheme:app.global.sysConfig
    })
  },

  themeChange(e){
    let i = this.data.themeList.map(_theme => _theme.id).indexOf(e.detail.value);
    this.data.checkTheme = this.data.themeList[i];
  },

  submit(){
    app.global.sysConfig = this.data.checkTheme;
    this.setData({
      checkTheme: this.data.checkTheme
    })
    app.event.on('switchTheme',this.data.checkTheme)
    setNavigationBar();
    wx.switchTab({
      url: '/pages/home/index'
    })
  }

})