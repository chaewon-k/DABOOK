package com.ssafy.epub.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin({"*"})
@RestController("/api")
public class AuthController {
	@PostMapping("/google/auth")
	public ResponseEntity<Object> index(@RequestBody Object token) {
		System.out.println(token);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }
}