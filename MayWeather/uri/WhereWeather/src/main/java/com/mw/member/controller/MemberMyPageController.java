package com.mw.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member/mypage")
public class MemberMyPageController {
	
	@GetMapping
	public String myPage() {
		return "member/myPage";
	}
	
}
