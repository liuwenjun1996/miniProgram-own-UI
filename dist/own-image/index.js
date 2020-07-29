/** 
 * own-avatar
 * @description 图片组件
 * @property {String} src 图片路径
 * @property {String} mode 图片模式，值与小程序图片组件中提供的值一样
 * @property {Boolean} lazyLoad = [false|true] 是否开启图片懒加载
 * @property {String} width 图片宽度
 * @property {String} height 图片高度
 * @property {String} radius 图片圆角
 * @property {String} coustomStyle 自定义样式
 * @property {Boolean} mask = [true|false] 蒙层（额外参数）
 * @property {String} maskUrl 蒙层图片  
 * @event {function} error 图片加载错误触发事件
 * @event {function} load 图片加载完成触发事件
*/
'use strict';
import componentBehaviors from '../components-behavior.js';
Component({
  behaviors: [componentBehaviors],
  externalClasses:['own-image-class'],
  properties: {
    src: String,
    mode: {
      type: String,
      value: 'widthFix'
    },
    lazyLoad: {
      type: Boolean,
      value: false
    },
    width: {
      type: String,
      value: "100%"
    },
    height: {
      type: String,
      value: "100%"
    },
    radius: {
      type: String,
      value: '0rpx'
    },
    coustomStyle:String,
    mask: {
      type: Boolean,
      value:false
    },
    maskUrl: {
      type: String,
      value: '/assets/imgs/public/saleOver.png'
    }
  },

  methods: {
    binderror(event) {
      this.triggerEvent('error', event);
    },
    bindload(event) {
      this.triggerEvent('load', event);
    },
  }
})
