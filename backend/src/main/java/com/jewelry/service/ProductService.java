package com.jewelry.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.jewelry.entity.Product;
import com.jewelry.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductService {
    
    private final ProductRepository productRepository;
    
    public List<Product> getList(String category, Integer page, Integer size) {
        Page<Product> p = new Page<>(page, size);
        var query = new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<Product>();
        if (category != null && !category.isEmpty()) {
            query.eq(Product::getCategory, category);
        }
        query.eq(Product::getStatus, 1).orderByDesc(Product::getSort);
        return productRepository.selectPage(p, query).getRecords();
    }
    
    public Product getById(Long id) {
        return productRepository.selectById(id);
    }
    
    public List<Map<String, Object>> getCategories() {
        return List.of(
            Map.of("id", "necklace", "name", "项链"),
            Map.of("id", "bracelet", "name", "手链"),
            Map.of("id", "ring", "name", "戒指"),
            Map.of("id", "earring", "name", "耳环")
        );
    }
}
