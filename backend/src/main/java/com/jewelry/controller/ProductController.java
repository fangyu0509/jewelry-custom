package com.jewelry.controller;

import com.jewelry.entity.Product;
import com.jewelry.service.ProductService;
import com.jewelry.util.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 产品控制器
 */
@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductService productService;
    
    /**
     * 获取产品列表
     */
    @GetMapping("/list")
    public Result<List<Product>> getList(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size) {
        List<Product> products = productService.getList(category, page, size);
        return Result.success(products);
    }
    
    /**
     * 获取产品详情
     */
    @GetMapping("/{id}")
    public Result<Product> getById(@PathVariable Long id) {
        Product product = productService.getById(id);
        return product != null ? Result.success(product) : Result.error("产品不存在");
    }
    
    /**
     * 获取产品分类
     */
    @GetMapping("/categories")
    public Result<List<Map<String, Object>>> getCategories() {
        List<Map<String, Object>> categories = productService.getCategories();
        return Result.success(categories);
    }
}
