package com.mw.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mw.member.domain.MemberRegRequest;
import com.mw.member.service.MemberRegService;

@RestController
@RequestMapping("/member")
public class MemberRegController {
	
	@Autowired
	private MemberRegService regService;
	
	@GetMapping
	public ModelAndView getRegForm(ModelAndView mv) {
		mv.setViewName("/member/memberRegForm");
		return mv;
	}
	
	@CrossOrigin
	@PostMapping
	public String insertMember(@RequestBody MemberRegRequest regRequest) {
		
		System.out.println(regRequest);
		System.out.println(regRequest.toMember());
		
		
		return regService.memberReg(regRequest.toMember())>0 ? "Y" : "N";
	}

}
