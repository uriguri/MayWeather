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
		
		URL url = new URL("https://weatherwearmember.tk"+request.getContextPath()+"/fileupload/member/"+photoEditRequest.getMemPhoto());
		
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		
		connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31");
		
		BufferedImage image = ImageIO.read(connection.getInputStream());
	
		File newFile = null;
		
		String newFileName = null;
		
		String uploadPath = "/fileupload/member";
		
		String saveDirPath = request.getSession().getServletContext().getRealPath(uploadPath);
		
		newFileName = Integer.toString(photoEditRequest.getMemIdx())+".png";
		
		newFile = new File(saveDirPath, newFileName);
		
		ImageIO.write(image, "png", newFile);
		
		
		
		Member member = photoEditRequest.getToMember();
		
		dao = template.getMapper(MemberDao.class);
		
		result = dao.updatePhoto(member);
		
		return result;
	} 
	
}
