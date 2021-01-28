package com.ssafy.epub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;


@Configuration
public class MongoConfig extends MongoAutoConfiguration {
	@Value("${spring.data.mongodb.username}") // application.properties에서 정의한 MongoDB에 계정 아이디
	private String userName;

	@Value("${spring.data.mongodb.password}") // application.properties에서 정의한 MongoDB에 계정 비밀번호
	private String password;

	@Value("${spring.data.mongodb.database}") // application.properties에서 정의한 MongoDB에있는 데이터베이스
	private String database;
	
	@Value("${spring.data.mongodb.host}") // application.properties에서 정의한 MongoDB에있는 host
	private String host;
	
	@Value("${spring.data.mongodb.port}") // application.properties에서 정의한 MongoDB에있는 port 번호
	private String port;

	@Bean
	public MongoTemplate mongoTemplate() throws Exception {
		return new MongoTemplate((MongoClient) mongoClient(), database);
	}

	@Bean
	public MongoClient mongoClient() {
		// MongoDB 접속을 위한 url세팅
		MongoClient mongoClient = MongoClients.create(
	            new ConnectionString("mongodb://"+userName+":"+password+"@"+host+":"+port+"/"+database+"?authSource=admin"));
		return mongoClient;
	}
}