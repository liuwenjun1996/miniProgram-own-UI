// pages/home/index.js
const app = getApp();
import {setTabBar,setNavigationBar } from '../../utils/theme.js'
import { showCustomLoading, hideCustomLoading} from '../../utils/util.js'
Page({
  data: {
    loading: {
      msg: '',
      show: true
    },
    _theme: app.global.sysConfig,
    theme: app.global.sysConfig,
  },
  onLoad(options) {
    showCustomLoading(this);
    setNavigationBar();
    app.event.emit('switchTheme',(e)=>{
      this.data._theme = e; //记录新主题
    })
    setTimeout(()=>{
      hideCustomLoading(this)
    },2000)
    this.setData({
      sysConfig: app.global.sysConfig
    })

  },

  onShow(){
    if(this.data._theme.id !== this.data.theme.id) {
      console.log('切换主题')
      //两个主题id不一致，设置新主题
      setTabBar();
      setNavigationBar();
      this.data._theme = this.data.theme;
    }
   
  }
})