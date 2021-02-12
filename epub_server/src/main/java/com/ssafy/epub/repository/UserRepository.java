package com.ssafy.epub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.epub.model.User;

public interface UserRepository extends MongoRepository<User, String>{
	User findByEmail(String email);
	User findByNickname(String nickname);
}