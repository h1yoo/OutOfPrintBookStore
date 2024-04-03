import React from "react";
import { Link } from "react-router-dom";
import "../styled/MyPageSide.css";

function MyPageSide() {
  return (
    <div className="cyj_snb_area">
      <h2 className="snb_main_title">마이 페이지</h2>
      <nav className="snb">
        <div className="snb_list">
          <strong className="snb_title">쇼핑 정보</strong>
          <ul className="snb_menu">
            {/* href 부분 이름 다 기획안 보고 수정하기 */}
            <li className="menu_item">
              <Link to="/Mypage/PurchaseHistory" className="menu_link">
                구매내역
              </Link>
            </li>
            <li className="menu_item">
              <Link to="/Mypage/SalesHistory" className="menu_link">
                판매내역
              </Link>
            </li>
            <li className="menu_item">
              <Link to="/Mypage/RegRequest" className="menu_link">
                구매 희망 도서
              </Link>
            </li>
          </ul>
        </div>
        <div className="snb_list">
          <strong className="snb_title">내 정보</strong>
          <ul className="snb_menu">
            {/* href 부분 이름 다 기획안 보고 수정하기 */}
            <li className="menu_item">
              <Link to="/Mypage/Profile" className="menu_link">
                로그인 정보
              </Link>
            </li>
            <li className="menu_item">
              <Link to="/Mypage/Rank" className="menu_link">
                판매자 등급
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default MyPageSide;
