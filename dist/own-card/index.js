/**
 * own-card
 * @description 卡片组件
 * @property {Boolean} shadow = [true|false] 是否开卡片阴影
 */
import componentBehaviors from '../components-behavior.js';
Component({
  behaviors: [componentBehaviors],
  options: {
    multipleSlots: true
  },
  externalClasses:['own-card-class'],
  properties: {
    shadow: {
      type: Boolean,
      value: false
    }
  },

  data: {

  },

  methods: {

  }
})
