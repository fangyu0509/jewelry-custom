package com.jewelry.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 产品实体
 */
@Data
@TableName("product")
public class Product {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 产品名称
     */
    private String name;
    
    /**
     * 产品描述
     */
    private String description;
    
    /**
     * 产品分类：necklace 项链 / bracelet 手链 / ring 戒指 / earring 耳环
     */
    private String category;
    
    /**
     * 基础价格
     */
    private BigDecimal basePrice;
    
    /**
     * 主图 URL
     */
    private String mainImage;
    
    /**
     * 图片列表 JSON
     */
    private String imageList;
    
    /**
     * 可定制选项 JSON：{"materials": ["银", "金"], "engraving": true}
     */
    private String customOptions;
    
    /**
     * 库存数量
     */
    private Integer stock;
    
    /**
     * 状态：0-下架 1-上架
     */
    private Integer status;
    
    /**
     * 排序权重
     */
    private Integer sort;
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    
    @TableLogic
    private Integer deleted;
}
