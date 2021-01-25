package com.ssafy.epub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.ssafy.epub.model.User;
import com.ssafy.epub.repository.UserRepository;

import io.swagger.annotations.ApiOperation;

@Controller
@CrossOrigin(origins = "http://localhost:8081")
public class MailController {
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/auth")
	@ApiOperation(value = "verify email", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<Boolean> verifyEmail(String token, String email) {
		try {
			List<User> findUserList = userRepository.findByEmail(email);
			if (findUserList.size() == 1 && findUserList.get(0).getEmailToken().equals(token)) {
				User preUser = findUserList.get(0);
				preUser.setStatus(true);
				userRepository.save(preUser);
				return new ResponseEntity<>(true, HttpStatus.OK);
			} else
				return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
}