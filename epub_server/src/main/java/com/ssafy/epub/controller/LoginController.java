package com.ssafy.epub.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.epub.config.JwtTokenProvider;
import com.ssafy.epub.encrypt.BcryptImpl;
import com.ssafy.epub.encrypt.EncryptHandler;
import com.ssafy.epub.model.User;
import com.ssafy.epub.repository.UserRepository;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoginController {
	@Autowired
	UserRepository userRepository;
	@Autowired
	JwtTokenProvider jwtTokenProvider;
	
	EncryptHandler encryptHandler = new BcryptImpl();
	
	@PostMapping("/login")
	@ApiOperation(value = "로그인")
	@ApiImplicitParams({
	@ApiImplicitParam(name = "req", value = "id/password가 담긴 객체", required = true, dataType = "Map")})
	public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> req) {
		String email = req.get("email");
		String password = req.get("password");

		User user = null;
		Map<String, String> result = new HashMap<>();
		//아이디가 존재하지 않을 때
		if(userRepository.findByEmail(email).size() == 0) {
			result.put("result", "ERROR_ID");
			return ResponseEntity.ok().body(result);
		}
		
		//비밀번호가 틀렸을 때
//		if(!userRepository.findByEmail(email).get(0).getPassword().equals(password)) {
		if(!encryptHandler.isMatch(password, userRepository.findByEmail(email).get(0).getPassword())) {
			System.out.println();
			result.put("result", "ERROR_PASSWORD");
			return ResponseEntity.ok().body(result);
		}
		
		//비밀번호는 맞았는데 status가 false일 때
		if(!userRepository.findByEmail(email).get(0).isStatus()) {
			result.put("result", "ERROR_STATUS");
			return ResponseEntity.ok().body(result);
		}
		
		user = userRepository.findByEmail(email).get(0);
		String token = jwtTokenProvider.createToken(user.getEmail());
			
		result.put("token", token);
		result.put("result", "SUCCESS_LOGIN");
		result.put("email", user.getEmail());
		result.put("nickname", user.getNickname());
			
		return ResponseEntity.ok().body(result);
	}
}
