package com.mw.member.domain;

import java.util.List;

import lombok.Data;

@Data
public class MemberListView {

	private int pageNumber;       // 현재 페이지 번호
	private int totalMemberCount; // 총 게시물(멤버) 개수
	private int cntPerPage;		  // 한 페이지에 노출할 게시물(멤버) 개수
	private List<Member> memberList; // 노출할 게시물(멤버)의 정보 를 담는 리스트
	private int startRow;
	private int endRow;
	private int totalPageCount;		// 전체 페이지의 개수
	
	public MemberListView(int pageNumber, int totalMemberCount, int cntPerPage, List<Member> memberList, int startRow, int endRow) {
		this.pageNumber=pageNumber;
		this.totalMemberCount=totalMemberCount;
		this.cntPerPage=cntPerPage;
		this.memberList=memberList;
		this.startRow=startRow;
		this.endRow=endRow;
		calTotalPageCount();
	}
	
	private void calTotalPageCount() {
		totalPageCount = totalMemberCount/cntPerPage;	//전체페이지 = 총 멤버 / 한페이지 게시물 개수
		
		// 총멤버/한 페이지 노출멤버개수의 나머지가 0 => 1페이지 추가해준다.
		if(totalMemberCount%cntPerPage > 0) {
			totalPageCount++;
		}
	}
}