package com.ssafy.epub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.epub.model.File;

public interface FileRepository extends MongoRepository<File, String>{

}