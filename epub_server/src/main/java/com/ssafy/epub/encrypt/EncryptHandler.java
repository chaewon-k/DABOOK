package com.ssafy.epub.encrypt;

public interface EncryptHandler {
	
	String encrypt(String password);
	boolean isMatch(String password, String hashed);
}
