package com.ssafy.epub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.epub.model.FileDTO;

public interface FileRepository extends MongoRepository<FileDTO, String>{

}