/**
 * own-icon
 * @description 图标组件
 * @property {String} name 图标名称
 * @property {Stirng} size 图标大小 带单位
 * @property {String} color 图标颜色
 */
'use strict';
Component({
  externalClasses: ['own-class'],
  properties: {
    name: String,
    size: String,
    color: String
  }
});