/**
 * own-popup
 * @description 弹出层组件
 * @property {String} type = [top|bottom|left|right|center] 弹出方式
 * @value top 顶部弹出
 * @value bottom 底部弹出
 * @value left 左侧弹出
 * @value right 右侧弹出
 * @value center 中间弹出
 * @property {Boolean} animation = [ture|false] 是否开启动画
 * @property {Boolean} maskClick = [ture|false] 蒙版点击是否关闭弹窗
 * @property {String} width 弹出层宽度，仅 type=[left|right]生效
 * @property {String} backgroundColor 弹出层背景色，仅 type=[left|right]生效
 * @property {Number} zIndex 弹出层层级
 * @event {function} change 打开关闭弹窗触发，e={show: false}
 */
import {
  nextTick
} from '../common/js/common-utils.js';
Component({
  options: {
    multipleSlots: true
  },
  externalClasses: ['own-inner-class'],
  properties: {
    animation: {
      type: Boolean,
      value: true
    },
    type: {
      type: String,
      value: 'center'
    },
    maskCanClick: {
      type: Boolean,
      value: true
    },
    width: {
      type: String,
      value: '80%'
    },
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    zIndex: {
      type: Number,
      value: 9999999
    }
  },
  data: {
    duration: 100,
    showPopup: false,
    showTrans: false,
    popupBgClass: ['fade'],
    modeClass: [],
    maskStyles: 'position:fixed;bottom:0;top:0;left:0;right:0;background-color:rgba(0, 0, 0, 0.4);z-index:9999999;',
    transStyles: 'position:fixed;left:0;right:0;',
  },
  lifetimes: {
    attached() {
      this._attached();
    },
  },
  attached() {
    this._attached();
  },
  methods: {
    _attached() {
      this.data.maskStyles = `position:fixed;bottom:0;top:0;left:0;right:0;background-color:rgba(0, 0, 0, 0.4);z-index:${this.data.zIndex};`
      this.setData({
        maskStyles: this.data.maskStyles
      })
      this.setAnimation();
      this.setType();
    },
    open() {
      this.data.showPopup = true;
      this.data.showTrans = true;
      // this.setData({
      //   showPopup: this.data.showPopup
      // })
      // Promise.resolve()
      //   .then(nextTick)
      //   .then(() => {
      // this.data.showTrans = true;
      this.setData({
        showPopup: this.data.showPopup,
        showTrans: this.data.showTrans
      })
      this.triggerEvent('change', {
        show: true
      })
      // })
    },
    close() {
      this.data.showTrans = false;
      this.setData({
        showTrans: this.data.showTrans
      })
      Promise.resolve()
        .then(nextTick)
        .then(() => {
          this.data.showPopup = false;
          this.setData({
            showPopup: this.data.showPopup
          })
          this.triggerEvent('change', {
            show: false
          })
        })
    },
    maskTap(event) {
      if (!event.detail.isShow) {
        this.close();
      }
    },
    setType() {
      switch (this.data.type) {
        case 'top':
          this.data.modeClass = ['slide-top'];
          this.data.transStyles = `position:fixed;left:0;right:0;top:0;z-index:${this.data.zIndex + 2};`;
          break;
        case 'bottom':
          this.data.modeClass = ['slide-bottom'];
          this.data.transStyles = `position:fixed;left:0;right:0;bottom:0;z-index:${this.data.zIndex + 2};`;
          break;
        case 'left':
          this.data.modeClass = ['slide-left'];
          this.data.transStyles = `position:fixed;left:0;bottom:0;top:0;z-index:${this.data.zIndex+ 2};height:100%;width:${this.data.width};background-color:${this.data.backgroundColor};`;
          break;
        case 'right':
          this.data.modeClass = ['slide-right'];
          this.data.transStyles = `position:fixed;right:0;bottom:0;top:0;z-index:${this.data.zIndex+ 2};height:100%;width:${this.data.width};background-color:${this.data.backgroundColor};`;;
          break;
        case 'center':
          this.data.modeClass = ['zoom-in', 'fade'];
          this.data.transStyles = `position:fixed;left:0;right:0;bottom:0;top:0;z-index:${this.data.zIndex + 2};display:flex;flex-direction:column;justify-content:center; align-items: center;`;
          break;
      }
      this.setData({
        modeClass: this.data.modeClass,
        transStyles: this.data.transStyles,
        maskStyles: this.data.maskStyles
      })
    },
    setAnimation() {
      if (this.data.animation) {
        this.data.duration = 100;
      } else {
        this.data.duration = 0;
      }
      this.setData({
        duration: this.data.duration
      })
    },
    stop() {

    }
  }
})