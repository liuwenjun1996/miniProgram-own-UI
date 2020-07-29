// 根据配置文件动态设置主题
const app = getApp();
// 设置tabbar栏样式 该方法需要在tabbar列表页调用，否则报错
const setTabBar = () => {
  // 设置tab样式
  wx.setTabBarStyle({
    selectedColor: app.global.sysConfig.colorCustom.colorMain
  })
  // 设置tab图标与文字
  app.global.sysConfig.tabbar.map(tab => {
    wx.setTabBarItem(tab)
  })
}
const setNavigationBar = () => {
  wx.setNavigationBarColor({
    backgroundColor: app.global.sysConfig.colorCustom.colorMain,
    frontColor: "#ffffff",
    animation: {
      duration: 400,
      timingFunc: 'linear'
    }
  })
}
module.exports = {
  setTabBar,
  setNavigationBar
}