package com.ssafy.epub.model;

import java.util.List;

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
@Document(collection = "epubs")
public class Epub {
	@Id
	private String _id;
	private String userId;
	private String epubName;
	private List<String> fileList;
}