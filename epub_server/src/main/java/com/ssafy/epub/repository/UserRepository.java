package com.ssafy.epub.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.epub.model.User;

public interface UserRepository extends MongoRepository<User, String>{
	List<User> findByEmail(String email);
	List<User> findByNickname(String nickname);
}