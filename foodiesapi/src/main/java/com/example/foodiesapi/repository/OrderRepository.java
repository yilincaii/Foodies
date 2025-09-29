package com.example.foodiesapi.repository;
import com.example.foodiesapi.entity.OrderEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<OrderEntity,String> {
    List<OrderEntity> findByUserId(String userId);
    Optional<OrderEntity> findByPaypalOrderId(String paypalOrderId);
}
