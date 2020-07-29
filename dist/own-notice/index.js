import componentBehaviors from '../components-behavior.js';
/** 
 * 通知栏notice
 * @description 一个带有滚动效果的通知栏/公告栏
 * @property {String} content 公告内容
 * @property {Number} speed 文字滚动的速度，默认100px/秒
 * @property {String} backgroundColor 背景颜色
 * @property {String} color 文字颜色
 * @property {Boolean} single = [true|false] 是否单行
 * @property {Boolean} scrollable = [true|false] 是否滚动，为true时，NoticeBar为单行
 * @property {Boolean} showIcon = [true|false] 是否显示左侧图标
 * @property {String} iconName = 'systemprompt' 默认喇叭图标
 * @property {String} iconColor  左侧图标图标，默认系统主题色
 * @property {String} iconSize 左侧图标大小，默认48rox
 * @property {Boolean} showClose = [true|false] 是否显示左侧关闭按钮
 * @property {Boolean} showMore = [true|false] 是否显示右侧查看更多图标，为true时，NoticeBar为单行
 * @property {String} moreType = [icon|text] 右侧更多的类型 默认icon
 * @value icon 图标
 * @value text 文字
 * @property {String} moreName 右侧更多图标
 * @property {String} moreColor 查看更多文字的颜色
 * @property {String} moreSize 右侧图标/文字大小
 * @property {String} coustomStyle 自定义样式
 * @event {Function} click 点击 NoticeBar 触发事件
 * @event {Function} close 关闭 NoticeBar 触发事件
 * @event {Function} getmore 点击”查看更多“时触发事件
 */
Component({
  behaviors: [componentBehaviors],
  externalClasses: ['own-notice-class','own-left-class','own-warp-class','own-right-class'],
  properties: {
    content: {
      type: String,
      value: ''
    },
    moreText: {
      type: String,
      value: ''
    },
    backgroundColor: {
      type: String,
      value: '#ffffff'
    },
    speed: {
      // 默认1s滚动100px
      type: Number,
      value: 60
    },
    color: {
      type: String,
      value: getApp().global.sysConfig.colorCustom.colorMain
    },
    single: {
      // 是否单行
      type: Boolean,
      value: false
    },
    scrollable: {
      // 是否滚动，添加后控制单行效果取消
      type: Boolean,
      value: false
    },
    showIcon: {
      // 是否显示左侧icon
      type: Boolean,
      default: false
    },
    iconName: {
      //左侧图标类型，默认为喇叭
      type: String,
      value: 'systemprompt'
    },
    iconColor: {
      //左侧图标类型，默认为喇叭
      type: String,
      value: getApp().global.sysConfig.colorCustom.colorMain
    },
    iconSize: {
      type: String,
      value: '48rpx'
    },
    showMore: {
      // 是否显示右侧查看更多
      type: Boolean,
      value: false
    },
    moreType: {
      type: String,
      value: 'icon'
    },
    moreName: {
      type: String,
      value: ''
    },
    moreColor: {
      type: String,
      value: '#999'
    },
    moreSize: {
      type: String,
      value: ''
    },
    showClose: {
      // 是否显示左侧关闭按钮
      type: Boolean,
      value: false
    },
    closeName: {
      type: String,
      value: 'delete_fill'
    },
    closeColor: {
      type: String,
      value: getApp().global.sysConfig.colorCustom.colorMain
    },
    closeSize: {
      type: String,
      value: '48rpx'
    },
    coustomStyle: String
  },

  data: {
    showNotice: true,
    timer: null,
    resetAnimation: null,
    wrapWidth: 0,
    contentWidth: 0,
    duration: 0,
    animation: null
  },
  lifetimes: {
    attached() {
      this.init();
    },
    detached() {
      this.data.timer && clearTimeout(this.data.timer);
    },
  },
  attached() {
    this.init();
  },
  detached() {
    this.data.timer && clearTimeout(this.data.timer);
  },
  methods: {
    init() {
      if (this.data.showMore) {
        this.data.single = true;
        if (this.data.moreType == 'icon') {
          if (!this.data.moreName) this.data.moreName = 'more';
          if (!this.data.moreSize) this.data.moreSize = '48rpx';
        }
        if (this.data.moreType == 'text') {
          if (!this.data.moreName) this.data.moreName = '查看更多';
          if (!this.data.moreSize) this.data.moreSize = '24rpx';
        }

      }
      if (this.data.scrollable) {
        this.data.single = false;
        this.data.resetAnimation = wx.createAnimation({
          duration: 0,
          timingFunction: 'linear'
        });
        this.initScrollable();
      }
      this.setData({
        moreName: this.data.moreName,
        moreSize: this.data.moreSize,
        single: this.data.single,
      })
    },
    initScrollable() {
      Promise.all([
        this.getRect('.own-notice-warp'),
        this.getRect('.own-notice-content')
      ]).then((rects) => {
        const [wrapRect,contentRect] = rects;
        if (contentRect == null ||
          wrapRect == null ||
          !contentRect.width ||
          !wrapRect.width) {
          return;
        }
        const {
          speed,
          scrollable,
        } = this.data;
        console.log('speed',speed,scrollable,wrapRect.width,contentRect.width)
        if (scrollable && wrapRect.width < contentRect.width) {
          const duration = (contentRect.width / speed) * 1000;
          this.data.wrapWidth = wrapRect.width;
          this.data.contentWidth = contentRect.width;
          this.data.duration = duration;
          this.data.animation = wx.createAnimation({
            duration,
            timingFunction: 'linear',
          });
          this.scroll();
        }
      });
    },
    scroll() {
      this.data.timer && clearTimeout(this.timer);
      this.data.timer = null;
      this.setData({
        animationData: this.data.resetAnimation
          .translateX(this.data.wrapWidth)
          .step()
          .export()
      });
      setTimeout(() => {
        this.setData({
          animationData: this.data.animation
            .translateX(-this.data.contentWidth)
            .step()
            .export()
        });
      }, 20);
      this.data.timer = setTimeout(() => {
        this.scroll();
      }, this.data.duration);
    },
    getRect(selector, all) {
      return new Promise((resolve) => {
        wx.createSelectorQuery()
          .in(this)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(function (rect) {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    },
    getmore() {
      this.triggerEvent('getmore')
    },
    close() {
      this.data.showNotice = false;
      this.setData({
        showNotice: this.data.showNotice
      })
      this.triggerEvent('close')
    },
    noticeTap() {
      this.triggerEvent('click')
    }

  }
})