package com.mw.member.domain;

import lombok.Data;

@Data
public class MemberRegRequest {

	private String memId;
	private String memPw;
	private String memName;
	private String memGender;
	private String memPhoto;
	private int memSocial;
	private int memAge;
	
	public Member memberRegRequest() {
		Member member = new Member();
		member.setMemId(memId);
		member.setMemPw(memPw);
		member.setMemName(memName);
		member.setMemGender(memGender);
		member.setMemAge(memAge);
		
		member.setMemPhoto("default.png");
		
		//소셜 0 = 일반가입자
		member.setMemSocial(0);
		
		return member;
	}
}
