package com.mw.member.dao;

import com.mw.member.domain.Member;

public interface MemberDao {

	// 회원 가입
	int insertMember(Member member);
	
	// idx, memEmailchk 조건으로 조회
	int selectMemberByIdxEmailchk(int memIdx);
	
	// memEmailchk = 'Y'
	int updateMemberEmailchk(int memIdx, String memEmailCode);
	
	// 로그인
	Member selectLogin(String memId, String memPw);
}
