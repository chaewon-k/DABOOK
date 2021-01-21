package com.ssafy.epub.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class File {
	private String type;
	private String fileName;
	private String epubLocation;
	private String dataLocation;
}