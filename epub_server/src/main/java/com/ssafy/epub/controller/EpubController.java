package com.ssafy.epub.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.epub.model.Epub;
import com.ssafy.epub.model.FileDTO;
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
	@Value("${spring.file.location}")
	private String storagePath = "C:/storage/";
	
	@GetMapping("/epub")
	@ApiOperation(value = "getAllEpubs", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<Epub>> getAllEpubs() {
		return new ResponseEntity<>(epubRepository.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/file")
	@ApiOperation(value = "getAllFiles", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<FileDTO>> getAllFiles() {
		return new ResponseEntity<>(fileRepository.findAll(),HttpStatus.OK);
	}
	//, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }
	@PostMapping(value = "/upload", consumes = {"multipart/form-data"})
	@ApiOperation(value = "upload")
	public ResponseEntity<Boolean> upload(@RequestParam("file") MultipartFile mfFile,@RequestParam("email") String email,@RequestParam("epubName") String epubName) {
		//List<MultipartFile> files = uploadFilesInfo.getFiles();
		
		//String filePath = storagePath + "/" + uploadFilesInfo.getEmail() + "/" + uploadFilesInfo.getEpubName() + "/";
		String filePath = storagePath + "/" + email + "/" + epubName + "/";
		
		//for(MultipartFile mfFile : files) {
			File file = new File(filePath + mfFile.getOriginalFilename());
			
			// 주어진 경로에 존재하지 않는 모든 디렉토리 생성
			if(file.getParentFile().mkdirs()) {
				try {
					// 물리파일 생성
					file.createNewFile();
				}
				catch(IOException ie) {
					// 파일 생성 중 오류
					ie.printStackTrace();
					return ResponseEntity.status(HttpStatus.CONFLICT).build();
				}			
			}
			
			try {
				// 업로드 임시파일 -> 물리파일 덮어쓰기
				mfFile.transferTo(file);
			}
			catch(IOException ie) {
				// 덮어쓰기 중 오류
				ie.printStackTrace();
				return ResponseEntity.status(HttpStatus.CONFLICT).build();
			}
			FileDTO fileDTO = new FileDTO();
			fileDTO.setDataLocation(filePath + mfFile.getOriginalFilename());
			fileDTO.setFileName(mfFile.getOriginalFilename());
			fileRepository.save(fileDTO);
		//}
		
		
		return new ResponseEntity<>(true,HttpStatus.OK);
	}
}
