package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberKakaoRequest;

@Service
public class KakaoRegService {

	private MemberDao dao;

	@Autowired
	private SqlSessionTemplate template;
	
	public int kakaoMemberReg(MemberKakaoRequest kakaoRequest) {

		int result = 0;

		dao = template.getMapper(MemberDao.class);

		Member member = kakaoRequest.kakaoRegRequest();

		result = dao.insertMem(member);

		return result;
	}
}
