package com.ssafy.epub.model;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Document(collection = "users")
public class User {
	@Id
	private String _id;
	
	private String name;
	private String email;
	private String password;
	private String nickname;
	private boolean status;
	private String emailToken;
	private List<String> epubList;
	
	public User(String email, String password, String nickname){
		this.email = email;
		this.password = password;
		this.nickname = nickname;
	}
	
	public void generateEmailToken() {
		this.emailToken = UUID.randomUUID().toString();
	}
}