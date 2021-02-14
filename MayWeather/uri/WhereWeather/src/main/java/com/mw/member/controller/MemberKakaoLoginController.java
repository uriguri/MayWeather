package com.mw.member.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mw.member.domain.Kakao;


@Controller
@RequestMapping("/member/kakaoLogin")
public class MemberKakaoLoginController {
	
	@GetMapping
	public String kakaoLogin(HttpServletRequest request,
			Kakao kakao) {
		return "/member/regForm";
	}
}

