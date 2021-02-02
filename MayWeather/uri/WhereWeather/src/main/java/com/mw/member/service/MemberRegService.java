package com.mw.member.service;

import javax.servlet.http.HttpServletRequest;

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
	
	public int memberReg(MemberRegRequest regRequest, 
						 HttpServletRequest request) {
		
		int result = 0;
		Member member = regRequest.toMember();
		
		dao = template.getMapper(MemberDao.class);
		
		result = dao.insertMember(member);
		
		
		return result;
	}
}
