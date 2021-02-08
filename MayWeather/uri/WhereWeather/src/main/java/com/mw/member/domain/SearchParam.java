package com.mw.member.domain;

import lombok.Data;

@Data
public class SearchParam {

	private int p;
	private String searchType;
	private String keyword;
	
	
	public SearchParam(int p, String searchTyep, String keyword) {
		this.p=p;
		this.searchType=searchTyep;
		this.keyword=keyword;
		
		//페이지는 1부터 시작 1보다 작다면 기본값 1로 설정
		if(this.p<1) {
			this.p=1;
		}
	}
	
	public SearchParam() {
		this.p=1;
	}
}
