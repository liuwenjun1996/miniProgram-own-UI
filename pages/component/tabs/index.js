// pages/component/tabs/index.js
Page({
  data: {
    list: [{
        key: '1',
        value: '全部'
      },
      {
        key: '2',
        num: 1,
        value: '标签一'
      },
      {
        key: '3',
        num: 0,
        value: '标签二'
      },
      {
        key: '4',
        num: 5,
        value: '标签三'
      },
      {
        key: '5',
        value: '标签四'
      },
      {
        key: '6',
        value: '标签五'
      },
    ],
    list_1: [{
        id: '1',
        num: 1,
        name: '全部'
      },
      {
        id: '2',
        num: 12,
        name: '标签一标签一标签一标签一'
      },
      {
        id: '3',
        name: '标签二'
      },
      {
        id: '4',
        num: 0,
        name: '标签三'
      },
      {
        id: '5',
        name: '标签四'
      },
      {
        id: '6',
        name: '标签五'
      },
    ],
    current: '3',
    extend: {
      key: 'id',
      value: 'name',
      num:'num'
    }
  },
  onLoad(options) {

  },
  tabChange(e) {
    console.log(e)
  },
  moreClick(){
    console.log('more')
  }
})