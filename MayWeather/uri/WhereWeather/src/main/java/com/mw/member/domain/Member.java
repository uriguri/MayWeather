package com.mw.member.domain;

import java.sql.Timestamp;
import java.util.Random;

import org.springframework.format.annotation.DateTimeFormat;

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
	
	@DateTimeFormat(pattern = "yyyy/MM/dd")
	private Timestamp memRegdate;
	
	private String memEmailcode;
	private int memEmailchk;
	private int memSocial;
	private int memState;
	
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
		this.memEmailcode = new String(sb);
	}
}
