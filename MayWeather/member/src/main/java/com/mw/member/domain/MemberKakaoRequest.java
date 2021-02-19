package com.mw.member.domain;

import lombok.Data;

@Data
public class MemberKakaoRequest {
	
	private String memId;
	private String memName;
	private String memGender;

	public Member kakaoRegRequest() {
		Member member = new Member();
		member.setMemId(memId);
		member.setMemName(memName);
		member.setMemGender(memGender);
		
		return member;
	}
	
	
	
	public KakaoLoginInfo toKaKaoLoginInfo() {
		return new KakaoLoginInfo(99, memId, memName, memGender, "kakao.png", 1);
	}
}
