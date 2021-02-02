package com.mw.member.domain;

import java.sql.Timestamp;
import java.util.Random;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;


@Data
public class Member {

	private int memberIdx;
	private String memberId;
	private String memberPw;
	private String memberName;
	private String memberPhoto;
	private String memberLoc;
	private String memberLev;
	private String memberLike;
	private String memberBookmark;
	private String memberGender;
	private String memberEmailcode;
	private int memberEmailchk;
	private int memberSocial;
	private int memberState;
	
	@DateTimeFormat(pattern = "yyyy/MM/dd")
	private Timestamp memberRegdate;
	
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
		this.memberEmailcode = new String(sb);
	}
}
