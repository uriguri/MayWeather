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
	private String memBookmark;
	private String memGender;
	private String memEmailCode;
	private String memEmailchk;
	private int memSocial;
	private int memState;
	private Timestamp memRegdate;
	
	public Member() {
		getRandomString();
	}
	
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
		return new LoginInfo(memIdx, memId, memName, memGender, memPhoto, memLoc, memEmailchk);
	}
	
	public KakaoLoginInfo toKakaoLoginInfo() {
		return new KakaoLoginInfo(memIdx, memId, memName, memGender, memPhoto, memSocial);
	}
	
	public Member idxGetToMember(int memIdx, String memPhoto) {
		Member member = new Member();
		member.setMemIdx(memIdx);
		member.setMemPhoto(memPhoto);
		
		return member;
	}
		
	
}
