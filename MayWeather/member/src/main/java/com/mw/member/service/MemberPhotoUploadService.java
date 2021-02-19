package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;

@Service
public class MemberPhotoUploadService {
	
	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public String uploadPhotoMember(int memIdx, String memPhoto) {
		
		Member member = new Member();
		
		Member newMember = member.idxGetToMember(memIdx, memPhoto);
		
		dao = template.getMapper(MemberDao.class);
		
	
		return dao.updatePhoto(newMember)>0? "Y":"N"; 
	}

}
