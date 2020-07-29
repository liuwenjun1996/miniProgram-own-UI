const theme = [{
    id: '1',
    name:'红色',
    colorCustom: {
      colorMain: '#ff4d48', //主题色
      colorSecondary: '#ffb56c' //辅助色
    },
    tabbar: [{
        index: 0,
        text: '首页',
        iconPath: '/assets/images/theme/home-outline.png',
        selectedIconPath: '/assets/images/theme/tab_1/home.png'
      },
      {
        index: 1,
        text: '例子',
        iconPath: '/assets/images/theme/demo-outline.png',
        selectedIconPath: '/assets/images/theme/tab_1/demo.png'
      }
    ]
  },
  {
    id: '2',
    name:'蓝色',
    colorCustom: {
      colorMain: '#4073ff', //主题色
      colorSecondary: '#9fb3ec' //辅助色
    },
    tabbar: [{
        index: 0,
        text: '首页',
        iconPath: '/assets/images/theme/home-outline.png',
        selectedIconPath: '/assets/images/theme/tab_2/home.png'
      },
      {
        index: 1,
        text: '例子',
        iconPath: '/assets/images/theme/demo-outline.png',
        selectedIconPath: '/assets/images/theme/tab_2/demo.png'
      }
    ]
  }
]
module.exports = {
  theme
}