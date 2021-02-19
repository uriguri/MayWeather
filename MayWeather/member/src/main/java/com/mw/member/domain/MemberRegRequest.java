package com.mw.member.domain;

import lombok.Data;

@Data
public class MemberRegRequest {

	private String memId;
	private String memPw;
	private String memName;
	private String memGender;
	private String memPhoto;
	
	public Member memberRegRequest() {
		Member member = new Member();
		member.setMemId(memId);
		member.setMemPw(memPw);
		member.setMemName(memName);
		member.setMemGender(memGender);
		member.setMemPhoto("default.png");
		
		return member;
	}
}
