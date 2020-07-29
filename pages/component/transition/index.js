// pages/component/transition/index.js
Page({

  data: {
    show: false,
    duration: 3000,
    zIndex: 1,
    modeClass:['fade']
  },

  openModel(){
    this.data.show = true;
    this.setData({
      show: true
    })
  },

  taggleModel(event){
    console.log(event)
  }
  
})