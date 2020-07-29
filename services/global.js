/** 
 * 全局变量
 */
export class global {
  _sysInfo = null; // 系统信息
  _sysConfig = null; // 系统配置信息

  set sysInfo(value) {
    this._sysInfo = value;
  }
  get sysInfo() {
    return this._sysInfo;
  }

  set sysConfig(value) {
    this._sysConfig = value;
  }
  get sysConfig() {
    return this._sysConfig
  }
}