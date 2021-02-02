package com.mw.member.domain;

import lombok.Data;

@Data
public class MemberRegRequest {

	private String memId;
	private String memPw;
	private String memName;
	private String memGender;
	
	public Member toMember() {
		Member member = new Member();
		member.setMemberId(memId);
		member.setMemberPw(memPw);
		member.setMemberName(memName);
		member.setMemberGender(memGender);
		
		return member;
	}
}
