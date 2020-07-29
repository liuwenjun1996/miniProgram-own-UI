/**
 * own-fab
 * @description 悬浮按钮
 * @property {String} width 按钮宽度
 * @property {String} height 按钮高度
 * @property {String} radius 圆角度数
 * @property {String} backgroundColor 背景色
 * @property {String} position [top|left|bottom|right] 按钮
 * @property {String} horizontal [start|end] 水平位置
 * @property {String} vertical [start|end] 垂直位置
 */
import {
  compareVersion
} from '../common/js/common-utils.js'
const app = getApp();
Component({
  externalClasses: ['own-fab-class', 'own-inner-class'],
  properties: {
    width: {
      type: Number,
      value: 50
    },
    height: {
      type: Number,
      value: 50
    },
    radius: {
      type: String,
      value: '50%'
    },
    backgroundColor: {
      type: String,
      value: app.global.sysConfig.colorCustom.colorMain
    },
    horizontal: {
      type: String,
      value: 'end'
    },
    vertical: {
      type: String,
      value: 'end'
    }
  },
  data: {
    drag: false,
    top:15,
    left:15,
    sysInfo: app.global.sysInfo
  },
  attached() {
    this._attached();
  },
  lifetimes: {
    attached() {
      this._attached();
    }
  },
  methods: {
    _attached() {
      // 用于判断fab是否允许拖拽,基础版本号低于2.4.4不允许拖拽
      let nVersion = this.data.sysInfo.SDKVersion; //当前版本号
      let oVersion = '2.4.4';
      this.data.drag = false;
      if(compareVersion(nVersion,oVersion) >= 0) {
        this.data.drag = true;
      }
      if(this.data.horizontal == 'start') {
        this.data.left = 15;
      } else {
        this.data.left = this.data.sysInfo.windowWidth - this.data.width - 15;
      }
      if(this.data.vertical == 'start') {
        this.data.top = 15;
      } else {
        this.data.top = this.data.sysInfo.windowHeight - this.data.height - 15;
      }
      this.setData({
        drag: this.data.drag,
        left: this.data.left,
        top: this.data.top,
        windowWidth: this.data.sysInfo.windowWidth - this.data.width,
        windowHeight: this.data.sysInfo.windowHeight - this.data.height
      })
    }
  }
})