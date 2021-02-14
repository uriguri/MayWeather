package com.mw.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mw.member.domain.SearchParam;
import com.mw.member.service.MemberListService;

@Controller
public class MemberListController {

	@Autowired
	private MemberListService listService;
	
	@RequestMapping("/members")
	public String memberList(
			SearchParam param,
			Model model
			) {
		
		System.out.println(param);
		
		model.addAttribute("listView", listService.getListview(param));
		
		return "/member/list";
	}
}
