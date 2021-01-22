package com.ssafy.epub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.epub.model.User;
import com.ssafy.epub.repository.UserRepository;

import io.swagger.annotations.ApiOperation;

//http://localhost:8080/swagger-ui.html
@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/customers")
	@ApiOperation(value = "getAllCustomers", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<User>> getAllCustomers() {
		return new ResponseEntity<>(userRepository.findAll(),HttpStatus.OK);
	}
}
