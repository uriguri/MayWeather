package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.MemberNameEditRequest;

@Service
public class MemberEditNameService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public String editNameMember(MemberNameEditRequest nameEditRequest, int memIdx) {
		
		dao = template.getMapper(MemberDao.class);
		
		dao.updateMemberName(nameEditRequest.getMemName(), memIdx);
		
		return nameEditRequest.getMemName();
		
	}
}
