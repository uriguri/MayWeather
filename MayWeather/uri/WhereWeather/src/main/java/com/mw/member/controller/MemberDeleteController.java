package com.mw.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mw.member.service.MemberDeleteService;

@Controller
public class MemberDeleteController {

	@Autowired
	private MemberDeleteService deleteService;
	
	@RequestMapping("/member/delete")
	public String deleteMember(@RequestParam("memIdx") int memIdx, Model model) {
		model.addAttribute("result", deleteService.deleteMember(memIdx));
		
		return "member/delete";
	}
}
