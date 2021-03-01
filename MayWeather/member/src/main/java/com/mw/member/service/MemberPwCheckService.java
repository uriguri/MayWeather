package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.MemberPwEditRequest;
import com.mw.member.util.Sha256;

@Service
public class MemberPwCheckService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	@Autowired
	private Sha256 sha256;
	
	public int checkPw(MemberPwEditRequest pwEditRequest, int memIdx) {
		
		int result = 0;
		
		dao = template.getMapper(MemberDao.class);
		
		String memEncryptPw = sha256.encrypt(pwEditRequest.getMemPw());
		
		//1일경우 해당하는 idx의 비밀번호가 일치 , 0일경우 미일치
		result = dao.selectPwBymemIdx(memEncryptPw, memIdx);
		
		return result;
		
	}
}
