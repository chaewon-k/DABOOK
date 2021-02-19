package com.ssafy.epub.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FileVO {
	private MultipartFile file;
	private String email;
	private String epubName;
	private String path;
}
