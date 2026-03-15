// pages/design/design.js
Page({
  data: {
    
  },

  goToMyDesign() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  goToCustom() {
    wx.navigateTo({
      url: '/pages/design/custom'
    });
  },

  goToBeads() {
    wx.navigateTo({
      url: '/pages/design/beads'
    });
  },

  goToGallery() {
    wx.navigateTo({
      url: '/pages/design/gallery'
    });
  },

  onLoad() {
    
  }
});
