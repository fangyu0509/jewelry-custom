// pages/index/index.js
Page({
  data: {
    products: [
      { id: 1, name: '菩提菩提', material: '菩提子', description: '守护你平安喜乐', image: '/images/products/p1.jpg' },
      { id: 2, name: '怒目绿龙', material: 'PVC', description: '', image: '/images/products/p2.jpg' },
      { id: 3, name: '半点心', material: '银+玉', description: '', image: '/images/products/p3.jpg' },
      { id: 4, name: '牵牛花', material: '中花', description: '', image: '/images/products/p4.jpg' },
      { id: 5, name: '彩虹多宝', material: '中花', description: '各种石头混搭超美', image: '/images/products/p5.jpg' },
      { id: 6, name: '苔间樱落', material: '', description: '守护你无忧无虑', image: '/images/products/p6.jpg' },
      { id: 7, name: '黑莓', material: '', description: '守护你无忧无虑', image: '/images/products/p7.jpg' },
      { id: 8, name: '来财', material: '', description: '守护你无忧虑', image: '/images/products/p8.jpg' },
      { id: 9, name: '树莓', material: '', description: '守护你无忧无虑', image: '/images/products/p9.jpg' }
    ]
  },

  goToCustom() {
    wx.navigateTo({
      url: '/pages/design/custom/custom'
    });
  },

  goToGoods() {
    wx.switchTab({
      url: '/pages/goods/goods'
    });
  },

  contactService() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  goToPlaza() {
    wx.navigateTo({
      url: '/pages/design/gallery/gallery'
    });
  },

  goToProduct(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product/product?id=${productId}`
    });
  },

  onLoad() {
    
  }
});
