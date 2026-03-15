// app.js
App({
  onLaunch() {
    // 小程序启动时执行
    console.log('App launched');
  },

  onShow() {
    // 小程序显示时执行
    console.log('App show');
  },

  onHide() {
    // 小程序隐藏时执行
    console.log('App hide');
  },

  globalData: {
    userInfo: null,
    baseUrl: 'http://localhost:8080/api'
  }
});
