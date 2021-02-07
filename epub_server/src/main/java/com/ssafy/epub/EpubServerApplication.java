package com.ssafy.epub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackages = "com.ssafy.epub.repository")
//(exclude = {DataSourceAutoConfiguration.class})
@SpringBootApplication
public class EpubServerApplication{
	
	public static void main(String[] args) {
		SpringApplication.run(EpubServerApplication.class, args);
	}

}
