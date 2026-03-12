# 饰品定制小程序 - Docker 部署配置

## Dockerfile (后端)

```dockerfile
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY target/jewelry-custom-1.0.0.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-Xms512m -Xmx1g -Djava.security.egd=file:/dev/./urandom"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

## docker-compose.yml

```yaml
version: '3.8'

services:
  # MySQL 数据库
  mysql:
    image: mysql:8.0
    container_name: jewelry-mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD:-root123}
      MYSQL_DATABASE: jewelry_custom
      TZ: Asia/Shanghai
    ports:
      - "3306:3306"
    volumes:
      - ./data/mysql:/var/lib/mysql
      - ./docs/database.sql:/docker-entrypoint-initdb.d/init.sql
    command: 
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
      - --default-time-zone=Asia/Shanghai

  # Redis 缓存
  redis:
    image: redis:7-alpine
    container_name: jewelry-redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - ./data/redis:/data
    command: redis-server --appendonly yes

  # 后端服务
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: jewelry-backend
    restart: always
    depends_on:
      - mysql
      - redis
    ports:
      - "8080:8080"
    environment:
      DB_PASSWORD: ${DB_PASSWORD:-root123}
      REDIS_PASSWORD: ''
      JWT_SECRET: ${JWT_SECRET}
      WECHAT_APPID: ${WECHAT_APPID}
      WECHAT_SECRET: ${WECHAT_SECRET}
      WECHAT_PAY_APPID: ${WECHAT_PAY_APPID}
      WECHAT_MCHID: ${WECHAT_MCHID}
      OSS_ACCESS_KEY_ID: ${OSS_ACCESS_KEY_ID}
      OSS_ACCESS_KEY_SECRET: ${OSS_ACCESS_KEY_SECRET}
      OSS_BUCKET_NAME: ${OSS_BUCKET_NAME}
    volumes:
      - ./logs:/app/logs
    networks:
      - jewelry-network

networks:
  jewelry-network:
    driver: bridge
```

## .env 环境变量模板

```bash
# 数据库密码
DB_PASSWORD=your_strong_password

# JWT 密钥（建议 32 位以上随机字符串）
JWT_SECRET=your_jwt_secret_key_here

# 微信小程序配置
WECHAT_APPID=wx_your_appid
WECHAT_SECRET=your_app_secret

# 微信支付配置
WECHAT_PAY_APPID=wx_your_appid
WECHAT_MCHID=your_mchid

# 阿里云 OSS 配置
OSS_ACCESS_KEY_ID=your_access_key_id
OSS_ACCESS_KEY_SECRET=your_access_key_secret
OSS_BUCKET_NAME=jewelry-custom
```

## 部署步骤

### 1. 准备环境
```bash
# 安装 Docker 和 Docker Compose
curl -fsSL https://get.docker.com | bash
systemctl enable --now docker
```

### 2. 配置环境变量
```bash
cd /home/admin/.openclaw/workspace/jewelry-custom
cp .env.example .env
# 编辑 .env 文件，填入你的配置
vim .env
```

### 3. 构建并启动
```bash
# 构建后端 jar 包
cd backend
mvn clean package -DskipTests

# 返回项目根目录，启动服务
cd ..
docker-compose up -d
```

### 4. 查看日志
```bash
docker-compose logs -f backend
docker-compose logs -f mysql
```

### 5. 阿里云安全组配置
确保开放以下端口：
- 8080 (后端 API)
- 443 (HTTPS，生产环境建议配置 Nginx 反向代理)

## Nginx 反向代理配置（可选）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api/ {
        proxy_pass http://localhost:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 微信小程序静态资源
    location / {
        root /var/www/miniprogram;
        try_files $uri $uri/ /index.html;
    }
}
```

## 健康检查

```bash
# 检查服务状态
docker-compose ps

# 测试 API
curl http://localhost:8080/api/health

# 查看容器日志
docker logs jewelry-backend
```
