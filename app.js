//app.js
import { theme } from './utils/mode.js';
import Event from './utils/event.js';
App({
  global: require('./services/global.js'),
  event: new Event(),
  onLaunch: function () {
    this.global.sysInfo = wx.getSystemInfoSync();
    this.global.sysConfig = theme[1]; //设置主题
  }
})