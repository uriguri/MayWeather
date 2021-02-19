package com.mw.member.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnailator;

@Transactional
@Service
public class MemberPhotoSaveService {
	
	public String photoSave(MultipartFile uploadPhoto, int memIdx, HttpServletRequest request) {
		
		File newFile = null;
		
		String newFileName = null;
		
		if(uploadPhoto != null && !uploadPhoto.isEmpty()) {
			
			String uploadPath = "/fileupload/member";
			
			String saveDirPath = request.getSession().getServletContext().getRealPath(uploadPath);
			
			System.out.println(saveDirPath);
			
			newFileName = Integer.toString(memIdx);
			
			System.out.println(newFileName);
			
			newFile = new File(saveDirPath, newFileName);
			
			System.out.println(newFile);
			
			try {
				
				FileOutputStream thumnail = new FileOutputStream(new File(saveDirPath, newFileName+".png"));
				
				Thumbnailator.createThumbnail(uploadPhoto.getInputStream(), thumnail, 50, 50);
				
				thumnail.close();
				
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			
		}
		
		return "photoSaveSucess";
	}

}
