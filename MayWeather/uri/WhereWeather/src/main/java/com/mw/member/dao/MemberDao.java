package com.mw.member.dao;

import java.util.List;
import java.util.Map;

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
	
	// 검색한 회원의 수
	int selectSearchMemberCount(Map<String, Object> listMap);
	
	// 회원 리스트
	List<Member> selectMemberList(Map<String, Object> param);
	
	// Rest API : GET
	List<Member> selectAllMemberList();
	
	// 회원 탈퇴 Idx로 조회
	int deleteMemberByIdx (int memIdx);
	
	// 회원 정보 수정
	int updateMember(Member member);
	
	// 회원 정보 조회 : memIdx로 조회
	Member selectMemberByIdx(int idx);
	
}
