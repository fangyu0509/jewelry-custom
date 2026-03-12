package com.jewelry.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 订单实体
 */
@Data
@TableName("order")
public class Order {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 订单号
     */
    private String orderNo;
    
    /**
     * 用户 ID
     */
    private Long userId;
    
    /**
     * 订单状态：0-待支付 1-待生产 2-生产中 3-已发货 4-已完成 5-已取消
     */
    private Integer status;
    
    /**
     * 产品 ID
     */
    private Long productId;
    
    /**
     * 产品名称快照
     */
    private String productName;
    
    /**
     * 定制信息 JSON：{"material": "银", "engraving": "LOVE", "size": "16mm"}
     */
    private String customInfo;
    
    /**
     * 商品单价
     */
    private BigDecimal productPrice;
    
    /**
     * 定制加价
     */
    private BigDecimal customPrice;
    
    /**
     * 订单总价
     */
    private BigDecimal totalPrice;
    
    /**
     * 收货人姓名
     */
    private String receiverName;
    
    /**
     * 收货人电话
     */
    private String receiverPhone;
    
    /**
     * 收货地址
     */
    private String receiverAddress;
    
    /**
     * 支付时间
     */
    private LocalDateTime payTime;
    
    /**
     * 发货时间
     */
    private LocalDateTime shipTime;
    
    /**
     * 物流单号
     */
    private String trackingNo;
    
    /**
     * 订单备注
     */
    private String remark;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    
    @TableLogic
    private Integer deleted;
}
