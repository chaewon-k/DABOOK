package com.ssafy.epub.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.epub.model.Epub;
import com.ssafy.epub.model.FileDTO;
import com.ssafy.epub.model.User;
import com.ssafy.epub.repository.EpubRepository;
import com.ssafy.epub.repository.FileRepository;
import com.ssafy.epub.repository.UserRepository;

@Service
public class EpubService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private EpubRepository epubRepository;
	@Autowired
	private FileRepository fileRepository;
	
	public void createFile(File file, ZipInputStream zis) throws Throwable {

		// 디렉토리 확인
		File parentDir = new File(file.getParent());
		// 디렉토리가 없으면 생성하자
		if (!parentDir.exists()) {
			parentDir.mkdirs();
		}
		FileOutputStream fos = null;
		// 파일 스트림 선언
		try {

			fos = new FileOutputStream(file);
			byte[] buffer = new byte[256];
			int size = 0;
			// Zip스트림으로부터 byte뽑아내기
			while ((size = zis.read(buffer)) > 0) {
				// byte로 파일 만들기
				fos.write(buffer, 0, size);
			}
		} catch (Throwable e) {
			throw e;
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
				}

			}

		}

	}
	
	public void fildDBFunc(String email, String path, String epubName, String fileName) {
		User user = userRepository.findByEmail(email);
		
		List<Epub> epubList = user.getEpubList();
		
		String epubId = "";
		Epub epub = null;
		List<FileDTO> fileList = null;
		for (Iterator<Epub> iter = epubList.iterator(); iter.hasNext();) {
			Epub tempEpub = iter.next();
			if (tempEpub.getEpubName().equals(epubName)) {
				epubId = new String(tempEpub.get_id());
				epub = tempEpub;
				fileList = tempEpub.getFileList();
				iter.remove();
				break;
			}
		}

		FileDTO fileDTO = new FileDTO();
		fileDTO.setPath(path);
		fileDTO.setFileName(fileName);
		fileDTO.setEpubId(epubId);
		// 파일 중복 처리
		for (Iterator<FileDTO> iter = fileList.iterator(); iter.hasNext();) {
			FileDTO tempFile = iter.next();
			if (tempFile.getFileName().equals(fileName)) {
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
	}
	
	public boolean compress(String path, String outputPath, String outputFileName) throws Throwable {
		// 파일 압축 성공 여부 
		boolean isChk = false;
		
		File file = new File(path);
		
		// 파일의 .zip이 없는 경우, .zip 을 붙여준다. 
		int pos = outputFileName.lastIndexOf(".") == -1 ? outputFileName.length() : outputFileName.lastIndexOf(".");
		
		// outputFileName .zip이 없는 경우 
		if (!outputFileName.substring(pos).equalsIgnoreCase(".zip")) {
			outputFileName += ".zip";
		}
		
		// 압축 경로 체크
		if (!file.exists()) {
			throw new Exception("Not File!");
		}
		
		// 출력 스트림
		FileOutputStream fos = null;
		// 압축 스트림
		ZipOutputStream zos = null;
		
		try {
			fos = new FileOutputStream(new File(outputPath + outputFileName));
			zos = new ZipOutputStream(fos);
			
			// 디렉토리 검색를 통한 하위 파일과 폴더 검색 
			searchDirectory(file, file.getPath(), zos);
			
			// 압축 성공.
			isChk = true;
		} catch (Throwable e) {
			throw e;
		} finally {
			if (zos != null)
				zos.close();
			if (fos != null)
				fos.close();
		}
		return isChk;
	}
	
	public void searchDirectory(File file, String root, ZipOutputStream zos) throws Exception {
		// 지정된 파일이 디렉토리인지 파일인지 검색
		if (file.isDirectory()) {
			// 디렉토리일 경우 재탐색(재귀)
			File[] files = file.listFiles();
			for (File f : files) {
				System.out.println("file = > " + f);
				searchDirectory(f, root, zos);
			}
		} else {
			// 파일일 경우 압축을 한다.
			try {
				compressZip(file, root, zos);
			} catch (Throwable e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	private void compressZip(File file, String root, ZipOutputStream zos) throws Throwable {
		FileInputStream fis = null;
		try {
			String zipName = file.getPath().replace(root + "\\", "");
			// 파일을 읽어드림
			fis = new FileInputStream(file);
			// Zip엔트리 생성(한글 깨짐 버그)
			ZipEntry zipentry = new ZipEntry(zipName);
			// 스트림에 밀어넣기(자동 오픈)
			zos.putNextEntry(zipentry);
			int length = (int) file.length();
			byte[] buffer = new byte[length];
			// 스트림 읽어드리기
			fis.read(buffer, 0, length);
			// 스트림 작성
			zos.write(buffer, 0, length);
			// 스트림 닫기
			zos.closeEntry();

		} catch (Throwable e) {
			throw e;
		} finally {
			if (fis != null)
				fis.close();
		}
	}
}
