package com.mw.member.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.scribejava.core.model.OAuth2AccessToken;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.NaverRegRequest;
import com.mw.member.util.NaverLoginUtil;
import com.mw.member.util.RedisService;

@Service
public class NaverRegService {

	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;
	
	@Autowired
	private NaverLoginUtil naverLoginUtil;
	
	@Autowired
	private RedisService redisService;
	
	public int naverMemberReg(HttpServletRequest request, HttpServletResponse response, 
			String code, String state, HttpSession session, String jSessionId) throws IOException {
		
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
		
		int idChk = dao.selectMemberByIdCount(naverId);
		
		System.out.println(idChk);
		
		
		Member member = naverRegRequest.regRequest(naverId, naverName, naverGender);
		
		//아이디체크가 1이상이면 이미 가입된 아이디이므로 로그인
		if(idChk > 0) {
			
			member = dao.selectKakaoLogin(naverId);
			
			//기존 세션 저장
			/* request.getSession().setAttribute("loginInfo", member.toKakaoLoginInfo()); */
			
			//레디스 세션 저장
			redisService.setMemInformation(member.toLoginInfo(), jSessionId, session);
			
		//아이디체크가 0이면 가입시킴	
		} else {
			
			result = dao.insertMem(member);
		}
		
		
		
		
		return result;
	}
}
