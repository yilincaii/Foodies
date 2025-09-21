package com.example.foodiesapi.controller;


import com.example.foodiesapi.io.FoodRequest;
import com.example.foodiesapi.io.FoodResponse;
import com.example.foodiesapi.service.FoodService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class FoodController {
    private final FoodService foodService;

    @PostMapping("/foods")
    public FoodResponse addFood(@RequestPart("food") String foodString,
                                @RequestPart("file") MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest request = null;
        try {
            request = objectMapper.readValue(foodString, FoodRequest.class);
        }catch(JsonProcessingException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format");
        }
        FoodResponse response = foodService.addFood(request, file);
        return response;
    }
    @GetMapping
    public List<FoodResponse> readFoods(){
        return foodService.readFoods();
    }

}
