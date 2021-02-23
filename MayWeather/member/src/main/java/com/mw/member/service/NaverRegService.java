package com.mw.member.service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.scribejava.core.model.OAuth2AccessToken;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.NaverRegRequest;
import com.mw.member.util.NaverLoginUtil;

@Service
public class NaverRegService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	@Autowired
	private NaverLoginUtil naverLoginUtil;
	
	public int naverMemberReg(HttpServletRequest request, HttpServletResponse response, 
			String code, String state, HttpSession session) throws IOException {
		
		int result = 0;
		
		/* PrintWriter writer = response.getWriter(); */
		
		OAuth2AccessToken oauthToken;
		oauthToken = naverLoginUtil.getAccessToken(session, code, state);
		
		System.out.println(oauthToken);
		
		String naverLoginInfo = naverLoginUtil.getUserProfile(oauthToken);
		
		System.out.println(naverLoginInfo);
		
		JsonParser parser = null;
		
		JsonElement element = parser.parseString(naverLoginInfo);
		
		JsonObject obj = element.getAsJsonObject().get("response").getAsJsonObject();
		
		String naverId = obj.getAsJsonObject().get("email").getAsString();
		String naverName = obj.getAsJsonObject().get("nickname").getAsString();
		String naverGender = obj.getAsJsonObject().get("gender").getAsString();
		
		dao = template.getMapper(MemberDao.class);
		
		System.out.println(naverId);
		System.out.println(naverName);
		System.out.println(naverGender);
		NaverRegRequest naverRegRequest = new NaverRegRequest();
		
		
		Member member = naverRegRequest.regRequest(naverId, naverName, naverGender);
		
		result = dao.insertMem(member);
		
		return result;
	}
}
