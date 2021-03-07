package com.mw.member.service;

import java.awt.image.BufferedImage;
import java.awt.image.ImagingOpException;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mw.member.dao.MemberDao;
import com.mw.member.domain.Member;
import com.mw.member.domain.MemberPhotoEditRequest;

@Service
public class MemberPhotoEditService {
	
	private MemberDao dao;
	
	@Autowired
	private SqlSessionTemplate template;

	public int editPhotoMember(MemberPhotoEditRequest photoEditRequest, HttpServletRequest request) throws IOException {
		
		int result = 0;
		
		//디폴트 사진을 가져올 URL(1)
		URL url = new URL("https://weatherwearmember.tk"+request.getContextPath()+"/fileupload/member/"+photoEditRequest.getMemPhoto());
		
		//로컬 테스트용
		//URL url = new URL("https://weatherwearmember.tk"+request.getContextPath()+"/member/fileupload/member/"+photoEditRequest.getMemPhoto());
		
		//자바에서 직접 요청시 403에러 발생  에러 방지 커넥션 세팅 및 URL(1) 연결
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31");
		
		//BufferedImage로  이미지 생성
		BufferedImage image = ImageIO.read(connection.getInputStream());
	
		//파일객체 생성
		File newFile = null;
		
		//파일저장할 이름 생성
		String newFileName = null;
		
		//업로드 경로 설정
		String uploadPath = "/fileupload/member";

		//웹상의 실제 업로드 경로로 설정
		String saveDirPath = request.getSession().getServletContext().getRealPath(uploadPath);
		
		System.out.println(saveDirPath);
		
		//저장할 파일이름 .png를 붙이지 않을 시 정책상 팀원들이 사진을 사용하지못함 
		newFileName = Integer.toString(photoEditRequest.getMemIdx())+".png";
		
		System.out.println(newFileName);
		
		//파일객체에 값 넣어줌 (저장경로, 저장이름)
		newFile = new File(saveDirPath, newFileName);
		
		System.out.println(newFile);
		
		//ImageIo를 사용해 (생성이미지, 확장자, 파일객체) 로 저장해줌.
		ImageIO.write(image, "png", newFile);
		
		
		Member member = photoEditRequest.getToMember();
		
		dao = template.getMapper(MemberDao.class);
		
		result = dao.updatePhoto(member);
		
		return result;
	} 
	
}
