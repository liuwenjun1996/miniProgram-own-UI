/**
 * 组件库公用行为
 * @property {String} padding = [null|md|sm|xs] 内边距
 * @property {String} paddingTop = [null|md|sm|xs] 上内边距
 * @property {String} paddingBottom = [null|md|sm|xs] 下内边距
 * @property {String} paddingLeft = [null|md|sm|xs] 左内边距
 * @property {String} paddingRight = [null|md|sm|xs] 右内边距
 * @property {String} margin = [null|md|sm|xs] 外边距
 * @property {String} marginTop = [null|md|sm|xs] 上外边距
 * @property {String} marginBottom = [null|md|sm|xs] 下外边距
 * @property {String} marginLeft = [null|md|sm|xs] 左外边距
 * @property {String} marginRight = [null|md|sm|xs] 右外边距
 * @property {Boolean} noBg = [false|true] 是否为透明背景
 * @property {Boolean} noLine = [false|true] 是否去除边框线条
 */
module.exports = Behavior({
  behaviors: [],
  properties: {
    padding: String, 
    paddingTop: String,  
    paddingBottom: String,
    paddingLeft: String, 
    paddingRight: String,
    margin: String, 
    marginTop: String,
    marginBottom: String,
    marginLeft: String,
    marginRight: String,
    noBg: Boolean, 
    noLine: Boolean,
  },
  data: {
    myBehaviorData: {}
  },
  attached() {
    this.setClass();
  },
  methods: {
    setClass() {
      let _classList = {
        padding: this.data.padding,
        paddingTop: this.data.paddingTop,
        paddingBottom: this.data.paddingBottom,
        paddingLeft: this.data.paddingLeft,
        paddingRight: this.data.paddingRight,
        margin: this.data.margin,
        marginTop: this.data.marginTop,
        marginBottom: this.data.marginBottom,
        marginLeft: this.data.marginLeft,
        marginRight: this.data.marginRight,
        noBg: this.data.noBg,
        noLine: this.data.noLine,
      }
      let classList = [];
      for (const key in _classList) {
        if (_classList[key]) {
          let _key = this.toLowerLine(key);
          let item = {
            key:_key,
            value: _classList[key]
          }
          classList.push(item);
        }
      }
      this.setData({
        classList
      })
    },
    // 大驼峰命名转化为-
    toLowerLine(str) {
      var temp = str.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      if (temp.slice(0, 1) === '-') { //如果首字母是大写，执行replace时会多一个_，这里需要去掉
        temp = temp.slice(1);
      }
      return temp;
    }
  }
})