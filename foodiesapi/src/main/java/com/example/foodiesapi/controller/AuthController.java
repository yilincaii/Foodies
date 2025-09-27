package com.example.foodiesapi.controller;

import com.example.foodiesapi.io.AuthenticationRequest;
import com.example.foodiesapi.io.AuthenticationResponse;
import com.example.foodiesapi.service.AppUserDetailsService;
import com.example.foodiesapi.util.JwtUtil;
import lombok.AllArgsConstructor;
//import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api")
@AllArgsConstructor

public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService UserDetailsService;
    private final JwtUtil jwtUtil;
    @PostMapping("/login")

    public AuthenticationResponse login(@RequestBody AuthenticationRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        final UserDetails userDetails= UserDetailsService.loadUserByUsername(request.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);
        return new AuthenticationResponse(request.getEmail(),jwtToken);
    }
}
