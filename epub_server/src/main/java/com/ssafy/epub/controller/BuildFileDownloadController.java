package com.ssafy.epub.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class BuildFileDownloadController {
	@Value("${spring.build.file.location}")
	private String buildFilePath;
	@Value("${spring.build.file.name}")
	private String buildFileName;
	
	@GetMapping("/build/download")
	@ApiOperation(value = "download build file")
	public ResponseEntity<Resource> download() throws IOException {
		Path localPath = Paths.get(buildFilePath + "/" + buildFileName);
		String contentType = Files.probeContentType(localPath);
		
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_TYPE, contentType);
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + buildFileName + "\"");


		Resource resource = new InputStreamResource(Files.newInputStream(localPath));
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}
}
