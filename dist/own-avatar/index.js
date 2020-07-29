/** 
 * own-avatar
 * @description 头像组件
 * @property {String} src 图片路径
 * @property {String} type = [avatar|thumbnail] 组件类型： 头像|缩略图
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
  externalClasses: ['own-avatar-class','own-image-class'],
  properties: {
    src: String,
    type: {
      type: String,
      value: 'avatar' //avatar thumbnail
    },
    mode: {
      type: String,
      value: ''
    },
    lazyLoad: {
      type: Boolean,
      value: false
    },
    width: String,
    height: String,
    radius: String,
    coustomStyle: String,
    mask: {
      type: Boolean,
      value:false
    },
    maskUrl: {
      type: String,
      value: '/assets/imgs/public/saleOver.png'
    }
  },

  data: {

  },
  lifetimes: {
    attached() {
      this.setType();
    }
  },
  attached() {
    this.setType();
  },
  methods: {
    setType() {
      if (this.data.type == 'avatar') {
        !this.data.width && (this.data.width = '72rpx');
        !this.data.height && (this.data.height = '72rpx');
        !this.data.radius && (this.data.radius = '50%');
      }
      if (this.data.type == 'thumbnail') {
        !this.data.width && (this.data.width = '144rpx');
        !this.data.height && (this.data.height = '112rpx');
        !this.data.radius && (this.data.radius = '10rpx');
      }
      this.setData({
        width: this.data.width,
        height: this.data.height,
        radius: this.data.radius
      })
    },
    binderror(event) {
      this.triggerEvent('error', event);
    },
    bindload(event) {
      this.triggerEvent('load', event);
    },
  }
})