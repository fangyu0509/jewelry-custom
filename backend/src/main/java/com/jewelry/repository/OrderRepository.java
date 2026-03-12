package com.jewelry.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.jewelry.entity.Order;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderRepository extends BaseMapper<Order> {
}
