package com.mw.member.domain;

import lombok.Data;

@Data
public class Kakao {
	
	private String memId;
	private String memName;
	private String memGender;
	
	public Member toKakaoMember() {
		Member member = new Member();
		member.setMemId(memId);
		member.setMemPw("kakao");
		member.setMemName("memName");
		member.setMemGender("memGender");
		
		return member;
	}
}
