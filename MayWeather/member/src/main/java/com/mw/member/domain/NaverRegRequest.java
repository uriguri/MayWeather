package com.mw.member.domain;

import lombok.Data;

@Data
public class NaverRegRequest {

	private String memId;
	private String memName;
	private String memGender;
	private String memPhoto;
	private int memSocial;

	public Member regRequest(String memId, String memName, String memGender) {
		Member member = new Member();
		member.setMemId(memId);
		member.setMemName(memName);
		member.setMemGender(memGender);
		member.setMemPhoto("naver.png");
		
		// memSocial로 카카오 가입자구분
		member.setMemSocial(2);
		
		return member;
	}
	
	
}
