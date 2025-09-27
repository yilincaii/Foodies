package com.example.foodiesapi.controller;

import com.example.foodiesapi.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor

public class CartController {
    private final CartService cartService;
@PostMapping
    public ResponseEntity<?> addToCart(@RequestBody Map<String,String> request){
        String foodID = request.get("foodId");
        if(foodID == null ||foodID.isEmpty() ){
            return ResponseEntity.badRequest().body("Food ID is required");
        }
        cartService.addToCart(foodID);
        return ResponseEntity.ok().body(null);
    }
}
