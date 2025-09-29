package com.example.foodiesapi.service;

import com.example.foodiesapi.entity.OrderEntity;
import com.example.foodiesapi.io.OrderRequest;     // 你的 DTO
import com.example.foodiesapi.io.OrderResponse;
import com.example.foodiesapi.repository.CartRepository;
import com.example.foodiesapi.repository.OrderRepository;
import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;
import com.paypal.http.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final CartRepository cartRepository;

    @Value("${paypal.client.id}")
    private String PAYPAL_CLIENT_ID;

    @Value("${paypal.client.secret}")
    private String PAYPAL_CLIENT_SECRET;

    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws IOException {
        OrderEntity newOrder = convertToEntity(request);
        newOrder = orderRepository.save(newOrder);

        PayPalEnvironment environment = new PayPalEnvironment.Sandbox(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
        PayPalHttpClient client = new PayPalHttpClient(environment);


        com.paypal.orders.OrderRequest ppReq = new com.paypal.orders.OrderRequest()
                .checkoutPaymentIntent("CAPTURE");

        List<com.paypal.orders.PurchaseUnitRequest> units = new ArrayList<>();
        com.paypal.orders.PurchaseUnitRequest unit = new com.paypal.orders.PurchaseUnitRequest()
                .amountWithBreakdown(new com.paypal.orders.AmountWithBreakdown()
                        .currencyCode("USD")
                        .value(String.format("%.2f", newOrder.getAmount())));
        units.add(unit);
        ppReq.purchaseUnits(units);

        com.paypal.orders.ApplicationContext ctx = new com.paypal.orders.ApplicationContext()
                .returnUrl("http://localhost:5173/success")
                .cancelUrl("http://localhost:5173/cancel");
        ppReq.applicationContext(ctx);

        com.paypal.orders.OrdersCreateRequest createReq = new com.paypal.orders.OrdersCreateRequest()
                .requestBody(ppReq);

        HttpResponse<com.paypal.orders.Order> res = client.execute(createReq);
        com.paypal.orders.Order ppOrder = res.result();

        // push back approveLink
        String approve = ppOrder.links().stream()
                .filter(l -> "approve".equalsIgnoreCase(l.rel()))
                .map(com.paypal.orders.LinkDescription::href)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No approve link from PayPal"));

        newOrder.setPaypalOrderId(ppOrder.id());
        newOrder.setUserId(userService.findByUserId());
        newOrder.setPaymentStatus("CREATED");
        newOrder = orderRepository.save(newOrder);
        newOrder = orderRepository.save(newOrder);

        OrderResponse resp = convertToResponse(newOrder);
        //to the front end
        resp.setApproveLink(approve);
        return resp;
    }

    @Override
    public void verifyPayment(Map<String, String> paymentData, String status) {
        String paypalOrderId = paymentData.get("paypal_order_id");
        OrderEntity existingOrder = orderRepository.findByPaypalOrderId(paypalOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        existingOrder.setPaymentStatus(status);
        existingOrder.setPaypalPaymentId(paymentData.get("paypal_payment_id"));
        orderRepository.save(existingOrder);

        if ("COMPLETED".equalsIgnoreCase(status)) {
            cartRepository.deleteByUserId(existingOrder.getUserId());
        }
    }

    @Override
    public OrderResponse captureOrder(String paypalOrderId) throws IOException {
        // 1) PayPal
        PayPalEnvironment environment = new PayPalEnvironment.Sandbox(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
        PayPalHttpClient client = new PayPalHttpClient(environment);

        com.paypal.orders.OrdersCaptureRequest capReq =
                new com.paypal.orders.OrdersCaptureRequest(paypalOrderId);
        capReq.requestBody(new com.paypal.orders.OrderRequest());


        HttpResponse<com.paypal.orders.Order> capRes = client.execute(capReq);
        com.paypal.orders.Order capOrder = capRes.result();

        String status = capOrder.status();
        String captureId = null;
        try {
            captureId = capOrder.purchaseUnits().get(0)
                    .payments().captures().get(0).id();
        } catch (Exception ignore) {}

        //update
        OrderEntity entity = orderRepository.findByPaypalOrderId(paypalOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found by paypalOrderId"));

        entity.setPaymentStatus(status);
        if (captureId != null) entity.setPaypalPaymentId(captureId);
        orderRepository.save(entity);

        // if complete clear the cart
        if ("COMPLETED".equalsIgnoreCase(status)) {
            cartRepository.deleteByUserId(entity.getUserId());
        }

        return convertToResponse(entity);
    }

    @Override
    public List<OrderResponse> getUserOrders() {
        String uid = userService.findByUserId();
        return orderRepository.findByUserId(uid)
                .stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Override
    public void removeOrder(String orderId) {
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<OrderResponse> getOrdersOfAllUsers() {
        return orderRepository.findAll()
                .stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Override
    public void updateOrderStatus(String orderId, String status) {
        OrderEntity entity = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        entity.setOrderStatus(status);
        orderRepository.save(entity);
    }

    private OrderResponse convertToResponse(OrderEntity o) {
        return OrderResponse.builder()
                .id(o.getId())
                .amount(o.getAmount())
                .userAddress(o.getUserAddress())
                .userId(o.getUserId())
                .paypalOrderId(o.getPaypalOrderId())
                .paymentStatus(o.getPaymentStatus())
                .orderStatus(o.getOrderStatus())
                .email(o.getEmail())
                .phoneNumber(o.getPhoneNumber())
                .orderedItems(o.getOrderedItems())
                .build();
    }

    private OrderEntity convertToEntity(OrderRequest r) {
        return OrderEntity.builder()
                .userAddress(r.getUserAddress())
                .amount(r.getAmount())
                .orderedItems(r.getOrderedItems())
                .email(r.getEmail())
                .phoneNumber(r.getPhoneNumber())
                .orderStatus(r.getOrderStatus())
                .build();
    }
}
