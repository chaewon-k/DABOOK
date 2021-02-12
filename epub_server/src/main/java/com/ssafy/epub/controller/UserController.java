package com.ssafy.epub.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.epub.encrypt.BcryptImpl;
import com.ssafy.epub.encrypt.EncryptHandler;
import com.ssafy.epub.model.Epub;
import com.ssafy.epub.model.User;
import com.ssafy.epub.repository.EpubRepository;
import com.ssafy.epub.repository.UserRepository;
import com.ssafy.epub.service.MailService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

//http://localhost:8080/swagger-ui.html
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private EpubRepository epubRepository;
	@Autowired
	private MailService mailService;
	
	private EncryptHandler encryptHandler = new BcryptImpl();
	
	@GetMapping("/user/email/{email:.+}")
	@ApiOperation(value = "이메일 중복 체크", produces = MediaType.TEXT_PLAIN_VALUE)
	@ApiImplicitParams({ @ApiImplicitParam(name = "email", value = "중복 체크할 이메일", required = true, dataType = "String") })
	public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
		if(userRepository.findByEmail(email) == null)
			return new ResponseEntity<>(true, HttpStatus.OK);
		else
			return new ResponseEntity<>(false, HttpStatus.OK);
	}
	
	@GetMapping("/user/nickname/{nickname}")
	@ApiOperation(value = "nickname 중복 체크", produces = MediaType.TEXT_PLAIN_VALUE)
	@ApiImplicitParams({ @ApiImplicitParam(name = "nickname", value = "중복 체크할 닉네임", required = true, dataType = "String") })
	public ResponseEntity<Boolean> checkNickname(@PathVariable String nickname) {
		if(userRepository.findByNickname(nickname) == null)
			return new ResponseEntity<>(true, HttpStatus.OK);
		else
			return new ResponseEntity<>(false, HttpStatus.OK);
	}
	
	@GetMapping("/user/epub")
	@ApiOperation(value = "user 내에 epubName 중복 체크", produces = MediaType.TEXT_PLAIN_VALUE)
	@ApiImplicitParams({ @ApiImplicitParam(name = "email", value = "사용자", required = true, dataType = "String") , @ApiImplicitParam(name = "epubName", value = "중복 체크할 전자책 이름", required = true, dataType = "String")})
	public ResponseEntity<Boolean> checkEpubName(@RequestParam String email, @RequestParam String epubName) {
		List<Epub> epubList = userRepository.findByEmail(email).getEpubList();
			
		for(Epub epub : epubList) {
			if(epub.getEpubName().equals(epubName)) {
				return new ResponseEntity<>(false, HttpStatus.OK);
			}
		}
		return new ResponseEntity<>(true, HttpStatus.OK);
	}
	
	@PostMapping("/user/epub")
	@ApiOperation(value = "전자책 등록(user와 연결)", produces = MediaType.TEXT_PLAIN_VALUE)
	@ApiImplicitParams({ @ApiImplicitParam(name = "email", value = "사용자", required = true, dataType = "String") , @ApiImplicitParam(name = "epubName", value = "중복 체크할 전자책 이름", required = true, dataType = "String")})
	public ResponseEntity<Boolean> addEpubName(@RequestParam String email, @RequestParam String epubName) {
		User user = userRepository.findByEmail(email);
		
		Epub epub = new Epub();
		epub.setEpubName(epubName);
		epub.setFileList(new ArrayList<>());
		epub.setUserId(user.get_id());
		
		epub.set_id(epubRepository.save(epub).get_id());
		
		List<Epub> epubList = user.getEpubList();
		epubList.add(epub);
		user.setEpubList(epubList);
		
		userRepository.save(user);
		epubRepository.save(epub);
		
		return new ResponseEntity<>(true, HttpStatus.OK);
	}
	
	@GetMapping("/user/epub/list")
	@ApiOperation(value = "해당 user에 대한 epubList 반환", produces = MediaType.TEXT_PLAIN_VALUE)
	@ApiImplicitParams({ @ApiImplicitParam(name = "email", value = "사용자", required = true, dataType = "String")})
	public ResponseEntity<List<Epub>> getEpubList(@RequestParam String email) {
		List<Epub> epubList = userRepository.findByEmail(email).getEpubList();
		
		return new ResponseEntity<>(epubList, HttpStatus.OK);
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
		user.setPassword(encryptHandler.encrypt(user.getPassword()));
		if(user.getEpubList() == null) {
			user.setEpubList(new ArrayList<>());
		}
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

		User preUser = userRepository.findByEmail(user.getEmail());
		if (preUser != null) {
			preUser.setPassword(encryptHandler.encrypt(user.getPassword()));
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
	
//	@GetMapping("/user/epub/list/{email:.+}")
//	@ApiOperation(value = "이메일 epubList", produces = MediaType.TEXT_PLAIN_VALUE)
//	@ApiImplicitParams({ @ApiImplicitParam(name = "email", value = "중복 체크할 이메일", required = true, dataType = "String") })
//	public ResponseEntity<List<Epub>> getEpubList(@PathVariable String email) {
//		List<User> findUserList = userRepository.findByEmail(email);
//		List<Epub> epubList;
//		if(findUserList.size() == 0)
//			epubList = findUserList.get(0).getEpubList();
//			
//			return new ResponseEntity<>(epubList, HttpStatus.OK);
//		else
//			return new ResponseEntity<>(null, HttpStatus.OK);
//	}
	

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