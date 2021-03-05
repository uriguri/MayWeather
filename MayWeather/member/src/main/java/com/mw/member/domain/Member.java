package com.mw.member.domain;

import java.sql.Timestamp;
import java.util.Random;

import lombok.Data;

@Data
public class Member {

	private int memIdx;
	private String memId;
	private String memPw;
	private String memName;
	private String memPhoto;
	private String memLoc;
	private String memLev;
	private String memLike;
	private int memAge;
	private String memGender;
	private String memEmailCode;
	private char memEmailchk;
	private int memSocial;
	private int memState;
	private Timestamp memRegdate;
	
	//redis 사용을 위해 추가
	private String jsessionId;
	
	
	public Member() {
		getRandomString();
	}
	
	//이메일 코드 난수생성
	private void getRandomString() {
		Random r  = new Random(System.nanoTime());
		
		StringBuffer sb = new StringBuffer();
		
		for(int i=0; i<8; i++) {
			if(r.nextBoolean()) {
				sb.append(r.nextInt(10));
			} else {
				sb.append((char)(r.nextInt(26)+97));
			}
		}
		this.memEmailCode = new String(sb);
	}
	
	
	public LoginInfo toLoginInfo() {
		return new LoginInfo(String.valueOf(memIdx), memId, memName, memGender, memPhoto, memLoc, String.valueOf(memEmailchk), String.valueOf(memSocial), jsessionId, String.valueOf(memAge));
	}
	
	
	
	public Member idxGetToMember(int memIdx, String memPhoto) {
		Member member = new Member();
		member.setMemIdx(memIdx);
		member.setMemPhoto(memPhoto);
		
		return member;
	}
		
	
}
