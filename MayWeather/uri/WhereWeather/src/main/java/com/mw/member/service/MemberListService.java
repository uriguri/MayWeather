package com.mw.member.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberListView;
import com.mw.member.domain.SearchParam;

@Service
public class MemberListService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	public MemberListView getListview(SearchParam param) {
		
		MemberListView listView = null;
		
		dao = template.getMapper(MemberDao.class);
		
		// 한 페이지에 보여줄 회원갯수
		int cntPerPage = 5;
		
		int startRow = (param.getP() - 1) * cntPerPage;
		int endRow = startRow + cntPerPage -1;
		
		Map<String, Object> listMap = new HashMap<String, Object>();
		listMap.put("index", startRow);
		listMap.put("count", cntPerPage);
		listMap.put("searchParam", param);
		
		int totalMemberCount = dao.selectSearchMemberCount(listMap);
		
		List<Member> memberList = dao.selectMemberList(listMap);
		
		listView = new MemberListView(param.getP(), totalMemberCount, cntPerPage, memberList, startRow, endRow);
		
		return listView;
	}
	
	public List<Member> getListView(){
		
		List<Member> list = null;
		
		dao = template.getMapper(MemberDao.class);
		
		list = dao.selectAllMemberList();
		
		return list;
	}
}
