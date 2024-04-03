import React, { useState, useEffect, useContext } from 'react';
import '../styled/BookStateCategory.css';
import "../styled/PurchaseHistory.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import PurchaseReqForm from '../components/PurchaseReqForm';
import PurchaseReqListOngoing from '../components/PurchaseReqListOngoing';
import PurchaseReqListEnd from '../components/PurchaseReqListEnd';
import MyPageSide from '../components/MypageSide';
import BookSell from '../components/BookSell';
import { LoginContext } from "../components/LoginContext";
import axios from 'axios';

function RegRequest() {
  const { isLoggedIn, loginUser } = useContext(LoginContext);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedTab, setSelectedTab] = useState('진행중');
  const [buyerBookData, setBuyerBookData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/buyerbook/${loginUser}`);
        const buyerbooks = response.data;
        console.log("사용자의 데이터", buyerbooks)
        setBuyerBookData(buyerbooks);
        setFilteredRequests(buyerbooks.filter(request => request.aucStatus === 2)); // 기본적으로 aucStatus가 2인 데이터로 설정
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, loginUser]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    filterRequests(tab);
  };

  const filterRequests = (tab) => {
    let filtered = [];
    if (tab === '진행중') {
      filtered = buyerBookData.filter(request => request.aucStatus === 2);
    } else if (tab === '낙찰') {
      filtered = buyerBookData.filter(request => request.aucStatus === 1);
    } else if (tab === '기한만료') {
      filtered = buyerBookData.filter(request => request.aucStatus === 3);
    }
    setFilteredRequests(filtered);
  };

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
              <div className='sbk-purchase-request-form-title'>
                <h1>구매 희망 도서 등록</h1>
                <hr className='sbk-purchase-request-form-hr' />
              </div>
              <PurchaseReqForm loginUser={loginUser} />



              <div className='sbk-purchase-request-form-title'>
                <h1>구매 희망 도서 신청내역</h1>

              </div>

              <BookSell onSelect={handleTabChange} requests={buyerBookData} />{/*  */}
              <div className='sbk-purchase-request-form-title'>
                <h3 className='sbk-purchase-request-form-item-quantity'>상품 전체 &nbsp;{filteredRequests.length}</h3>
              </div>
              {selectedTab === '진행중' && <PurchaseReqListOngoing requests={filteredRequests} />}
              {selectedTab === '낙찰' && <PurchaseReqListEnd requests={filteredRequests} />}
              {selectedTab === '기한만료' && <PurchaseReqListEnd requests={filteredRequests} />}
              {selectedTab !== '진행중' && selectedTab !== '낙찰' && selectedTab !== '기한만료' && <PurchaseReqListEnd requests={filteredRequests} />}

            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default RegRequest;
