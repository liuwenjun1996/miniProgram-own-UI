/**
 * own-empty
 * @description 空数据占位符
 * @property {String} msg 提示文字
 * @property {String} src 提示图片
 * @property {Boolean} show = [false|true] 是否展示占位符
 */
import componentBehaviors from '../components-behavior.js';
Component({
  behaviors: [componentBehaviors],
  externalClasses: ['own-empty-class'],
  properties: {
    msg: {
      type:String,
      value: '暂无数据'
    },
    src: {
      type: String,
      value:'/dist/common/images/noResult.png'
    },
    show: {
      type: Boolean,
      value:false
    }
  },
  data: {

  },
  methods: {

  }
})
