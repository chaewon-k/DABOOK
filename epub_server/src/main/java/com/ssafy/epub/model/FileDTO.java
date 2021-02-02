package com.ssafy.epub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Document(collection = "files")
public class FileDTO {
	@Id
	private String _id;
	
	private String type;
	private String fileName;
	private String epubLocation;
	private String dataLocation;
	private String epubId;
}