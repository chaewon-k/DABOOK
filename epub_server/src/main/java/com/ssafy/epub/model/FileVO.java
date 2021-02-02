package com.ssafy.epub.model;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FileVO {
	private List<MultipartFile> files;
	private String email;
	private String epubName;
}
