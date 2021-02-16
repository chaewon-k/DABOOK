package com.ssafy.epub.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
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
import com.ssafy.epub.model.FileVO;
import com.ssafy.epub.model.User;
import com.ssafy.epub.repository.EpubRepository;
import com.ssafy.epub.repository.FileRepository;
import com.ssafy.epub.repository.UserRepository;

import io.swagger.annotations.ApiOperation;

//http://localhost:8080/swagger-ui.html
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class EpubController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private EpubRepository epubRepository;
	@Autowired
	private FileRepository fileRepository;
	@Value("${spring.file.location}")
	private String storagePath;
	
	@GetMapping("/file")
	@ApiOperation(value = "getAllFiles", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<FileDTO>> getAllFiles(String id) {
		List<FileDTO> fileList = epubRepository.findBy_id(id).getFileList();
		
		return new ResponseEntity<>(fileList,HttpStatus.OK);
	}
	//, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }
	@PostMapping(value = "/upload")
	@ApiOperation(value = "upload file")
	public ResponseEntity<Boolean> upload(FileVO fileVo) {
		//List<MultipartFile> files = uploadFilesInfo.getFiles();
		
		//String filePath = storagePath + "/" + uploadFilesInfo.getEmail() + "/" + uploadFilesInfo.getEpubName() + "/";
		String filePath = storagePath + "/" + fileVo.getEmail() + "/" + fileVo.getEpubName() + fileVo.getPath() + "/";
		
		MultipartFile mfFile = fileVo.getFile();
		mfFile.getOriginalFilename();
		User user = userRepository.findByEmail(fileVo.getEmail());
		
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
		
		List<Epub> epubList = user.getEpubList();
		
		String epubId = "";
		Epub epub = null;
		List<FileDTO> fileList = null;
		for(Iterator<Epub> iter = epubList.iterator(); iter.hasNext();) {
			Epub tempEpub = iter.next();
			if(tempEpub.getEpubName().equals(fileVo.getEpubName())) {
				epubId = new String(tempEpub.get_id());
				epub = tempEpub;
				fileList = tempEpub.getFileList();
				iter.remove();
				break;
			}
		}
		
		FileDTO fileDTO = new FileDTO();
		fileDTO.setPath(fileVo.getPath());
		fileDTO.setFileName(mfFile.getOriginalFilename());
		fileDTO.setEpubId(epubId);
		//파일 중복 처리
		for(Iterator<FileDTO> iter = fileList.iterator(); iter.hasNext();) {
			FileDTO tempFile = iter.next();
			if(tempFile.getFileName().equals(mfFile.getOriginalFilename())) {
				iter.remove();
			}
		}
		fileList.add(fileDTO);
		epub.setFileList(fileList);
		epubList.add(epub);
		user.setEpubList(epubList);
		
		fileRepository.save(fileDTO);
		epubRepository.save(epub);
		userRepository.save(user);
		
		return new ResponseEntity<>(true,HttpStatus.OK);
	}
	
	@GetMapping("/download")
	@ApiOperation(value = "download file")
	public ResponseEntity<Resource> download(@RequestParam String email, @RequestParam String epubName, @RequestParam String path, @RequestParam String fileName) throws IOException {
		Path localPath = Paths.get(storagePath + "/" + email + "/" + epubName + path + "/" + fileName);
		String contentType = Files.probeContentType(localPath);
		
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_TYPE, contentType);
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"");
		
		Resource resource = new InputStreamResource(Files.newInputStream(localPath));
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}
	
	@GetMapping("/epub/file/list")
	@ApiOperation(value = "해당 epub에 대한 fileList 반환", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<FileDTO>> getFileList(@RequestParam String id) {
		List<FileDTO> fileList = epubRepository.findBy_id(id).getFileList();
		
		return new ResponseEntity<>(fileList, HttpStatus.OK);
	}
}