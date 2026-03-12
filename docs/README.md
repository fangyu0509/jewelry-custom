# 📋 饰品定制小程序 - 开发计划

## 🎯 项目概述
微信小程序 + H5 嵌套，提供饰品定制服务，支持在线设计、下单支付、订单追踪。

---

## 📁 项目结构

```
jewelry-custom/
├── miniprogram/          # 微信小程序前端
│   ├── pages/           # 页面
│   │   ├── index/       # 首页（产品展示）
│   │   ├── design/      # 定制设计页
│   │   ├── product/     # 产品详情页
│   │   ├── order/       # 订单列表/详情
│   │   └── profile/     # 个人中心
│   ├── components/      # 公共组件
│   ├── utils/           # 工具函数
│   └── images/          # 静态图片
├── backend/             # Java 后端 (Spring Boot)
│   ├── src/main/java/com/jewelry/
│   │   ├── controller/  # 控制器
│   │   ├── service/     # 业务逻辑
│   │   ├── repository/  # 数据访问
│   │   ├── entity/      # 实体类
│   │   ├── config/      # 配置类
│   │   └── util/        # 工具类
│   └── src/main/resources/
│       ├── mapper/      # MyBatis XML
│       └── application.yml
├── docker/              # Docker 部署配置
├── docs/                # 文档
│   ├── database.sql     # 数据库脚本
│   └── api.md          # API 文档
└── scripts/             # 运维脚本
```

---

## 🚀 开发阶段

### Phase 1: 基础框架 (Week 1)
- [x] 项目结构初始化
- [x] 数据库设计
- [x] 后端基础配置（Spring Boot + MyBatis Plus）
- [x] 实体类创建（User, Product, Order）
- [ ] 小程序基础页面框架
- [ ] 微信登录对接

### Phase 2: 核心功能 (Week 2-3)
- [ ] 产品展示模块
  - [ ] 产品列表 API
  - [ ] 产品详情 API
  - [ ] 产品分类筛选
  - [ ] 首页 UI 开发
  
- [ ] 定制设计模块
  - [ ] 定制选项配置 API
  - [ ] 价格计算逻辑
  - [ ] 定制页面 UI
  - [ ] 实时预览功能
  
- [ ] 购物车 & 订单
  - [ ] 创建订单 API
  - [ ] 订单列表/详情 API
  - [ ] 订单状态管理
  - [ ] 购物车 UI

### Phase 3: 支付 & 部署 (Week 4)
- [ ] 微信支付对接
  - [ ] 统一下单接口
  - [ ] 支付回调处理
  - [ ] 退款功能
  
- [ ] 阿里云服务集成
  - [ ] OSS 图片存储
  - [ ] SMS 短信通知（可选）
  
- [ ] Docker 部署
  - [ ] 容器化配置
  - [ ] 阿里云 ECS 部署
  - [ ] Nginx 反向代理
  - [ ] HTTPS 证书配置

### Phase 4: 优化 & 上线 (Week 5)
- [ ] 性能优化
  - [ ] Redis 缓存
  - [ ] 图片 CDN 加速
  - [ ] 接口响应优化
  
- [ ] 测试
  - [ ] 单元测试
  - [ ] 接口测试
  - [ ] 小程序真机测试
  
- [ ] 上线准备
  - [ ] 小程序提交审核
  - [ ] 生产环境部署
  - [ ] 监控告警配置

---

## 📊 API 接口清单

### 用户相关
| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 微信登录 | POST | /api/user/login | 获取 openid，返回 token |
| 用户信息 | GET | /api/user/info | 获取当前用户信息 |
| 更新用户 | PUT | /api/user/info | 更新昵称、手机号等 |

### 产品相关
| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 产品列表 | GET | /api/product/list | 分页获取产品列表 |
| 产品详情 | GET | /api/product/{id} | 获取产品详细信息 |
| 产品分类 | GET | /api/product/categories | 获取分类列表 |

### 订单相关
| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 创建订单 | POST | /api/order/create | 创建新订单 |
| 订单列表 | GET | /api/order/list | 获取用户订单列表 |
| 订单详情 | GET | /api/order/{id} | 获取订单详情 |
| 取消订单 | POST | /api/order/{id}/cancel | 取消订单 |

### 支付相关
| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 预支付 | POST | /api/pay/prepay | 获取微信支付参数 |
| 支付回调 | POST | /api/pay/notify | 微信支付结果通知 |
| 退款 | POST | /api/pay/refund | 申请退款 |

---

## 🔧 技术要点

### 小程序端
- 使用原生小程序框架
- H5 嵌套用于复杂定制页面（web-view）
- 本地缓存：用户信息、token
- 图片上传：wx.chooseImage + OSS

### 后端
- Spring Boot 3.2 + Java 17
- MyBatis Plus 简化 CRUD
- JWT Token 认证
- 全局异常处理
- 统一响应格式

### 数据库
- MySQL 8.0
- 读写分离（后期）
- 定时备份

### 部署
- Docker Compose 一键部署
- 阿里云 ECS
- Nginx 反向代理 + HTTPS
- 日志收集（ELK，可选）

---

## ⚠️ 注意事项

1. **微信小程序审核**
   - 需要营业执照
   - 支付功能需要商户号
   - 提前准备软著（部分类目需要）

2. **数据安全**
   - 用户手机号脱敏存储
   - 支付接口签名验证
   - SQL 注入防护

3. **性能优化**
   - 产品图片走 CDN
   - 热点数据 Redis 缓存
   - 数据库索引优化

4. **成本控制**
   - 阿里云按量付费起步
   - OSS 设置生命周期规则
   - 监控资源使用量

---

## 📞 下一步行动

1. **确认微信小程序账号** - 需要 AppID 和 Secret
2. **申请微信支付商户号** - 用于收款
3. **开通阿里云 OSS** - 图片存储
4. **准备服务器** - ECS 实例（建议 2 核 4G 起步）

有任何问题随时沟通！🚀
