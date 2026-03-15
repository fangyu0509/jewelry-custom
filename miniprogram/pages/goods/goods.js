// pages/goods/goods.js
Page({
  data: {
    categories: [
      { id: 'crystal', title: '水晶周边', count: 1 },
      { id: 'accessories', title: '随购小物', count: 0 },
      { id: 'service', title: '相关服务', count: 1 },
      { id: 'diff', title: '差价补齐', count: 2 }
    ]
  },

  goToCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  onLoad() {
    
  }
});
