package com.ssafy.epub.model;

import java.util.List;

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
@Document(collection = "customers")
public class Customer {
	@Id
	private String _id;
	
	private String email;
	private String password;
	private String nickname;
	private boolean status;
	
	private List<Epub> epubList;
	
	public Customer(String email, String password, String nickname){
		this.email = email;
		this.password = password;
		this.nickname = nickname;
	}
}