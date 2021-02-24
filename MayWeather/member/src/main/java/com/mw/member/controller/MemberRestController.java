package com.mw.member.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.mw.member.domain.KakaoLoginInfo;
import com.mw.member.domain.LoginInfo;
import com.mw.member.domain.MemberEditRequest;
import com.mw.member.domain.MemberKakaoRequest;
import com.mw.member.domain.MemberLoginRequest;
import com.mw.member.domain.MemberPhotoEditRequest;
import com.mw.member.domain.MemberRegRequest;
import com.mw.member.service.KakaoRegService;
import com.mw.member.service.MemberDeleteService;
import com.mw.member.service.MemberEditService;
import com.mw.member.service.MemberIdCheckService;
import com.mw.member.service.MemberIdFindService;
import com.mw.member.service.MemberKakaoLoginService;
import com.mw.member.service.MemberLoginService;
import com.mw.member.service.MemberPhotoEditService;
import com.mw.member.service.MemberPhotoSaveService;
import com.mw.member.service.MemberPhotoUploadService;
import com.mw.member.service.MemberPwFindService;
import com.mw.member.service.MemberRegService;
import com.mw.member.service.NaverRegService;
import com.mw.member.util.NaverLoginUtil;

@RestController
@CrossOrigin
@RequestMapping("/members")
public class MemberRestController {

	@Autowired
	private MemberRegService regService;

	@Autowired
	private KakaoRegService kakaoRegService;

	@Autowired
	private MemberLoginService loginService;

	@Autowired
	private MemberDeleteService deleteService;

	@Autowired
	private MemberEditService editService;

	@Autowired
	private MemberPhotoEditService photoEditService;

	@Autowired
	private MemberIdCheckService idCheckService;

	@Autowired
	private MemberPhotoUploadService photoUploadService;

	@Autowired
	private MemberPhotoSaveService photoSaveService;

	@Autowired
	private MemberKakaoLoginService kakaoLoginService;
	
	@Autowired
	private NaverLoginUtil naverLoginUtil;

	@Autowired 
	private NaverRegService naverRegService;
	
	@Autowired
	private MemberIdFindService idFindService;
	
	@Autowired
	private MemberPwFindService pwFindService;
	
	@PostMapping // 회원가입
	public String memberReg(@RequestBody MemberRegRequest regRequest) {
		return regService.memberReg(regRequest) > 0 ? "Y" : "N";
	}

	@GetMapping("/idcheck") // 중복 아이디 체크
	public String idCheck(@RequestParam("memId") String memId) {
		return idCheckService.chekId(memId);
	}

	@PostMapping("/kakao") // 카카오 로그인시 기본정보로 회원가입
	public String kakaoMemberReg(@RequestBody MemberKakaoRequest kakaoRequest) {
		return kakaoRegService.kakaoMemberReg(kakaoRequest) > 0 ? "Y" : "N";
	}

	@PostMapping("/kakaologin") // 카카오로그인 public
	public KakaoLoginInfo kakaoLogin(@RequestBody MemberKakaoRequest kakaoRequest, HttpServletRequest request,
			Model model) {

		model.addAttribute("loginCheck", kakaoLoginService.login(kakaoRequest, request));

		return kakaoLoginService.login(kakaoRequest, request);
	}

	@PostMapping("/login") // 로그인
	public LoginInfo login(@RequestBody MemberLoginRequest loginRequest, HttpServletRequest request, Model model) {

		model.addAttribute("loginCheck", loginService.login(loginRequest, request));

		return loginService.login(loginRequest, request);
	}

	@GetMapping("/logout") // 로그아웃
	public String logout(HttpSession session, RedirectAttributes rda) {

		session.invalidate();

		System.out.println("로그아웃!!!");

		rda.addAttribute("type", "delete");
		rda.addAttribute("result", "ok");

		return "logoutSUCCESS";
	}

	@PutMapping("/edit/{memIdx}") // 정보수정
	public int editMem(@RequestBody MemberEditRequest editRequest, @PathVariable("memIdx") int memIdx) {

		return editService.editMember(editRequest, memIdx);
	}

	@PutMapping("/edit/photo") // default 사진으로 수정
	public int photoUpload(@RequestBody MemberPhotoEditRequest photoEditRequest) {

		return photoEditService.editPhotoMember(photoEditRequest);
	}

	@PostMapping("/upload/photo/{memIdx}") // 사진 파일 업로드 & 유저 정보변경
	public String uploadFile(@PathVariable("memIdx") int memIdx, @RequestParam("uploadPhotoName") String memPhoto,
			@RequestParam("uploadPhoto") MultipartFile uploadPhoto, HttpServletRequest request) {

		photoSaveService.photoSave(uploadPhoto, memIdx, request);

		photoUploadService.uploadPhotoMember(memIdx, memPhoto);

		return "SUCCESS";
	}

	@DeleteMapping("/delete/{memIdx}") // 회원탈퇴
	public int deleteMem(@PathVariable("memIdx") int memIdx) {

		return deleteService.deleteMem(memIdx);
	}

	@GetMapping("/naver")
	public String getNaverAuthUrl(HttpSession session) {
		String reqUrl = naverLoginUtil.getAutorizationUrl(session);
		return reqUrl;
	}

	@GetMapping("/naver/oauthNaver")
	public ModelAndView oauthNaver(HttpServletRequest request, HttpServletResponse response, 
							@RequestParam String code, @RequestParam String state, HttpSession session, Model model) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("redirect:http://localhost:8080/");
		naverRegService.naverMemberReg(request, response, code, state, session);
		
		return mav;
	
	}
	
	@GetMapping("/idfind")
	public String findMemId(@RequestParam("memName") String memName) {
		
		return idFindService.findIdByName(memName);
	}
	
	@PostMapping("/pwfind")
	public int findMemPw(@RequestParam("memId") String memId) {
		
		return pwFindService.rePwSend(memId);
	}
}

