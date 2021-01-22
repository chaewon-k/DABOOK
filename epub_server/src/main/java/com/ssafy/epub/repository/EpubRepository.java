package com.ssafy.epub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.epub.model.Epub;

public interface EpubRepository extends MongoRepository<Epub, String>{

}