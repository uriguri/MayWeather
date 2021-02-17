package com.mw.member.dao;

import java.util.Map;

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
	
	//멤버 탈퇴
	int deleteMemberByIdx(int memIdx);

	//멤버 정보 업데이트
	//int updateMember(Member member, int memIdx);
	
	//멤버 정보 업데이트
	int updateMember(Map<String, Object> editMap);

	//멤버 사진 업로드
	int updatePhoto(Member member);
	
}
