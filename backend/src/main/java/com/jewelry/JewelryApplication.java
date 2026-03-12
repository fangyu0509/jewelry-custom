package com.jewelry;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.jewelry.repository")
public class JewelryApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(JewelryApplication.class, args);
    }
}
