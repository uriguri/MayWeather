package com.mw.member.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

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

import com.mw.member.domain.LoginInfo;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberKakaoRequest;
import com.mw.member.domain.MemberLoginRequest;
import com.mw.member.domain.MemberNameEditRequest;
import com.mw.member.domain.MemberPhotoEditRequest;
import com.mw.member.domain.MemberPwEditRequest;
import com.mw.member.domain.MemberRegRequest;
import com.mw.member.service.AdminService;
import com.mw.member.service.KakaoRegService;
import com.mw.member.service.MemberDeleteService;
import com.mw.member.service.MemberEditNameService;
import com.mw.member.service.MemberEditPwService;
import com.mw.member.service.MemberEditService;
import com.mw.member.service.MemberIdCheckService;
import com.mw.member.service.MemberIdFindService;
import com.mw.member.service.MemberKakaoLoginService;
import com.mw.member.service.MemberLoginService;
import com.mw.member.service.MemberNameFindService;
import com.mw.member.service.MemberPhotoEditService;
import com.mw.member.service.MemberPhotoSaveService;
import com.mw.member.service.MemberPhotoUploadService;
import com.mw.member.service.MemberPwCheckService;
import com.mw.member.service.MemberPwFindService;
import com.mw.member.service.MemberRegService;
import com.mw.member.service.NaverRegService;
import com.mw.member.util.NaverLoginUtil;
import com.mw.member.util.RedisService;

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
	private MemberPwCheckService pwCheckService;

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
	
	@Autowired
	private RedisService redisService;
	
	@Autowired
	private MemberEditNameService editNameService;
	
	@Autowired
	private MemberEditPwService editPwService;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private MemberNameFindService nameFindService;
	
	
	
	@PostMapping // 회원가입
	public String memberReg(@RequestBody MemberRegRequest regRequest) {
		return regService.memberReg(regRequest) > 0 ? "Y" : "N";
	}

	@GetMapping("/idcheck") // 중복 아이디 체크
	public String idCheck(@RequestParam("memId") String memId) {
		return idCheckService.chekId(memId);
	}
	
	@PostMapping("/pwcheck/{memIdx}") // 동일한 비밀번호 체크
	public int pwCheck(@RequestBody MemberPwEditRequest pwEditRequest,
						  @PathVariable("memIdx") int memIdx
						) {
		
		return pwCheckService.checkPw(pwEditRequest, memIdx);
		
	}

	@PostMapping("/kakao") // 카카오 로그인시 기본정보로 회원가입
	public String kakaoMemberReg(@RequestBody MemberKakaoRequest kakaoRequest) {
		return kakaoRegService.kakaoMemberReg(kakaoRequest) > 0 ? "Y" : "N";
	}

	@PostMapping("/kakaologin/{originJsessionId}") // 카카오로그인 public
	public LoginInfo kakaoLogin(@RequestBody MemberKakaoRequest kakaoRequest,
								@PathVariable("originJsessionId") String jSessionId,
								HttpServletRequest request,
								Model model, 
								HttpSession session) {

		model.addAttribute("loginCheck", kakaoLoginService.login(kakaoRequest, request, jSessionId, session));

		return kakaoLoginService.login(kakaoRequest, request, jSessionId, session);
	}

	@PostMapping("/login/{originJsessionId}") // 로그인
	public LoginInfo login(@RequestBody MemberLoginRequest loginRequest, HttpSession session, 
							@PathVariable("originJsessionId") String jSessionId) {

		

		return loginService.login(loginRequest, jSessionId, session);
	}

	@GetMapping("/logout") // 로그아웃
	public void logout(HttpSession session) {

		session.invalidate();

		System.out.println(session.getId() + "<======로그아웃!!!");
	}

//	@PutMapping("/{memIdx}") // 정보수정
//	public Member editMem(@RequestBody MemberEditRequest editRequest, @PathVariable("memIdx") int memIdx) {
//		
//		return editService.editMember(editRequest, memIdx);
//	}
	
	@PutMapping(value = "/name/{memIdx}", produces = "application/text;charset=utf8") //닉네임 수정
	public String editMemName(@RequestBody MemberNameEditRequest nameEditRequest,
							  @PathVariable("memIdx") int memIdx
							  ) {
		
		return editNameService.editNameMember(nameEditRequest, memIdx);
	}
	
	@PutMapping("/pw/{memIdx}") //비밀번호 수정
	public String editMemPw(@RequestBody MemberPwEditRequest pwEditRequest,
							@PathVariable("memIdx") int memIdx 
							) {
		
		return editPwService.editPwMember(pwEditRequest, memIdx);
	}
	

	@PutMapping("/edit/photo") // default 사진으로 수정
	public int photoUpload(@RequestBody MemberPhotoEditRequest photoEditRequest, HttpServletRequest request) throws IOException {

		return photoEditService.editPhotoMember(photoEditRequest, request);
	}

	@PostMapping("/upload/{memIdx}") // 사진 파일 업로드 & 유저 정보변경
	public String uploadFile(@PathVariable("memIdx") int memIdx, @RequestParam("uploadPhotoName") String memPhoto,
			@RequestParam("uploadPhoto") MultipartFile uploadPhoto, HttpServletRequest request) {

		photoSaveService.photoSave(uploadPhoto, memIdx, request);

		photoUploadService.uploadPhotoMember(memIdx, memPhoto);

		return "SUCCESS";
	}

	@DeleteMapping("/{memIdx}") // 회원탈퇴
	public int deleteMem(@PathVariable("memIdx") int memIdx, HttpSession session) {

		session.invalidate();
		
		return deleteService.deleteMem(memIdx);
	}

	@GetMapping("/naver") //REST API 네이버 로그인
	public String getNaverAuthUrl(HttpSession session) {
		String reqUrl = naverLoginUtil.getAutorizationUrl(session);
		return reqUrl;
	}

	@GetMapping("/naver/oauthNaver") //리다이렉트 페이지에서 정보를 얻고 가입 or 로그인 
	public ModelAndView oauthNaver(HttpServletRequest request, 
								   HttpServletResponse response, 
								   @RequestParam String code, 
								   @RequestParam String state,
								   String jSessionId,
								   HttpSession session, 
								   Model model) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		
		int naverResult = naverRegService.naverMemberReg(request, response, code, state, session, jSessionId);
		
		mav.setViewName("redirect:https://weatherwearmember.tk/member/");
		
		session.setAttribute("naverResult", naverResult);
		
		return mav;
	
	}
	
	@GetMapping("/idfind")
	public String findMemId(@RequestParam("memName") String memName) throws UnsupportedEncodingException {
		memName = new String(memName.getBytes("8859_1"), "UTF-8");
		System.out.println(memName);
		return idFindService.findIdByName(memName);
	}
	
	@PostMapping("/pwfind")
	public int findMemPw(@RequestParam("memId") String memId) {
		
		return pwFindService.rePwSend(memId);
	}
	
	@GetMapping("/allmember")
	public List<Member> memberList(){
		
		return adminService.getAllMember();
	}
	
	@GetMapping(value = "/{gbOwnerId}", produces = "text/html; charset=UTF-8")
	public String nameByIdx(@PathVariable("gbOwnerId") int memIdx, HttpServletResponse response) {
		/* response.setContentType("text/html; charset=UTF-8"); */
		String returnName = nameFindService.getMemName(memIdx);
		return returnName;
	}
	
	
}

