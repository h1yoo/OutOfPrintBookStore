import React, { useEffect, useState, useContext } from 'react';
import '../styled/pageView.css';
import "../styled/PurchaseHistory.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyPageSide from '../components/MypageSide';
import MainPurchaseHistory from '../components/MainPurchaseHistory';
import { LoginContext } from "../components/LoginContext";
import axios from "axios";

const MypageView = () => {
  const { loginUser } = useContext(LoginContext);
  const [user, setUser] = useState({
    custKey: loginUser,
    custKey: loginUser,
    name: "",
    email: ""
  });

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/customers/${loginUser}`
      );
      setUser(response.data);
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
  
                <div className="yhw_purHistContentsBox">
                  <div className="my_home">
                    <div className="user-membership">
                      <div className="user-detail">
                        <div className="user-info">
                          <div className="info-box">
                            <strong className="name">{user.userid}</strong>
                            <p className="email">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my_home_title">
                      <h3 className="title">구매내역</h3>
                    </div>
                    <div className="recent_purchase">
                      {/* 전/입/진/종 컴포넌트 넣는 곳 */}
                      <MainPurchaseHistory />
                      <div>
                        <div className="purchase_list all bid">
                          <div>
                            <div className="recent_purchase area">
                              {/* DB로 파일 불러오기 */}
                              <p className="desc">거래 내역이 없습니다</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my_home_title">
                      <h3 className="title">판매 내역</h3>
                    </div>
                    <div className="recent_purchase">
                      {/* 전/입/진/종 컴포넌트 넣는 곳 */}
                      <MainPurchaseHistory />
                      <div>
                        <div className="purchase_list all ask">
                          <div className="recent_purchase area">
                            {/* DB로 파일 불러오기 */}
                            <p className="desc">거래 내역이 없습니다</p>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default MypageView;
