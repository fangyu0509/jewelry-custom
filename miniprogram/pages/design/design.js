// pages/design/design.js
Page({
  data: {
    types: ['项链', '戒指', '耳环', '手链', '手镯'],
    typeIndex: 0,
    materials: ['18K 金', '14K 金', '925 银', '铂金', '玫瑰金'],
    materialIndex: 0,
    size: '',
    requirement: '',
    images: [],
    estimatedPrice: '0'
  },

  onTypeChange(e) {
    this.setData({
      typeIndex: e.detail.value
    });
  },

  onMaterialChange(e) {
    this.setData({
      materialIndex: e.detail.value
    });
    this.calculatePrice();
  },

  onSizeInput(e) {
    this.setData({
      size: e.detail.value
    });
    this.calculatePrice();
  },

  onRequirementInput(e) {
    this.setData({
      requirement: e.detail.value
    });
  },

  chooseImage() {
    const that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          images: res.tempFilePaths
        });
      }
    });
  },

  calculatePrice() {
    const basePrices = {
      0: 800,  // 项链
      1: 600,  // 戒指
      2: 400,  // 耳环
      3: 500,  // 手链
      4: 700   // 手镯
    };
    
    const materialRates = {
      0: 1.5,  // 18K 金
      1: 1.2,  // 14K 金
      2: 0.8,  // 925 银
      3: 1.8,  // 铂金
      4: 1.3   // 玫瑰金
    };

    const basePrice = basePrices[this.data.typeIndex];
    const materialRate = materialRates[this.data.materialIndex];
    const estimated = Math.round(basePrice * materialRate);
    
    this.setData({
      estimatedPrice: estimated
    });
  },

  submitOrder() {
    const { typeIndex, materialIndex, size, requirement, images } = this.data;
    
    if (!size) {
      wx.showToast({
        title: '请输入尺寸',
        icon: 'none'
      });
      return;
    }

    if (!requirement) {
      wx.showToast({
        title: '请填写定制要求',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '提交中...'
    });

    // TODO: 调用后端 API 提交订单
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
      
      // 跳转到订单页面
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/order/order'
        });
      }, 1500);
    }, 1000);
  },

  onLoad() {
    this.calculatePrice();
  }
});
