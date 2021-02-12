package com.ssafy.epub.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.epub.model.Epub;

public interface EpubRepository extends MongoRepository<Epub, String>{
	List<Epub> findByEpubName(String epubName);
	Epub findBy_id(String _id);
}