package com.mw.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;

@Service
public class MemberFileUploadService {

	private MemberDao dao;
	
	@Autowired
	SqlSessionTemplate template;
	
	
	
}
