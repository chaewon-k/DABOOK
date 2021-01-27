package com.ssafy.epub.encrypt;

import org.mindrot.jbcrypt.BCrypt;


public class BcryptImpl implements EncryptHandler{

	// 사용자의 비밀번호를 암호화한다.
	@Override
	public String encrypt(String password) {
		
		return BCrypt.hashpw(password, BCrypt.gensalt());
	}
	// 사용자가 입력한 비밀번호와 암호화된 비밀번호를 매칭하여 검사한다.
	@Override
	public boolean isMatch(String password, String hashed) {
		
		return BCrypt.checkpw(password, hashed);
	}

}
