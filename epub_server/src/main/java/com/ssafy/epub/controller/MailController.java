package com.ssafy.epub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.ssafy.epub.encrypt.BcryptImpl;
import com.ssafy.epub.encrypt.EncryptHandler;
import com.ssafy.epub.model.User;
import com.ssafy.epub.repository.UserRepository;
import com.ssafy.epub.service.MailService;

import io.swagger.annotations.ApiOperation;

@Controller
@CrossOrigin(origins = "http://localhost:8081")
public class MailController {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MailService mailService;

	private EncryptHandler encryptHandler = new BcryptImpl();

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
	
	@GetMapping("/password")
	@ApiOperation(value = "find password", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<Boolean> findPassword(String email) {
		String tempPassword = getTempPassword();
		
		try {
			List<User> findUserList = userRepository.findByEmail(email);
			if (findUserList.size() == 1) {
				User preUser = findUserList.get(0);
				mailService.findPasswordEmailSender(preUser, tempPassword);
				preUser.setPassword(encryptHandler.encrypt(tempPassword));
				userRepository.save(preUser);
				return new ResponseEntity<>(true, HttpStatus.OK);
			} else
				return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
	
	private String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ,
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                'u', 'v', 'w', 'x', 'y', 'z'};

        String str = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }
}