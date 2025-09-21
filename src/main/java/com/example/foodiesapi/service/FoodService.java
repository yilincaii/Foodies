package com.example.foodiesapi.service;

import com.example.foodiesapi.io.FoodRequest;
import com.example.foodiesapi.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FoodService {
    String uploadFile(MultipartFile file);
    FoodResponse addFood(FoodRequest request, MultipartFile file);

}
