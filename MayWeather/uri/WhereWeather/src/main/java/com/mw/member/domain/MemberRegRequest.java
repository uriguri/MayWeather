package com.mw.member.domain;

import lombok.Data;

@Data
public class MemberRegRequest {

	private String memberId;
	private String memberPw;
	private String memberName;
	private String memberGender;
	
	public Member toMember() {
		Member member = new Member();
		member.setMemId(memberId);
		member.setMemPw(memberPw);
		member.setMemName(memberName);
		member.setMemGender(memberGender);
		
		return member;
	}
}
