package com.ssafy.epub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.epub.model.Customer;

public interface CustomerRepository extends MongoRepository<Customer, String>{

}