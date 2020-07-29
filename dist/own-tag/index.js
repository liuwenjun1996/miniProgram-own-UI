import componentBehaviors from '../components-behavior.js';
/**
 * own-tag
 * @description 标签组件
 * @property {String} msg 标签文字
 * @property {String} color 标签颜色 仅支持16进制 例：#ffffff
 * @property {Boolean} outline = [false|true] 是否为半透明线性
 * @property {Boolean} round = [false|true] 是否为圆角
 */
Component({
  behaviors: [componentBehaviors],
  externalClasses: ['own-tag-class'],
  properties: {
    msg:String,
    color: {
      type: String,
      value: getApp().global.sysConfig.colorCustom.colorMain
    },
    outline: {
      type: Boolean,
      value: false
    },
    size: {
      type: String,
      value: '20rpx'
    },
    round: {
      type: Boolean,
      value: false
    }
  },
  data: {
    bgColor: '',
  },
  lifetimes:{
    attached(){
      this.init()
    }
  },
  attached(){
    this.init()
  },
  methods: {
    init(){
      if(this.data.outline) {
        let _bghex = this.data.color.replace('#','0x');
        // 十六进制颜色值转换为rgba
        this.data.bgColor = `rgba(${_bghex >> 16},${_bghex >> 8 & 0xff},${_bghex & 0xff},0.25)`
      } else {
        this.data.bgColor = this.data.color;
      }
      this.setData({
        bgColor: this.data.bgColor
      })
    }
  }
})
