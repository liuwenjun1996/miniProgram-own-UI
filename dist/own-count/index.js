/** 
 * own-count
 * @description 带加减号的数字输入框
 * @property {Number} value 输入框当前值
 * @property {Number} min 最小值
 * @property {Number} max 最大值
 * @property {Number} step 每次点击改变的间隔大小
 * @property {Boolean} disabled = [true|false] 是否为禁用状态
 * @property {Boolean} modal = [true|false] 点击输入框是否弹出能弹出模态框进行键盘输入
 * @property {Object} extend = any 额外参数
 * @property {String} size = [sm | md | lg] 尺寸
 * @property {String} color 图标颜色
 * @value sm 小尺寸
 * @value md 正常尺寸 默认
 * @value lg 大尺寸
 * @property {Boolean} emptyHide = [true|false] 当输入框值为0时，是否隐藏输入框以及减号按钮
 * @event {Function} calcValue 输入框值改变时触发的事件，参数为输入框当前的 type, value, extend
 */
'use strict';
import componentBehaviors from '../components-behavior.js';
import {
  isDef,
  accDiv,
  debounce
} from '../common/js/common-utils.js';
Component({
  behaviors: [componentBehaviors],
  externalClasses: ['own-count-class', 'own-inner-class', 'own-sub-class', 'own-input-class', 'own-add-class', 'own-text-class'],
  properties: {
    // 输入框当前值
    value: {
      type: Number,
      value: 0
    },
    min: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 99999999
    },
    step: {
      type: Number,
      value: 1
    },
    disabled: {
      type: Boolean,
      value: false
    },
    modal: {
      type: Boolean,
      value: false
    },
    extend: Object,
    size: {
      type: String,
      value: 'md'
    },
    emptyHide: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: "#999"
    }
  },
  data: {
    // inputValue: 0,
    popupInputValue: 0,
    stepLength: 0, // 精确到几位小数
    sysConfig: getApp().global.sysConfig,
    iconSize: ''
  },
  lifetimes: {
    attached() {
      this.init();
    }
  },
  attached() {
    this.init();
  },
  methods: {
    init() {
      // this.data.value += this.data.value;
      this.data.stepLength = (this.data.step + "").split(".")[1] ? (this.data.step + "").split(".")[1].length : 0;
      if (this.data.value < this.data.min) {
        this.data.value = this.data.min;
      }
      switch (this.data.size) {
        case 'sm':
          this.data.iconSize = '28rpx';
          break;
        case 'md':
          this.data.iconSize = '30rpx';
          break;
        case 'lg':
          this.data.iconSize = '36rpx';
          break;
      }
      this.setData({
        // value: this.data.value,
        screenWidth: getApp().global.sysInfo.screenWidth,
        iconSize: this.data.iconSize
      })
    },
    // 打开模态框
    openCountPopup() {
      if (!this.data.modal || this.data.disabled) return;
      this.selectComponent('#countPopup').open();
      let popupInputType = this.data.stepLength == 0 ? 'number' : 'digit';
      this.data.popupInputValue = this.data.value;
      this.setData({
        inputFocus: true,
        popupInputValue: this.data.popupInputValue,
        popupInputType: popupInputType
      })
    },
    // 计算新值
    _calcValue(e) {
      if (this.data.disabled) return;
      let type = e.currentTarget.dataset.type;
      let scale = this._getDecimalScale();
      let value = this.data.value * scale;
      let step = this.data.step * scale;
      if (type == 'sub') {
        // 减法
        value -= step;
        if (value < this.data.min * scale) {
          return;
        }
        if (isDef(this.data.max) && value > this.data.max * scale) {
          value = this.data.max * scale;
        }
      } else {
        // 加法
        value += step;
        if (isDef(this.data.max) && value > this.data.max * scale) {
          return;
        }
        if (value < this.data.min * scale) {
          value = this.data.min + scale;
        }
      }
      this.data.value = accDiv(value, scale, this.data.stepLength);
      this.setData({
        value: this.data.value
      })
      this.triggerEvent('calcValue', {
        type: type,
        value: this.data.value,
        extend: this.data.extend
      })
    },
    // 获取每次增加的步数
    _getDecimalScale() {
      let scale = 1;
      if (~~this.data.step !== this.data.step) {
        scale = Math.pow(10, this.data.stepLength);
      }
      return scale;
    },
    // 模态框输入框赋值
    popupInputChange: debounce(function (e) {
      let value = e[0].detail.value;
      let errTip = '';
      if (!isDef(value)) {
        errTip = '数量不能为空';
        this.setData({
          errTip: errTip
        })
        return;
      }
      if (value < this.data.min) {
        this.data.popupInputValue = this.data.min;
        errTip = `输入值不能少于${this.data.min}`;
      } else if (isDef(this.data.max) && value > this.data.max) {
        this.data.popupInputValue = this.data.max;
        errTip = `输入值不能大于${this.data.max}`;
      } else {
        this.data.popupInputValue = value;
      }
      this.setData({
        popupInputValue: this.data.popupInputValue,
        errTip: errTip
      })
    }, 500),

    // 模态框取消按钮
    _cancle() {
      this.selectComponent('#countPopup').close();
    },
    // 模态框确认按钮
    _submit() {
      this.data.value = accDiv(this.data.popupInputValue, 0, this.data.stepLength);
      this.setData({
        value: this.data.value
      })
      this._cancle();
      this.triggerEvent('calcValue', {
        type: 'add',
        value: this.data.value,
        extend: this.data.extend
      })
    }
  }

})