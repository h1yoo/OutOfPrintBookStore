import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styled/Profile.css";
import "../styled/PurchaseHistory.css";
import Header from "../components/Header";
import MyPageSide from "../components/MypageSide";
import Footer from "../components/Footer";
import { LoginContext } from "../components/LoginContext";
import axios from "axios";
const Profile = () => {
  const { isLoggedIn, loginUser } = useContext(LoginContext); // isLoggedIn 값 가져오기
  // 로그인 및 로그아웃 이벤트 발생 시에도 세션 체크
  const [user, setUser] = useState([]);

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/customers/${loginUser}`
      );
      setUser(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <>

      <div className="height-container">
        <Header />

        <div className="yhw_container">
          <div className="yhw_purHistCont">
            <div className="yhw_MypageSideAdd">
              <MyPageSide />
            </div>
            <div className="yhw_purHistMainCont">

              <div className="lcm_purHistMainCont">
                <div className="lcm_purHistTopCont">
                  <b>로그인 정보</b>
                </div>
                <div className="lcm_purHistContentsBox">
                  <ul className="lcm_purHistLists">
                    <h4>아이디</h4>
                    <li>
                      <div>{user.userid}</div>
                      <div className="lcm_purHistBtns">
                        <button>변경</button>
                      </div>
                    </li>
                    <h4>비밀번호</h4>
                    <li>
                      <div>비밀번호</div>
                      <div className="lcm_purHistBtns">
                        <button>변경</button>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="lcm_purHistContentsBox">
                  <div className="lcm_purHistTopCont">
                    <b>개인 정보</b>
                  </div>
                  <ul className="lcm_purHistLists">
                    <h4>휴대폰 번호</h4>
                    <li>
                      <div>{user.contact}</div>
                      <div className="lcm_purHistBtns">
                        <button>변경</button>
                      </div>
                    </li>
                    <h4>배송지</h4>
                    <li>
                      <p>배송지11111sadfasdfasdfasdfads</p>
                      <div className="lcm_purHistBtns">
                        <Link to="/Address" className="lcm_purHistBtns">
                        <button>새 배송지 추가</button>
                        </Link>
                        <span>
                          <button>수정</button>
                          <button>삭제</button>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Profile;
