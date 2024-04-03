import React, { useState, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styled/Header.css";
import { FaSearch } from "react-icons/fa";
import useLogOut from "../hooks/api/useLogOut";
import { LoginContext } from "./LoginContext";


const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // useNavigate 훅
  const location = useLocation();
  const { logout } = useLogOut(); // 로그아웃 훅 사용
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext); // LoginContext에서 isLoggedIn 가져오기

  const handleItemClick = (event) => {
    const items = document.querySelectorAll(".sbk-menu-item");
    items.forEach((item) => item.classList.remove("active"));
    event.target.classList.add("active");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      /* ${window.location.origin} */
      if (location.pathname === "/") { // 메인 페이지인 경우
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      } else { // 다른 페이지인 경우
        navigate(`${location.pathname}/search?q=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") { // 엔터 키를 눌렀을 때
      handleSearchSubmit(); // 검색 실행
    }
  }

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
    window.location.reload(); // 페이지 리로드
  };

  return (
    <div>
      <div className="sbk-header-wrapper">
        <div className="sbk-li-container">
          <dl>
            <dt>
              <NavLink
                to="/QuestionForm"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                고객센터
              </NavLink>
            </dt>
            <dt>
              <NavLink
                to="/Mypage"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                마이페이지
              </NavLink>
            </dt>
            <dt>
              {isLoggedIn ? (
                <div className="sbk-menu-item" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                  로그아웃
                </div>
              ) : (
                <NavLink
                  to="/SNSLogin"
                  className="sbk-menu-item"
                  activeClassName="active"
                  onClick={handleItemClick}
                >
                  로그인/회원가입
                </NavLink>
              )}
            </dt>
          </dl>
        </div>

        <div className="sbk-menu-container">
          <div className="sbk-logo-wrapper">
            {/*             <a href="/" className="sbk-logo-link">
              <img
                className="sbk-logo-image"
                alt="로고이미지"
                src="img/logo.png"
              />
            </a> */}
            <NavLink to="/" className="sbk-logo-link">
              <img
                className="sbk-logo-image"
                alt="로고이미지"
                src="/img/logo.png" // 이미지 파일의 절대 경로로 수정
              />
            </NavLink>
          </div>

          <div className="sbk-search-container">
            <FaSearch className="sbk-search-icon" />
            <input
              type="text"
              className="sbk-search-input"
              placeholder="  검색어를 입력하세요"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleEnterKeyDown}
            />
            <button className="sbk-search-button" onClick={handleSearchSubmit}>검색</button>
          </div>
        </div>

        <div className="sbk-nav-container">
          <dl>
            <dt>
              <NavLink
                // to="/economics"
                to="/CategoryBookList"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                경제/경영
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/novels"
                to="/CategoryBookList"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                소설/시/희곡
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/comics"
                to="/CategoryBookList"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                만화
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/arts"
                to="/CategoryBookList"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                예체능
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/science"
                to="/CategoryBookList"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                과학
              </NavLink>
            </dt>
            <dt>
              <NavLink
                // to="/essays"
                to="/CategoryBookList"
                className="sbk-menu-item"
                activeClassName="active"
                onClick={handleItemClick}
              >
                에세이
              </NavLink>
            </dt>
          </dl>
        </div>
      </div>
      <hr className="sbk-header-hr" />
    </div>
  );
};

export default Header;
