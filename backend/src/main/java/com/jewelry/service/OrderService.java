package com.jewelry.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.jewelry.entity.Order;
import com.jewelry.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    
    @Transactional
    public Map<String, Object> createOrder(Long userId, Map<String, Object> params) {
        Order order = new Order();
        order.setOrderNo(UUID.randomUUID().toString().replace("-", "").substring(0, 32));
        order.setUserId(userId);
        order.setStatus(0); // 待支付
        order.setProductId(((Number) params.get("productId")).longValue());
        order.setProductName((String) params.get("productName"));
        order.setCustomInfo((String) params.get("customInfo"));
        order.setProductPrice((java.math.BigDecimal) params.get("productPrice"));
        order.setCustomPrice((java.math.BigDecimal) params.getOrDefault("customPrice", 0));
        order.setTotalPrice(order.getProductPrice().add(order.getCustomPrice()));
        order.setReceiverName((String) params.get("receiverName"));
        order.setReceiverPhone((String) params.get("receiverPhone"));
        order.setReceiverAddress((String) params.get("receiverAddress"));
        
        orderRepository.insert(order);
        
        return Map.of("orderId", order.getId(), "orderNo", order.getOrderNo());
    }
    
    public List<Order> getList(Long userId, Integer status, Integer page, Integer size) {
        Page<Order> p = new Page<>(page, size);
        var query = new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<Order>();
        query.eq(Order::getUserId, userId);
        if (status != null) {
            query.eq(Order::getStatus, status);
        }
        query.orderByDesc(Order::getCreateTime);
        return orderRepository.selectPage(p, query).getRecords();
    }
    
    public Order getById(Long id, Long userId) {
        var query = new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<Order>();
        query.eq(Order::getId, id).eq(Order::getUserId, userId);
        return orderRepository.selectOne(query);
    }
    
    @Transactional
    public void cancelOrder(Long id, Long userId) {
        Order order = getById(id, userId);
        if (order != null && order.getStatus() == 0) {
            order.setStatus(5); // 已取消
            orderRepository.updateById(order);
        }
    }
}
