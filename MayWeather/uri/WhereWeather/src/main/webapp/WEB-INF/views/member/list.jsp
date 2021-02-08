<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">

<title>+WEATHER WEAR+</title>

<link rel="styleSheet" href="<c:url value="/css/default.css"/>">

<%@ include file="/WEB-INF/views/include/basicset.jsp"%>

</head>

<style>
	.memContents {
	margin-top: 200px;
	}
</style>


<body bgcolor="#f5f5f5">

	<%@ include file="/WEB-INF/views/include/header.jsp"%>

	<div class="memContents">
       <h2 class="memTitle">회원 리스트</h2>
		<hr>
		
      <div class="memContent">
      
	      <div class="searchBox">
	      	<form>
	      		검색 설정<select name="searchType">
	      				<option value="id">아이디</option>
	      				<option value="name">이름(닉네임)</option>
	      				<option value="both">아이디+이름(닉네임)</option>
	                  </select>
	                  검색 키워드 <input type="text" name="keyword"> <input type="submit" value="검색">
	      	</form>
	      </div>
	      
	      <div class="memListTable">
	      	<table>
	      		<tr>
					<th>회원 번호</th>
					<th>회원 아이디</th>
					<th>회원 프로필 사진</th>
					<th>회원 가입일</th>
					<th>회원 관리</th>	      		
	      		</tr>
	      		
	      	<c:forEach items="${listView.memberList}" var="member">
	      		<tr>
					<td>${member.memIdx}</td>
					<td>${member.memId}</td>
					
					<td>
					<img  width="30" height="30"  alt="profilePhoto" src="<c:url value="/fileupload/member/${member.memPhoto}"/>">
					</td>
					
					<td>
					<fmt:formatDate value="${member.memRegdate}" pattern="yyyy.MM.dd"/>
					</td>
					
					<td>
						<a href="<c:url value="/member/edit?memIdx=${member.memIdx}"/>">수정</a> 
						<a href="javascript:deleteMember(${member.memIdx})">삭제</a>
					</td>	      		
					
	      		</tr>
	      	</c:forEach>
	      	</table>
	      </div>
	      
	      <ul class="mem-paging">
	      	<c:if test="${listView.totalMemberCount>0}">
	      		<c:forEach begin="1" end="${listView.totalPageCount}" var="num">
	      			<li class="page-item ${listView.pageNumber eq num ? 'active' : ''}">
	      			<a class="page-link" href="<c:url value="/member/list"/>?p=${num}&searchType=${param.searchType}&keyword=${param.keyword}">${num}</a>
	      			</li>
	      		</c:forEach>
	      	</c:if>
	      </ul>
	      
	      
      </div> 
       
	</div>
	
	<%@ include file="/WEB-INF/views/include/footer.jsp" %>


	<script>
		function deleteMember(memIdx){
			if(confirm('정말로 삭제하시겠습니까???')){
				location.href = '<c:url value="/member/delete?memIdx="/>'+ memIdx;
			}
		}
	</script>

</body>
</html>