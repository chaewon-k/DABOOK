package com.ssafy.epub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.epub.model.Epub;
import com.ssafy.epub.model.File;
import com.ssafy.epub.repository.EpubRepository;
import com.ssafy.epub.repository.FileRepository;

import io.swagger.annotations.ApiOperation;

//http://localhost:8080/swagger-ui.html
@CrossOrigin({"*"})
@RestController
@RequestMapping("/api")
public class EpubController {
	@Autowired
	private EpubRepository epubRepository;
	@Autowired
	private FileRepository fileRepository;
	
	@GetMapping("/epub")
	@ApiOperation(value = "getAllEpubs", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<Epub>> getAllEpubs() {
		return new ResponseEntity<>(epubRepository.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/file")
	@ApiOperation(value = "getAllFiles", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<File>> getAllFiles() {
		return new ResponseEntity<>(fileRepository.findAll(),HttpStatus.OK);
	}
}
