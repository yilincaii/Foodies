package com.example.foodiesapi.io;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private String userId;
    private List<OrderItem> orderedItems;
    private String userAddress;
    private double amount;

    @JsonAlias({"phonenumber"})
    private String phoneNumber;

    private String orderStatus;
    private String email;
}
