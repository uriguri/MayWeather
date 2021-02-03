package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;

@Service
public class MemberEmailChkService {
	
	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public int memberEmailChk(int memIdx, String memEmailCode) {
		
		dao = template.getMapper(MemberDao.class);
		
		int result = 0; // 0 : 에러 / 1 : 인증 완료 / 2 : 이미 인증 /
		
		int isEmailChk = dao.selectMemberByIdxEmailchk(memIdx);
		
		if(isEmailChk == 1) {
			result = 2;
		} else {
			result = dao.updateMemberEmailchk(memIdx, memEmailCode);
		}
		return result;
	}
}
