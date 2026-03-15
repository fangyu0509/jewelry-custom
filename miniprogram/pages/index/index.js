// pages/index/index.js
Page({
  data: {
    products: [
      { id: 1, name: '菩提菩提', material: '菩提子', description: '守护你平安喜乐', image: 'https://picsum.photos/200/200?random=10' },
      { id: 2, name: '怒目绿龙', material: 'PVC', description: '', image: 'https://picsum.photos/200/200?random=11' },
      { id: 3, name: '半点心', material: '银+玉', description: '', image: 'https://picsum.photos/200/200?random=12' },
      { id: 4, name: '牵牛花', material: '中花', description: '', image: 'https://picsum.photos/200/200?random=13' },
      { id: 5, name: '彩虹多宝', material: '中花', description: '各种石头混搭超美', image: 'https://picsum.photos/200/200?random=14' },
      { id: 6, name: '苔间樱落', material: '', description: '守护你无忧无虑', image: 'https://picsum.photos/200/200?random=15' },
      { id: 7, name: '黑莓', material: '', description: '守护你无忧无虑', image: 'https://picsum.photos/200/200?random=16' },
      { id: 8, name: '来财', material: '', description: '守护你无忧虑', image: 'https://picsum.photos/200/200?random=17' },
      { id: 9, name: '树莓', material: '', description: '守护你无忧无虑', image: 'https://picsum.photos/200/200?random=18' }
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
