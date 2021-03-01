package com.mw.member.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;

@Service
public class AdminService {
	
	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	
	public List<Member> getAllMember(){
		
		dao = template.getMapper(MemberDao.class);
	
		return dao.selectAllMemberList();
		
	}

}
