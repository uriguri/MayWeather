package com.mw.member.dao;

import java.util.Map;

import com.mw.member.domain.Member;


public interface MemberDao {

	//멤버가입
	int insertMem(Member member);
	
	//멤버 로그인
	Member selectLogin(String memId, String memPw);

	//카카오 멤버 로그인 (비밀번호 찾기 겸용사용 = 아이디로 멤버객체 반환)
	Member selectKakaoLogin (String memId);
	
	//멤버 메일 인증
	int selectMemberByIdxEmailchk(int memIdx);

	//멤버 메일 인증 후 인증상태 변경
	int updateMemberEmailchk(int memIdx, String memEmailCode);
	
	//멤버 탈퇴
	int deleteMemberByIdx(int memIdx);

	//멤버 정보 업데이트
	//int updateMember(Member member, int memIdx);
	
	//멤버 정보 업데이트
	Member updateMember(Map<String, Object> editMap);

	//멤버 사진 업로드
	int updatePhoto(Member member);
	
	//아이디 존재 유무확인(유효성검사)
	int selectMemberByIdCount(String memId);

	//이름으로 검색하여 아이디 반환
	String selectMemberByName(String memName);
	
	//멤버 패스워드 수정 (비밀번호찾기 임시 패스워드변경)
	int updateMemberPw(String newPw, String memId);
}
