package com.ssafy.epub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.epub.model.User;
import com.ssafy.epub.repository.UserRepository;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

//http://localhost:8080/swagger-ui.html
@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/user")
	@ApiOperation(value = "getAllUsers", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<User>> getAllUsers() {
		return new ResponseEntity<>(userRepository.findAll(),HttpStatus.OK);
	}
	
	@PostMapping("/user")
	@ApiOperation(value = "addUser")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "user", value = "회원 객체", required = true, dataType = "User")
	})
	public ResponseEntity<Boolean> addUser(@RequestBody User user) {
		try {
			if(userRepository.save(user) != null) {
				//인증 메일 보내기
				return new ResponseEntity<>(true, HttpStatus.OK);
			}
			else
				return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/user")
	@ApiOperation(value = "updateUser")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "user", value = "회원 객체", required = true, dataType = "User")
	})
	public ResponseEntity<Boolean> updateUser(@RequestBody User user) {
		try {
			List<User> findUserList = userRepository.findByEmail(user.getEmail());
			if(findUserList.size() == 1) {
				User preUser = findUserList.get(0);
				preUser.setPassword(user.getPassword());
				preUser.setNickname(user.getNickname());
				userRepository.save(preUser);
				return new ResponseEntity<>(true, HttpStatus.OK);
			}
			else
				return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/user")
	@ApiOperation(value = "deleteUser")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "user", value = "회원 객체", required = true, dataType = "User")
	})
	public ResponseEntity<Boolean> deleteUser(@RequestBody User user) {
		try {
			
			if(user != null) {
				userRepository.delete(user);
				return new ResponseEntity<>(true, HttpStatus.OK);
			}
			else
				return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/user")
	@ApiOperation(value = "deleteUser")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "email", value = "삭제할 회원의 이메일", required = true, dataType = "String")
	})
	public ResponseEntity<Boolean> deleteUser(@RequestBody String email) {
		try {
			List<User> findUserList = userRepository.findByEmail(email);
			if(findUserList.size() == 1) {
				User preUser = findUserList.get(0);
				userRepository.deleteById(preUser.get_id());
				return new ResponseEntity<>(true, HttpStatus.OK);
			}
			else
				return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}