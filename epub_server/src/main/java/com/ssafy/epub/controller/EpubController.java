package com.ssafy.epub.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

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
import com.ssafy.epub.service.EpubService;

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
	@Autowired
	private EpubService epubService;
	@Value("${spring.file.location}")
	private String storagePath;

	@GetMapping("/file")
	@ApiOperation(value = "getAllFiles", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<FileDTO>> getAllFiles(String id) {
		List<FileDTO> fileList = epubRepository.findBy_id(id).getFileList();

		return new ResponseEntity<>(fileList, HttpStatus.OK);
	}
	
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


	// , consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }
	@PostMapping(value = "/upload/zip")
	@ApiOperation(value = "upload file")
	public ResponseEntity<Boolean> uploadZip(FileVO fileVo) {
		// 압축 파일 저장 경로
		String unZipFilePath = storagePath + "/" + fileVo.getEmail() + "/" + fileVo.getEpubName() + "/";
		// + fileVo.getEpubName() + "/";
		MultipartFile mfFile = fileVo.getFile();
		String epubName = fileVo.getEpubName();

		// 압축 파일 경로
		File zipFile = new File(unZipFilePath + mfFile.getOriginalFilename());
		
		
		FileInputStream fis = null;
		ZipInputStream zis = null;
		ZipEntry zipentry = null;

		try {
			// zipFileName을 통해서 폴더 만들기
			if (zipFile.getParentFile().mkdirs()) {
				System.out.println("압축 폴더를 생성했습니다");
			}

			// 파일 스트림
			try {
				zipFile.createNewFile();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			
			try {
				// 업로드 임시파일 -> 물리파일 덮어쓰기
				mfFile.transferTo(zipFile);
			}
			catch(IOException ie) {
				// 덮어쓰기 중 오류
				ie.printStackTrace();
				return ResponseEntity.status(HttpStatus.CONFLICT).build();
			}
			//압축 풀기
			fis = new FileInputStream(zipFile);

			// Zip 파일 스트림
			zis = new ZipInputStream(fis, Charset.forName("EUC-KR"));

			// 압축되어 있는 ZIP 파일의 목록 조회
			while ((zipentry = zis.getNextEntry()) != null) {
				String fileName = zipentry.getName();
				System.out.println("filename(zipentry.getName()) => " + fileName);
				File file = new File(unZipFilePath, fileName);

				// entry가 폴더면 폴더 생성
				if (zipentry.isDirectory()) {
					System.out.println("zipentry가 디렉토리입니다.");
					file.mkdirs();
				} else {
					// 파일이면 파일 만들기
					System.out.println("zipentry가 파일입니다.");
					try {
						epubService.createFile(file, zis);
						//경로
						String path = file.getParent();
						//파일 이름 fileName
						path = path.split(fileVo.getEmail())[1];
						path = path.replace("\\", "/");
						if(path.length() == 0)
							path = "/";
						System.out.println(path);
						
						String [] fileNameArr = fileName.split("/");
						String tempFileName = fileNameArr[fileNameArr.length-1];
						
						epubService.fildDBFunc(fileVo.getEmail(),path,epubName,tempFileName);
					} catch (Throwable e) {
						e.printStackTrace();
					}
				}
			}
		} catch (Exception e) {
		} finally {
			if (zis != null) {
				try {
					zis.close();
				}catch (IOException e) {
					
				}
			}
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					
				}
			}
		}
		
		zipFile.delete();
		return new ResponseEntity<>(true, HttpStatus.OK);
	}

	@GetMapping("/download")
	@ApiOperation(value = "download file")
	public ResponseEntity<Resource> download(@RequestParam String email, @RequestParam String epubName) throws IOException {
		Path localPath = Paths.get(storagePath + "/" + email);
		
		File file = new File(storagePath + "/" + email + "/" + epubName + ".zip");
		
		
		
		try {
			System.out.println(localPath.toString());
			epubService.compress(localPath.toString() + "/" + epubName, localPath.toString() + "/", epubName);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String contentType = Files.probeContentType(localPath);
		
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_TYPE, contentType);
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + epubName + ".zip\"");
		
		Path zipPath = Paths.get(storagePath + "/" + email + "/" + epubName + ".zip");
		
		Resource resource = new InputStreamResource(Files.newInputStream(zipPath));
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}

	@GetMapping("/epub/file/list")
	@ApiOperation(value = "해당 epub에 대한 fileList 반환", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<FileDTO>> getFileList(@RequestParam String id) {
		List<FileDTO> fileList = epubRepository.findBy_id(id).getFileList();

		return new ResponseEntity<>(fileList, HttpStatus.OK);
	}
}