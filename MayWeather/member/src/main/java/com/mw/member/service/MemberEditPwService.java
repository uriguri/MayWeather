package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.MemberPwEditRequest;
import com.mw.member.util.Sha256;

@Service
public class MemberEditPwService {
	
	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	@Autowired
	private Sha256 sha256;
	
	public String editPwMember(MemberPwEditRequest pwEditRequest, int memIdx) {
		
		dao = template.getMapper(MemberDao.class);
		
		String memEncryptPw = sha256.encrypt(pwEditRequest.getMemPw());
		
		dao.updateMemberPwByIdx(memEncryptPw, memIdx);
		
		return "changeSUCCESS";
		
	}
}
