package com.mw.member.dao;

import com.mw.member.domain.Member;

public interface MemberDao {

	//멤버가입
	int insertMem(Member member);
	
	//멤버 로그인
	Member selectLogin(String memId, String memPw);
	
}
