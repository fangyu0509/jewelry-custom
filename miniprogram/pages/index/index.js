// pages/index/index.js
Page({
  data: {
    products: [],
    categories: [],
    currentCategory: 'all',
    loading: false,
    page: 1,
    hasMore: true
  },

  onLoad() {
    this.loadCategories();
    this.loadProducts();
  },

  onPullDownRefresh() {
    this.setData({ page: 1, hasMore: true, products: [] });
    this.loadProducts();
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadProducts();
    }
  },

  // 加载分类
  async loadCategories() {
    try {
      const res = await wx.request({
        url: 'https://your-domain.com/api/product/categories',
        method: 'GET'
      });
      if (res.data.code === 200) {
        this.setData({ 
          categories: [{ id: 'all', name: '全部' }, ...res.data.data] 
        });
      }
    } catch (err) {
      console.error('加载分类失败', err);
    }
  },

  // 加载产品列表
  async loadProducts() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    try {
      const { currentCategory, page } = this.data;
      const categoryParam = currentCategory === 'all' ? '' : `&category=${currentCategory}`;
      
      const res = await wx.request({
        url: `https://your-domain.com/api/product/list?page=${page}&size=10${categoryParam}`,
        method: 'GET'
      });
      
      if (res.data.code === 200) {
        const newProducts = res.data.data;
        this.setData({
          products: page === 1 ? newProducts : [...this.data.products, ...newProducts],
          page: page + 1,
          hasMore: newProducts.length === 10
        });
      }
    } catch (err) {
      console.error('加载产品失败', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
      wx.stopPullDownRefresh();
    }
  },

  // 切换分类
  onCategoryChange(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ currentCategory: category, page: 1, hasMore: true, products: [] });
    this.loadProducts();
  },

  // 跳转产品详情
  onProductTap(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product/product?id=${productId}`
    });
  }
});
