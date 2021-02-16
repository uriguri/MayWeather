package com.mw.member.service;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberEditRequest;

@Service
public class MemberEditService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public int editMember(MemberEditRequest editRequest, int memIdx) {
		
		int result = 0;
	
		
		Map<String, Object> editMap = new HashMap<String, Object>();
		editMap.put("memName", editRequest.getMemName());
		editMap.put("memPw", editRequest.getMemPw());
		editMap.put("memIdx", memIdx);
		
		
		// 수정한 데이터를 가지는 Member
		Member member = editRequest.getToMember();
	
		// DB 업데이트
		dao = template.getMapper(MemberDao.class);
		
		result = dao.updateMember(editMap);
		
		return result;
	}
}
