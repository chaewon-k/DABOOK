package com.ssafy.epub.controller;

import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.epub.model.User;
import com.ssafy.epub.repository.UserRepository;
import com.ssafy.epub.service.MailService;

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
	@Autowired
	private MailService mailService;
	
	@GetMapping("/user/{email}")
	@ApiOperation(value = "이메일 중복 체크", produces = MediaType.TEXT_PLAIN_VALUE)
	@ApiImplicitParams({ @ApiImplicitParam(name = "email", value = "중복 체크할 이메일", required = true, dataType = "String") })
	public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
		if(userRepository.findByEmail(email).size() == 0)
			return new ResponseEntity<>(true, HttpStatus.OK);
		else
			return new ResponseEntity<>(false, HttpStatus.OK);
	}
	
	@GetMapping("/user/{nickname}")
	@ApiOperation(value = "nickname 중복 체크", produces = MediaType.TEXT_PLAIN_VALUE)
	@ApiImplicitParams({ @ApiImplicitParam(name = "nickname", value = "중복 체크할 닉네임", required = true, dataType = "String") })
	public ResponseEntity<Boolean> checkNickname(@PathVariable String nickname) {
		if(userRepository.findByNickname(nickname).size() == 0)
			return new ResponseEntity<>(true, HttpStatus.OK);
		else
			return new ResponseEntity<>(false, HttpStatus.OK);
	}
	
	@GetMapping("/user")
	@ApiOperation(value = "getAllUsers", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<User>> getAllUsers() {
		return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
	}

	@PostMapping("/user")
	@ApiOperation(value = "addUser")
	@ApiImplicitParams({ @ApiImplicitParam(name = "user", value = "회원 객체", required = true, dataType = "User") })
	public ResponseEntity<Boolean> addUser(@RequestBody User user) throws MessagingException {

		if (userRepository.save(user) != null) {
			user.generateEmailToken();
			mailService.signUpEmailSender(user);
			userRepository.save(user);

			return new ResponseEntity<>(true, HttpStatus.OK);
		} else
			return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);

	}

	@PutMapping("/user")
	@ApiOperation(value = "updateUser")
	@ApiImplicitParams({ @ApiImplicitParam(name = "user", value = "회원 객체", required = true, dataType = "User") })
	public ResponseEntity<Boolean> updateUser(@RequestBody User user) {

		List<User> findUserList = userRepository.findByEmail(user.getEmail());
		if (findUserList.size() == 1) {
			User preUser = findUserList.get(0);
			preUser.setPassword(user.getPassword());
			preUser.setNickname(user.getNickname());
			userRepository.save(preUser);
			
			return new ResponseEntity<>(true, HttpStatus.OK);
		} else
			return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);

	}

	@DeleteMapping("/user")
	@ApiOperation(value = "deleteUser")
	@ApiImplicitParams({ @ApiImplicitParam(name = "user", value = "회원 객체", required = true, dataType = "User") })
	public ResponseEntity<Boolean> deleteUser(@RequestBody User user) {

		if (user != null) {
			userRepository.delete(user);
			return new ResponseEntity<>(true, HttpStatus.OK);
		} else
			return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);

	}

//	@DeleteMapping("/user")
//	@ApiOperation(value = "deleteUser")
//	@ApiImplicitParams({
//		@ApiImplicitParam(name = "email", value = "삭제할 회원의 이메일", required = true, dataType = "String")
//	})
//	public ResponseEntity<Boolean> deleteUser(@RequestBody String email) {
//		try {
//			List<User> findUserList = userRepository.findByEmail(email);
//			if(findUserList.size() == 1) {
//				User preUser = findUserList.get(0);
//				userRepository.deleteById(preUser.get_id());
//				return new ResponseEntity<>(true, HttpStatus.OK);
//			}
//			else
//				return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
//		}catch(Exception e) {
//			e.printStackTrace();
//			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}
}