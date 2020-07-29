import componentBehaviors from '../components-behavior.js';
/**
 * own-search
 * @description 搜索组件
 * @property {String} mode = [mould|practical]
 * @value mould 展示模式，撑满、圆角、不带搜索按钮跟搜索功能
 * @value practical 实用模式，带搜索按钮跟搜索功能
 * @property {Boolean} showIcon 是否展示前缀图标
 * @property {String} iconName 图标名称
 * @property {String} iconColor 图标颜色
 * @property {String} iconSize 图标大小
 * @property {String} tip 输入框占位符
 * @property {String} tipStyle 占位符自定义样式
 * @property {String} mouldStyle 展示模式下的自定义样式
 * @property {String} searchValue 搜索内容
 * @property {String} searchText 实用模式下搜索按钮的文字
 * @property {Boolean} prefix 前缀 仅实用模式下有效
 */
import {
  debounce
} from '../common/js/common-utils.js';
Component({
  behaviors: [componentBehaviors],
  externalClasses: ['own-search-class', ],
  properties: {
    mode: {
      type: String,
      value: 'mould'
    },
    showIcon: {
      type: Boolean,
      value: true
    },
    iconName: {
      type: String,
      value: 'search'
    },
    iconColor: {
      type: String,
      value: '#666'
    },
    iconSize: {
      type: String,
      value: '44rpx'
    },
    tip: {
      type: String,
      value: '输入关键字搜索'
    },
    tipStyle: String,
    mouldStyle: String,
    searchValue: String,
    searchText: {
      type: String,
      value: '搜索'
    },
    prefix: {
      type: Boolean,
      value: false
    }
  },
  attached() {
    this._attached();
  },
  lifetimes: {
    attached() {
      this._attached();
    }
  },
  data: {
    sysConfig: getApp().global.sysConfig
  },
  methods: {
    _attached() {
      if (this.data.mode == 'mould') {
        !this.data.tipStyle && (this.data.tipStyle = 'color: #999;font-size:26rpx;');
        !this.data.mouldStyle && (this.data.mouldStyle = 'border-radius: 40rpx;background-color: #f5f6f6; padding: 10rpx 20rpx;')
      }
      this.setData({
        tipStyle: this.data.tipStyle,
        mouldStyle: this.data.mouldStyle
      })
    },
    _searchInput: debounce(function(e){
      this.data.searchValue = e[0].detail.value;
      this.setData({
        searchValue: this.data.searchValue
      })
    }, 500),
    search(){
      console.log(this.data.searchValue)
      this.triggerEvent('search',{value: this.data.searchValue})
    }
  }
})