package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberRegRequest;

@Service
public class MemberRegService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public int memberReg(MemberRegRequest regRequest) {
		
		int result = 0;
		
		dao = template.getMapper(MemberDao.class);
		
		Member member = regRequest.memberRegRequest();
		
		result = dao.insertMem(member);
		
		return result;
	}
}
