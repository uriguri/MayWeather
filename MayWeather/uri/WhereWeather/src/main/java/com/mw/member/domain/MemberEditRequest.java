package com.mw.member.domain;

import lombok.Data;

@Data
public class MemberEditRequest {

	private int memIdx;
	private String memId;
	private String memPw;
	private String memName;
	private String memGender;
	
	
	
	public Member getToMember() {
		Member member = new Member();
		member.setMemIdx(memIdx);
		member.setMemPw(memPw);
		member.setMemName(memName);
		member.setMemGender(memGender);
		
		return member;
	}
}
