package com.example.foodiesapi.entity;

import com.example.foodiesapi.io.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {
    @Id
    private String id;

    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;

    private List<OrderItem> orderedItems;
    private double amount;

    // 支付相关
    private String paymentStatus;
    private String paypalOrderId;
    private String paypalPaymentId;
    private String orderStatus;
}
