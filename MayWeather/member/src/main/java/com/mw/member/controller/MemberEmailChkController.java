package com.mw.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mw.member.service.MemberEmailChkService;

@Controller
public class MemberEmailChkController {
	
	@Autowired
	private MemberEmailChkService emailChkService;
	
	@GetMapping("/members/emailChk")
	public void memberEmailChk(
			@RequestParam("memIdx") int memIdx,
			@RequestParam("memEmailCode") String memEmailCode,
			Model model
			) {
		
		model.addAttribute("result", emailChkService.memberEmailChk(memIdx, memEmailCode));
		
	}
}
