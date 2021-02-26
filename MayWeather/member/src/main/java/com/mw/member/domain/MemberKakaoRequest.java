package com.mw.member.domain;

import lombok.Data;

@Data
public class MemberKakaoRequest {
	
	private String memId;
	private String memName;
	private String memGender;
	private String memPhoto;
	private char memEmailchk;
	private int memSocial;

	public Member kakaoRegRequest() {
		Member member = new Member();
		member.setMemId(memId);
		member.setMemName(memName);
		member.setMemGender(memGender);
		member.setMemPhoto("kakao.png");
		
		// memSocial로 카카오 가입자구분
		member.setMemSocial(1);
		
		// 카카오에서 인증후 로그인 하기때문에 메일체크 X
		member.setMemEmailchk('Y');
		
		return member;
	}
	
	

}
