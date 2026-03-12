-- 饰品定制小程序数据库初始化脚本
-- MySQL 8.0+

CREATE DATABASE IF NOT EXISTS jewelry_custom 
DEFAULT CHARACTER SET utf8mb4 
DEFAULT COLLATE utf8mb4_unicode_ci;

USE jewelry_custom;

-- 用户表
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '用户 ID',
    `openid` VARCHAR(64) NOT NULL COMMENT '微信 openid',
    `unionid` VARCHAR(64) DEFAULT NULL COMMENT '微信 unionid',
    `nickname` VARCHAR(64) DEFAULT NULL COMMENT '昵称',
    `avatar` VARCHAR(255) DEFAULT NULL COMMENT '头像 URL',
    `phone` VARCHAR(20) DEFAULT NULL COMMENT '手机号',
    `gender` TINYINT DEFAULT 0 COMMENT '性别：0-未知 1-男 2-女',
    `status` TINYINT DEFAULT 1 COMMENT '状态：0-禁用 1-正常',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted` TINYINT DEFAULT 0 COMMENT '删除标记：0-未删除 1-已删除',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_openid` (`openid`),
    KEY `idx_unionid` (`unionid`),
    KEY `idx_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 产品表
CREATE TABLE `product` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '产品 ID',
    `name` VARCHAR(128) NOT NULL COMMENT '产品名称',
    `description` TEXT COMMENT '产品描述',
    `category` VARCHAR(32) NOT NULL COMMENT '分类：necklace/bracelet/ring/earring',
    `base_price` DECIMAL(10,2) NOT NULL COMMENT '基础价格',
    `main_image` VARCHAR(255) DEFAULT NULL COMMENT '主图 URL',
    `image_list` TEXT COMMENT '图片列表 JSON',
    `custom_options` TEXT COMMENT '可定制选项 JSON',
    `stock` INT DEFAULT 0 COMMENT '库存数量',
    `status` TINYINT DEFAULT 1 COMMENT '状态：0-下架 1-上架',
    `sort` INT DEFAULT 0 COMMENT '排序权重',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted` TINYINT DEFAULT 0 COMMENT '删除标记',
    PRIMARY KEY (`id`),
    KEY `idx_category` (`category`),
    KEY `idx_status` (`status`),
    KEY `idx_sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品表';

-- 订单表
CREATE TABLE `order` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '订单 ID',
    `order_no` VARCHAR(32) NOT NULL COMMENT '订单号',
    `user_id` BIGINT NOT NULL COMMENT '用户 ID',
    `status` TINYINT DEFAULT 0 COMMENT '订单状态：0-待支付 1-待生产 2-生产中 3-已发货 4-已完成 5-已取消',
    `product_id` BIGINT NOT NULL COMMENT '产品 ID',
    `product_name` VARCHAR(128) NOT NULL COMMENT '产品名称快照',
    `custom_info` TEXT COMMENT '定制信息 JSON',
    `product_price` DECIMAL(10,2) NOT NULL COMMENT '商品单价',
    `custom_price` DECIMAL(10,2) DEFAULT 0 COMMENT '定制加价',
    `total_price` DECIMAL(10,2) NOT NULL COMMENT '订单总价',
    `receiver_name` VARCHAR(64) NOT NULL COMMENT '收货人姓名',
    `receiver_phone` VARCHAR(20) NOT NULL COMMENT '收货人电话',
    `receiver_address` VARCHAR(255) NOT NULL COMMENT '收货地址',
    `pay_time` DATETIME DEFAULT NULL COMMENT '支付时间',
    `ship_time` DATETIME DEFAULT NULL COMMENT '发货时间',
    `tracking_no` VARCHAR(64) DEFAULT NULL COMMENT '物流单号',
    `remark` VARCHAR(255) DEFAULT NULL COMMENT '订单备注',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted` TINYINT DEFAULT 0 COMMENT '删除标记',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_order_no` (`order_no`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_status` (`status`),
    KEY `idx_product_id` (`product_id`),
    KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表';

-- 订单日志表
CREATE TABLE `order_log` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '日志 ID',
    `order_id` BIGINT NOT NULL COMMENT '订单 ID',
    `order_no` VARCHAR(32) NOT NULL COMMENT '订单号',
    `action` VARCHAR(32) NOT NULL COMMENT '操作：create/pay/ship/complete/cancel',
    `message` VARCHAR(255) DEFAULT NULL COMMENT '操作说明',
    `operator` VARCHAR(64) DEFAULT NULL COMMENT '操作人',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_order_id` (`order_id`),
    KEY `idx_order_no` (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单日志表';

-- 初始化示例数据
INSERT INTO `product` (`name`, `description`, `category`, `base_price`, `main_image`, `image_list`, `custom_options`, `stock`, `status`, `sort`) VALUES
('经典银项链', '925 纯银材质，简约百搭款式', 'necklace', 299.00, '/images/product/necklace-1.jpg', '["/images/product/necklace-1.jpg", "/images/product/necklace-1-detail.jpg"]', '{"materials": ["925 银", "18K 金"], "lengths": ["40cm", "45cm", "50cm"], "engraving": true}', 100, 1, 1),
('轻奢手链', '精致链条设计，适合日常佩戴', 'bracelet', 199.00, '/images/product/bracelet-1.jpg', '["/images/product/bracelet-1.jpg"]', '{"materials": ["925 银", "玫瑰金"], "engraving": true}', 80, 1, 2),
('定制戒指', '可刻字定制，专属你的戒指', 'ring', 399.00, '/images/product/ring-1.jpg', '["/images/product/ring-1.jpg"]', '{"materials": ["925 银", "18K 金", "铂金"], "sizes": ["12mm", "14mm", "16mm", "18mm"], "engraving": true}', 50, 1, 3),
('优雅耳环', '轻盈设计，舒适佩戴', 'earring', 159.00, '/images/product/earring-1.jpg', '["/images/product/earring-1.jpg"]', '{"materials": ["925 银", "18K 金"], "engraving": false}', 120, 1, 4);
