
/**
 * own-item
 * @description 可设置文本、图标、头像、缩略图等元素
 * @property {Boolean} start = [true|false] 是否开启头部元素
 * @property {Boolean} end = [true|false] 是否开启尾部元素
 * @property {String} url 跳转的页面链接（在小程序内定义的页面）
 * @property {Boolean} link = [true|false] 是否开启链接模式（尾部出现箭头图标）
 * @property {String} linkType = [navigateTo|switchTab|reLaunch|redirectTo|custom] 跳转页面方式
 * @property {String} linkIcon = [enter|...] 链接模式图标，默认右箭头
 * @property {String} linkColor = [#ccc|...] 链接模式图标颜色，默认#ccc
 * @property {String} linkSize = [36rpx|...] 链接模式图标尺寸，默认36rpx
 * @property {String} flex = [start|center|end] flex对齐方式
 * @event {function} tap linkType为custom触发该事件
 */
import componentBehaviors from '../components-behavior.js';
Component({
  behaviors: [componentBehaviors],
  options: {
    multipleSlots: true
  },
  externalClasses: ['own-item-class','own-start-class','own-inner-class','own-end-class','own-link-class'],
  properties: {
    start: {
      type: Boolean,
      value: false
    },
    end: {
      type: Boolean,
      value: false
    },
    url: String,
    link: {
      type: Boolean,
      value:false
    },
    linkType: {
      type: String,
      value:'navigateTo'  
    },
    linkIcon: {
      type: String,
      value: 'enter'
    },
    linkColor: {
      type: String,
      value: '#ccc'
    },
    linkSize: {
      type: String,
      value: '36rpx'
    },
    flex: {
      type: String,
      value: 'center'
    }
  },
  lifetimes: {
    attached() {
    }
  },
  attached() {
  },
  data: {

  },
  methods: {
    // 组件自带跳转事件
    _tap(){
      if(this.data.link) {
        if(this.data.url && this.data.linkType != 'custom') {
          wx[this.data.linkType]({ url: this.data.url });
        }
        if(this.data.linkType == 'custom') {
          this.triggerEvent('tap', url);
        }
      }
    }
  }
})