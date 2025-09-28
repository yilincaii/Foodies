package com.example.foodiesapi.controller;

import com.example.foodiesapi.io.CartRequest;
import com.example.foodiesapi.io.CartResponse;
import com.example.foodiesapi.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor

public class CartController {
    private final CartService cartService;
@PostMapping
    public CartResponse addToCart(@RequestBody CartRequest request){
        String foodID = request.getFoodId();
        if(foodID == null ||foodID.isEmpty() ){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FoodId not found");
        }
        return cartService.addToCart(request);

    }
}
