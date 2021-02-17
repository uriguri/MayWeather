package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberPhotoEditRequest;

@Service
public class MemberPhotoEditService {
	
	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;

	public int editPhotoMember(MemberPhotoEditRequest photoEditRequest) {
		
		int result = 0;
		
		Member member = photoEditRequest.getToMember();
		
		dao = template.getMapper(MemberDao.class);
		
		result = dao.updatePhoto(member);
		
		return result;
	} 
	
}
