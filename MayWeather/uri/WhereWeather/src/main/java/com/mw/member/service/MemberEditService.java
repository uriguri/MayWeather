package com.mw.member.service;

import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberEditRequest;

@Service
public class MemberEditService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public Member getMember(int memIdx) {
		dao = template.getMapper(MemberDao.class);
		return dao.selectMemberByIdx(memIdx);
	}
	
	public int editMember(MemberEditRequest editRequest) {
		
		int result = 0;
		
		// 수정한 데이터를 가지는 Member
		Member member = editRequest.getToMember();
		
		// DB 업데이트
		dao = template.getMapper(MemberDao.class);
		
		result = dao.updateMember(member);
		
		return result;
	}
}
