# 🚀 饰品定制小程序 - 快速启动指南

## ✅ 已完成的工作

### 1. 项目结构
```
jewelry-custom/
├── miniprogram/          ✅ 小程序框架 + 首页完成
├── backend/             ✅ Spring Boot 后端 + 实体类 + 控制器
├── docker/              ✅ Docker Compose 部署配置
└── docs/                ✅ 数据库脚本 + 开发文档
```

### 2. 核心功能
- ✅ 数据库设计（4 张表：user, product, order, order_log）
- ✅ 后端基础架构（Spring Boot 3.2 + MyBatis Plus）
- ✅ 产品模块 API（列表、详情、分类）
- ✅ 订单模块 API（创建、列表、详情、取消）
- ✅ 用户模块 API（微信登录、信息更新）
- ✅ 小程序首页（分类筛选、产品列表、分页加载）

---

## 📝 下一步需要你准备的东西

### 1. 微信小程序资质
- [ ] **微信小程序账号** - 获取 AppID 和 AppSecret
  - 访问：https://mp.weixin.qq.com
  - 注册小程序，完成认证
  
- [ ] **微信支付商户号** - 用于收款
  - 需要营业执照
  - 在微信商户平台申请

### 2. 阿里云资源
- [ ] **ECS 服务器** - 建议配置：2 核 4G 起步
  - 系统：Ubuntu 22.04 或 CentOS 7+
  
- [ ] **OSS 对象存储** - 图片存储
  - 创建 Bucket，获取 AccessKey
  
- [ ] **域名 + ICP 备案** - 用于 API 访问
  - 小程序要求后端接口必须是 HTTPS

### 3. 配置信息收集
把下面这些信息准备好，填到 `.env` 文件里：

```bash
# 数据库密码（自己设定一个强密码）
DB_PASSWORD=your_password

# JWT 密钥（32 位以上随机字符串）
JWT_SECRET=your_random_secret_key

# 微信小程序
WECHAT_APPID=wx_xxxxxxxxxxxxxxxx
WECHAT_SECRET=your_app_secret

# 微信支付
WECHAT_PAY_APPID=wx_xxxxxxxxxxxxxxxx
WECHAT_MCHID=your_mchid

# 阿里云 OSS
OSS_ACCESS_KEY_ID=LTAIxxxxxxxxxxxx
OSS_ACCESS_KEY_SECRET=your_secret
OSS_BUCKET_NAME=jewelry-custom
```

---

## 🔧 本地开发环境搭建

### 1. 安装依赖
```bash
# 后端需要 Java 17 和 Maven
java -version
mvn -version

# 前端需要微信开发者工具
# 下载地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
```

### 2. 启动后端服务
```bash
cd /home/admin/.openclaw/workspace/jewelry-custom/backend

# 修改数据库配置（如果用本地 MySQL）
vim src/main/resources/application.yml

# 编译运行
mvn clean package -DskipTests
java -jar target/jewelry-custom-1.0.0.jar
```

### 3. 导入数据库
```bash
mysql -u root -p < /home/admin/.openclaw/workspace/jewelry-custom/docs/database.sql
```

### 4. 打开小程序
- 微信开发者工具 → 导入项目
- 选择目录：`/home/admin/.openclaw/workspace/jewelry-custom/miniprogram`
- 填入你的 AppID（或选测试号）
- 修改 `app.js` 中的 API 地址为 `http://localhost:8080`

---

## 📦 生产环境部署（阿里云）

### 1. 服务器初始化
```bash
# SSH 登录服务器
ssh root@your-server-ip

# 安装 Docker
curl -fsSL https://get.docker.com | bash
systemctl enable --now docker

# 安装 Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### 2. 部署项目
```bash
# 上传项目到服务器
scp -r /home/admin/.openclaw/workspace/jewelry-custom root@your-server-ip:/opt/

# 登录服务器，进入项目目录
cd /opt/jewelry-custom

# 配置环境变量
cp .env.example .env
vim .env  # 填入你的配置

# 构建并启动
cd backend && mvn clean package -DskipTests
cd ..
docker-compose up -d
```

### 3. 配置 Nginx（HTTPS）
```bash
# 安装 Nginx
apt install nginx -y  # Ubuntu
# 或 yum install nginx -y  # CentOS

# 配置反向代理
vim /etc/nginx/conf.d/jewelry.conf

# 重启 Nginx
systemctl restart nginx
```

### 4. 小程序后台配置
- 登录微信小程序后台
- 开发管理 → 开发设置 → 服务器域名
- 配置 `request` 合法域名：`https://your-domain.com`

---

## 📋 待开发功能清单

### Phase 2 (接下来要做的)
- [ ] 产品详情页（小程序）
- [ ] 定制设计页（核心功能！）
- [ ] 购物车功能
- [ ] 微信支付对接
- [ ] 订单管理完整流程

### Phase 3
- [ ] 后台管理系统（可选：Vue + Element UI）
- [ ] 图片上传 OSS
- [ ] 短信通知
- [ ] 物流跟踪

---

## 💡 建议

1. **先跑通 MVP** - 把核心流程（浏览→定制→下单→支付）做完，尽快上线测试
2. **小程序审核** - 提前准备营业执照，支付功能需要商户号
3. **图片资源** - 先放一些示例产品图，可以用占位图过渡
4. **测试环境** - 微信有沙箱环境，可以先用测试号开发

---

## 📞 有问题随时找我！

现在项目框架已经搭好了，你先把**微信小程序账号**和**阿里云服务器**准备好，我们继续往下做！

下一步建议：
1. 注册微信小程序，拿到 AppID
2. 买台阿里云 ECS（2 核 4G 够用）
3. 告诉我，我继续帮你做**定制设计页**和**支付对接** 🚀
