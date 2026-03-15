// pages/profile/profile.js
Page({
  data: {
    
  },

  goToDesign() {
    wx.navigateTo({
      url: '/pages/design/design'
    });
  },

  goToOrder() {
    wx.navigateTo({
      url: '/pages/order/order'
    });
  },

  goToAddress() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  goToHelp() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  goToTerms() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  onLoad() {
    
  }
});
