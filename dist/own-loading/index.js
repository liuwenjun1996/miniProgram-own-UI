/**
 * own-loading
 * @description 数据加载组件
 * @property {Boolean} show 是否展示loading组件
 * @property {String} msg 组件上显示的文字
 */
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    msg: {
      type: String,
      value: '加载中...'
    }
  },
  data: {
    sysConfig: getApp().global.sysConfig
  },
  methods: {

  }
})
