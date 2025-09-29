package com.example.foodiesapi.io;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItem {
    private String foodId;
    private int quantity;
    private double price;
    private String category;
    private String description;
    private String imageUrl;
    private String name;
}
