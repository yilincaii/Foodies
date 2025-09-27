package com.example.foodiesapi.service;

import com.example.foodiesapi.entity.UserEntity;
import com.example.foodiesapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;


import java.util.Collections;

@Service
@AllArgsConstructor
public class AppUserDetailsService implements UserDetailsService{
    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new User(user.getEmail(),user.getPassword(), Collections.emptyList());
    }

}
