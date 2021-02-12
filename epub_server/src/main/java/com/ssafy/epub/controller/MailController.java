package com.ssafy.epub.controller;

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
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MailController {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MailService mailService;

	private EncryptHandler encryptHandler = new BcryptImpl();

	// 이메일 인증
	@GetMapping("/auth")
	@ApiOperation(value = "verify email", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<Boolean> verifyEmail(String token, String email) {
		try {
			// findByEmail의 반환이 List & 회원가입 시 중복체크를 함으로 email에 맞는 User는 한명이다.
			User findUser = userRepository.findByEmail(email);
			if (findUser.getEmailToken().equals(token)) {
				// 이메일 인증 완료시 Status를 false에서 true로 전환한다.
				findUser.setStatus(true);
				userRepository.save(findUser);
				return new ResponseEntity<>(true, HttpStatus.OK);
			} else
				return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
	// 비밀번호 찾기.
	@GetMapping("/password")
	@ApiOperation(value = "find password", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<Boolean> findPassword(String email) {
		String tempPassword = getTempPassword();
		
		try {
			User preUser = userRepository.findByEmail(email);
			// User가 입력한 이메일이 DB에 없는 경우를 체크
			if (preUser != null) {
				// 비밀번호는 임시 비밀번호로 발송한다.
				mailService.findPasswordEmailSender(preUser, tempPassword);
				// 비밀번호는 사용자만 알고있어야함으로 DB에는 암호화되어 저장된다.
				preUser.setPassword(encryptHandler.encrypt(tempPassword));
				// 바뀐 임시비밀번호로 저장.
				userRepository.save(preUser);
				return new ResponseEntity<>(true, HttpStatus.OK);
			} else
				return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
	// 임시 비밀번호 만들기.
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