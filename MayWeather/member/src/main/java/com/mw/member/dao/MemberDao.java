package com.mw.member.dao;

import com.mw.member.domain.LoginInfo;
import com.mw.member.domain.Member;

public interface MemberDao {

	//멤버가입
	int insertMem(Member member);
	
	//멤버 로그인
	Member selectLogin(String memId, String memPw);

	//멤버 메일 인증
	int selectMemberByIdxEmailchk(int memIdx);

	//멤버 메일 인증 후 인증상태 변경
	int updateMemberEmailchk(int memIdx, String memEmailCode);
	
}
