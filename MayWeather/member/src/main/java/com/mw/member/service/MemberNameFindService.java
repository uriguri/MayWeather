package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;

@Service
public class MemberNameFindService {
	
	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public String getMemName(int memIdx) {
		
		dao = template.getMapper(MemberDao.class);
		
		
		return dao.getMemNameByIdx(memIdx);
	}

}
