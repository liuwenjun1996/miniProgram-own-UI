/**
 * own-transition 
 * @description 过渡动画组件
 * @property {Boolean} show = [false|true] 控制组件显示或隐藏
 * @property {Array} modeClass = [fade|slide-top|slide-right|slide-bottom|slide-left|zoom-in|zoom-out] 过渡动画类型
 *  @value fade 渐隐渐出过渡
 *  @value slide-top 由上至下过渡
 *  @value slide-right 由右至左过渡
 *  @value slide-bottom 由下至上过渡
 *  @value slide-left 由左至右过渡
 *  @value zoom-in 由小到大过渡
 *  @value zoom-out 由大到小过渡
 * @property {Number} duration 过渡动画持续时间
 * @property {Object} styles 组件样式，同 css 样式
 * @property {Boolean} maskCanClick 是否允许点击隐藏
 * @event {function} change 隐藏背景时触发该事件 e= {show:[false|true]}
 */
import {
  nextTick
} from '../common/js/common-utils.js';
Component({

  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: 'observeShow'
    },
    modeClass: {
      type: Array,
      value: []
    },
    duration: {
      type: Number,
      value: 300
    },
    styles: {
      type: String,
      value: ''
    },
    maskCanClick: {
      type: Boolean,
      value: true
    }
  },

  data: {
    isShow: false,
    transform: '',
    in: ''
  },
  methods: {
    change(){
      if(this.data.maskCanClick) {
        this.data.isShow = !this.data.isShow;
        this.data.show = !this.data.show;
        this.setData({
          isShow: this.data.isShow
        })
        this.triggerEvent('change',{
          isShow: this.data.isShow
        })
      }
    },
    observeShow(value, old) {
      if (value == old) {
        return;
      }
      value ? this.enter() : this.leave();
    },
    // 显示组件
    enter() {
      this.data.transform = '';
      this.data.in = '';
      this.data.isShow = true;
      for (let i in this.getTranfrom(false)) {
        if (i === 'opacity') {
          this.data.in = 'fade-in'
        } else {
          this.data.transform += `${this.getTranfrom(false)[i]} `
        }
      }
      this.setData({
        in:this.data.in,
        transform: this.data.transform,
        isShow: this.data.isShow
      })
      Promise.resolve()
        .then(nextTick)
        .then(() => {
          this._animation(true);
        })
    },
    // 隐藏组件
    leave() {
      this._animation(false);
    },
    /**
     * @property {Boolean} type = [false|true]
     */
    _animation(type) {
      let styles = this.getTranfrom(type);
      this.data.transform = '';
      for (let i in styles) {
        if (i === 'opacity') {
          this.data.in = `fade-${type?'out':'in'}`;
        } else {
          this.data.transform += `${styles[i]} `
        }
      }
      this.setData({
        transform: this.data.transform,
        duration: this.data.duration,
        in: this.data.in,
      });
      Promise.resolve()
      .then(nextTick)
      .then(() => {
        setTimeout(()=>{
          this.setData({           
            isShow: this.data.isShow
          })
        },this.data.duration / 1000)
        
      })
    },
    /**
     * @property {Boolean} type = [false|true]
     */
    getTranfrom(type) {
      let styles = {
        transform: ''
      }
      this.data.modeClass.map(mode => {
        switch (mode) {
          case 'fade':
            styles.opacity = type ? 1 : 0
            break;
          case 'slide-top':
            styles.transform += `translateY(${type?'0':'-100%'}); `
            break;
          case 'slide-right':
            styles.transform += `translateX(${type?'0':'100%'}); `
            break;
          case 'slide-bottom':
            styles.transform += `translateY(${type?'0':'100%'}); `
            break;
          case 'slide-left':
            styles.transform += `translateX(${type?'0':'-100%'}); `
            break;
          case 'zoom-in':
            styles.transform += `scale(${type?1:0.8}); `
            break;
          case 'zoom-out':
            styles.transform += `scale(${type?1:1.2}); `
            break;
        }
      })
      return styles;
    }
  }
})