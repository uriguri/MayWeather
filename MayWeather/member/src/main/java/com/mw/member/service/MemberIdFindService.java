package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;

@Service
public class MemberIdFindService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public String findIdByName(String memName) {
		
		dao = template.getMapper(MemberDao.class);
		
		
		return dao.selectMemberByName(memName);
	}
}
