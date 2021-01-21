package com.ssafy.epub.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Epub {
	private String epubName;
	private List<File> fileList;
}