package com.ssafy.epub.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ssafy.epub.model.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailService {
	private final JavaMailSender javaMailSender;
	
	public void signUpEmailSender(User user) throws MessagingException {
		MimeMessage mailMessage = javaMailSender.createMimeMessage();
		mailMessage.addRecipients(RecipientType.TO, user.getEmail());
		mailMessage.setSubject("회원 가입 인증 이메일");
		mailMessage.setText(new StringBuffer().append("<h1>회원가입 인증메일입니다.</h1>")
			    .append("<p>밑의 링크를 클릭하면 메일이 인증 됩니다.</p>")
			    .append("<a href='http://localhost:8080/auth?token="+user.getEmailToken())
			    .append("&email="+user.getEmail()+"' target='_blank'>메일 인증 링크</a>")
			    .toString(),"utf-8","html"
			  );
		javaMailSender.send(mailMessage);
	}
}