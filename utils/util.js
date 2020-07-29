const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isObj = x => {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}
const isDef = value => {
  return value !== undefined && value !== null && value !== '';
}

const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));
/**
 * 加法函数，用来得到精确的加法结果
 *说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 *调用：accAdd(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 * num:保留小数位 默认两位
 */
const accAdd = (arg1, arg2, num = 2) => {
  arg1 = arg1 ? arg1 : 0;
  arg2 = arg2 ? arg2 : 0;
  let r1, r2, m, c;

  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }

  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));

  if (c > 0) {
    let cm = Math.pow(10, c);

    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  let tmp = (arg1 + arg2) / m;
  return this.formatNumDecimals(tmp, num, false)

}

/**
 * 减法函数，用来得到精确的减法结果
 *说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 * 调用：accSub(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 * num:保留小数位 默认两位
 */
const accSub = (arg1, arg2, num = 2) => {
  arg1 = arg1 ? arg1 : 0;
  arg2 = arg2 ? arg2 : 0;
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }

  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  let tmp = ((arg1 * m - arg2 * m) / m).toFixed(n);
  return this.formatNumDecimals(tmp, num, false)
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
const accMul = (arg1, arg2, num = 2) => {
  arg1 = arg1 ? arg1 : 0;
  arg2 = arg2 ? arg2 : 0;
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}

  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  let tmp = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  return this.formatNumDecimals(tmp, num, false)
}
/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
const accDiv = (arg1, arg2, num = 2) => {
  arg1 = arg1 ? arg1 : 0;
  arg2 = arg2 ? arg2 : 1;
  let t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}

  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  let tmp = (r1 / r2) * Math.pow(10, t2 - t1);
  return formatNumDecimals(tmp, num, false);
}

/**  
 * 小数位数超过设定值，保留的小数位数
 * @param maxNum保留的最大小数位数 | maxLength保留的小数位数 | forceFmt是否强制格式化
 */
const formatNumDecimals = (num, maxLength, forceFmt) => {
  num = Number(num);
  var x = String(num).indexOf('.') + 1; //小数点的位置
  var y = String(num).length - x; //小数的位数
  if (forceFmt || (y > 0 && y > maxLength)) {
    num = num.toFixed(maxLength); //返回字符串
  }
  return Number(num);
}

/*函数节流*/
const throttle = (fn, interval) => {
  let enterTime = 0; //触发的时间
  let gapTime = interval || 300; //间隔时间，如果interval不传，则默认300ms
  return function () {
    let context = this;
    let backTime = new Date(); //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
const debounce = (fn, interval) => {
  let timer;
  let gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer);
    let context = this;
    let args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function () {
      fn.call(context, args);
    }, gapTime);
  };
}

const showCustomLoading = (that, msg = '数据加载中...') => {
  that.data.loading.msg = msg;
  that.data.loading.show = false;
  that.setData({
    loading: that.data.loading,
  })
}

const hideCustomLoading = (that, msg = '数据加载中...') => {
  that.data.loading.msg = '';
  that.data.loading.show = true;
  that.setData({
    loading: that.data.loading,
  })
}

module.exports = {
  formatTime,
  isObj,
  nextTick,
  isDef,
  accAdd,
  accSub,
  accMul,
  accDiv,
  formatNumDecimals,
  throttle,
  debounce,
  showCustomLoading,
  hideCustomLoading,
}