package com.jewelry.controller;

import com.jewelry.entity.Order;
import com.jewelry.service.OrderService;
import com.jewelry.util.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 订单控制器
 */
@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    
    /**
     * 创建订单
     */
    @PostMapping("/create")
    public Result<Map<String, Object>> createOrder(
            @RequestBody Map<String, Object> params,
            @RequestHeader("X-User-Id") Long userId) {
        Map<String, Object> orderInfo = orderService.createOrder(userId, params);
        return Result.success(orderInfo);
    }
    
    /**
     * 订单列表
     */
    @GetMapping("/list")
    public Result<List<Order>> getList(
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestHeader("X-User-Id") Long userId) {
        List<Order> orders = orderService.getList(userId, status, page, size);
        return Result.success(orders);
    }
    
    /**
     * 订单详情
     */
    @GetMapping("/{id}")
    public Result<Order> getById(@PathVariable Long id,
                                  @RequestHeader("X-User-Id") Long userId) {
        Order order = orderService.getById(id, userId);
        return order != null ? Result.success(order) : Result.error("订单不存在");
    }
    
    /**
     * 取消订单
     */
    @PostMapping("/{id}/cancel")
    public Result<Void> cancelOrder(@PathVariable Long id,
                                     @RequestHeader("X-User-Id") Long userId) {
        orderService.cancelOrder(id, userId);
        return Result.success();
    }
}
