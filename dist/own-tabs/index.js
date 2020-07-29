/**
 * own-tabs 
 * @description 标签页
 * @property {String} position = [top|left] 页签位置
 * @property {String} type = [line|outline|block] 页签样式 
 * @value line 文字线条
 * @value outline 块状线条
 * @value block 块状填充
 * @property {Boolean} scrollable = [true|false] 是否开启滚动
 * @property {Array} data 列表数据 [{key:value}]
 * @property {String} current 选中
 * @property {Object} extend 扩展字段，默认列表数据结构为{key:value}, 当extend为{key:a,value:b}时，列表数据结构为{a:b}
 * @property {Boolean} more = [true|false] 尾部是否显示更多区域
 * @property {String} morePosition = [start|end] 更多区域的展示位置
 * @event {Function} change 选中切换触发事件
 * @event {Function} moreClick 点击更多触发事件
 */
import componentBehaviors from '../components-behavior.js';
import {isDef} from '../common/js/common-utils.js';
Component({
  behaviors: [componentBehaviors],
  externalClasses:['own-tag-class','own-more-class'],
  properties: {
    position: {
      type: String,
      value: 'top'
    },
    type: {
      type: String,
      value: 'line'
    },
    scrollable: {
      type: Boolean,
      value: false
    },
    list: {
      type: Array,
      value:[]
    },
    current: String,
    showTag: {
      type: Boolean,
      value: false
    },
    more: {
      type: Boolean,
      value: false
    },
    morePosition:{
      type:String,
      value: 'end'
    },
    extend: {
      type: Object,
      value: {
        key:'key',
        value:'value',
        num:'num'
      }
    }
  },

  data: {
    sysConfig: getApp().global.sysConfig,
    current:''
  },

  lifetimes: {
    attached(){
      this.init();
    },
  },
  attached(){
    this.init();
  },
  methods: {
    init(){
      if(!isDef(this.data.current)) {
        this.data.current = this.data.list[0][this.data.extend.key];
      }
      this.setData({
        current: this.data.current
      })
    },
    _taggle(e){
      let index = e.currentTarget.dataset.index;
      if(this.data.current === this.data.list[index][this.data.extend.key]) {
        return;
      }
      this.data.current = this.data.list[index][this.data.extend.key];
      this.setData({
        current: this.data.current
      })
      this.triggerEvent('change',{...this.data.list[index],...{index}})
    },
    _moreClick(){
      this.triggerEvent('moreClick',{status: 'click'})
    }
  }
})
