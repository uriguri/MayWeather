package com.mw.member.domain;

import lombok.Data;

@Data
public class MemberEditRequest {

	private int memIdx;
	private String memPw;
	private String memName;

	
	
	
	public Member getToMember() {
		Member member = new Member();
		member.setMemIdx(memIdx);
		member.setMemPw(memPw);
		member.setMemName(memName);
		
		return member;
	}
}
