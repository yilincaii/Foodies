package com.example.foodiesapi.service;

import com.example.foodiesapi.entity.CartEntity;
import com.example.foodiesapi.repository.CartRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService{
    private final CartRepository cartRepository;
    private final UserService userService;
    @Override
    public void addToCart(String foodId) {
        String loggedInUserId = userService.findByUserId();
        Optional<CartEntity> cartOptional  = cartRepository.findByUserId(loggedInUserId);
        CartEntity cart= cartOptional.orElseGet(() -> new CartEntity(loggedInUserId,new HashMap<>()));
        Map<String, Integer> cartItems = cart.getItems();
        cartItems.put(foodId,cartItems.getOrDefault(foodId,0) + 1);
        cart.setItems(cartItems);
        cartRepository.save(cart);

    }
}
