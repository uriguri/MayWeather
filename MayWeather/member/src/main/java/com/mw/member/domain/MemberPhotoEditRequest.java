package com.mw.member.domain;

import lombok.Data;

@Data
public class MemberPhotoEditRequest {
	
	private int memIdx;
	private String memPhoto;


	public Member getToMember() {
		Member member = new Member();
		member.setMemIdx(memIdx);
		member.setMemPhoto(memPhoto);
		
		return member;
	}
}
