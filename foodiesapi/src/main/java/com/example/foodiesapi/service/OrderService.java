//package com.example.foodiesapi.service;
//
//import com.example.foodiesapi.io.OrderRequest;
//import com.example.foodiesapi.io.OrderResponse;
//import com.example.foodiesapi.repository.OrderRepository;
//
//public interface OrderService {
//    OrderResponse createOrderWithPayment(OrderRequest request)
//}
package com.example.foodiesapi.service;

import com.example.foodiesapi.io.OrderRequest;
import com.example.foodiesapi.io.OrderResponse;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface OrderService {
    OrderResponse createOrderWithPayment(OrderRequest request) throws IOException;
    void verifyPayment(Map<String, String> paymentData, String status);
    OrderResponse captureOrder(String paypalOrderId) throws IOException;

    List<OrderResponse> getUserOrders();
    void removeOrder(String orderId);
    List<OrderResponse> getOrdersOfAllUsers();
    void updateOrderStatus(String orderId, String status);
}

