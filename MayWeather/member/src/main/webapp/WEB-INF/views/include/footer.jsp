<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
   
   
   <c:url value="/list" var="ootd_list"/>
    <footer>

      <table border="0" class="footer_menu_table">
         <tr>
         
            <td><img src="image/icon/home2.png" width="30" class="menuicons" onclick="setMainPage()">
            </td>
            
            <td><img src="image/icon/ootd.png" width="30" class="menuicons" onclick="ootdMain()">
            </td>
            
            <td><img src="image/icon/closet.png" width="23" class="menuicons" onclick="list(cPage)">
            </td>
            
            <td><img src="image/icon/market.png" width="30" class="menuicons" onclick="fnSaleList(1)">
            </td>
            
            <td><img src="image/icon/mypage2.png" width="23" class="menuicons" onclick="memberMain()">
            </td>
            
         </tr>
         <tr>
            <td>HOME</td>
            <td>OOTD</a></td>
            <td>CLOSET</td>
            <td>MARKET</td>
            <td>MY</td>
         </tr>
      </table>

   </footer>