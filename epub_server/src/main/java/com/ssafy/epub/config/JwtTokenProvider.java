package com.ssafy.epub.config;

import java.util.Date;

import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenProvider {
	// JWT token secret key(비밀키)
	@Value("${security.jwt.token.secret-key}")
	private String secretKey;
	// JWT token 만료 기간 설정.
	@Value("${security.jwt.token.expire-length}")
	private long validityInMilliseconds;

	// token 생성.
	public String createToken(String subject) {
		// JWT payload에 저장되는 정보 단위.
		Claims claims = Jwts.claims().setSubject(subject);

		Date now = new Date();
		Date validity = new Date(now.getTime() + validityInMilliseconds);

		/*
		 * setClaims : 정보 저장.
		 * setIssuedAt : 토큰 발행 시간 정보
		 * setExpriation : 토큰 만료기간 설정
		 * singWith : 사용할 암호화 알고리즘과 서명에 들어갈 키 설정.
		 */
		return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(validity)
				.signWith(SignatureAlgorithm.HS256, secretKey).compact();
	}
	// token 유효성 검사
	public boolean validateToken(String token) {
		try {
			Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
					.parseClaimsJws(token).getBody();

			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public String getSubject(String token) {
		Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
				.parseClaimsJws(token).getBody();
		
		return claims.getSubject();
	}
}