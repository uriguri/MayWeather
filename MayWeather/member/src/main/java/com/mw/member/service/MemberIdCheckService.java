package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;

@Service
public class MemberIdCheckService {
	
	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;

	public String chekId(String memId) {

		dao = template.getMapper(MemberDao.class);
		
		return dao.selectMemberByIdCount(memId)>0 ? "N" : "Y" ;
		
	}
	
	
}