// pages/design/custom/custom.js
Page({
  data: {
    handSize: '过小',
    totalPrice: '0.0',
    searchKeyword: '',
    currentCategory: 'white',
    categories: [
      { id: 'white', name: '白水晶' },
      { id: 'purple', name: '紫水晶' },
      { id: 'yellow', name: '黄水晶' },
      { id: 'pink', name: '粉水晶' },
      { id: 'tea', name: '茶水晶' },
      { id: 'ghost', name: '幽灵水晶' }
    ],
    beadsList: [
      { id: 1, name: '净体白水晶', spec: '6mm', price: 3, image: 'https://picsum.photos/200/200?random=60', category: 'white' },
      { id: 2, name: '净体白水晶', spec: '8mm', price: 5, image: 'https://picsum.photos/200/200?random=61', category: 'white' },
      { id: 3, name: '净体白水晶', spec: '10mm', price: 10, image: 'https://picsum.photos/200/200?random=62', category: 'white' },
      { id: 4, name: '净体白水晶', spec: '12mm', price: 15, image: 'https://picsum.photos/200/200?random=63', category: 'white' },
      { id: 5, name: '奶白晶', spec: '8mm', price: 4, image: 'https://picsum.photos/200/200?random=64', category: 'white' },
      { id: 6, name: '奶白晶', spec: '10mm', price: 8, image: 'https://picsum.photos/200/200?random=65', category: 'white' },
      { id: 7, name: '紫水晶', spec: '6mm', price: 5, image: 'https://picsum.photos/200/200?random=66', category: 'purple' },
      { id: 8, name: '紫水晶', spec: '8mm', price: 8, image: 'https://picsum.photos/200/200?random=67', category: 'purple' },
      { id: 9, name: '黄水晶', spec: '6mm', price: 6, image: 'https://picsum.photos/200/200?random=68', category: 'yellow' }
    ],
    selectedBeads: []
  },

  goBack() {
    wx.navigateBack();
  },

  showNotice() {
    wx.showModal({
      title: '使用须知',
      content: '欢迎使用 DIY 定制功能，请选择您喜欢的珠子进行搭配！',
      showCancel: false
    });
  },

  clearAll() {
    this.setData({
      selectedBeads: [],
      totalPrice: '0.0'
    });
    wx.showToast({
      title: '已清空',
      icon: 'success'
    });
  },

  showBeadsSelector() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
    // TODO: 实现搜索过滤
  },

  selectCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      currentCategory: categoryId
    });
  },

  addBeads(e) {
    const item = e.currentTarget.dataset.item;
    const selectedBeads = this.data.selectedBeads;
    selectedBeads.push(item);
    
    const totalPrice = selectedBeads.reduce((sum, bead) => sum + bead.price, 0);
    
    this.setData({
      selectedBeads,
      totalPrice: totalPrice.toFixed(1)
    });
    
    wx.showToast({
      title: `已添加 ${item.name}`,
      icon: 'success'
    });
  },

  onLoad() {
    
  }
});
