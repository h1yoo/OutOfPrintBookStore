import React, { useEffect, useState, useContext } from "react";
import { serverURL } from "../config";
import { useNavigate, useRouteError } from "react-router-dom";
import "../styled/PurchaseHistory.css";
import Header from "../components/Header";
import MyPageSide from "../components/MypageSide";
import DateInquiry from "../components/DateInquiry";
import PurInfoBox from "../components/PurInfoBox";
import Footer from "../components/Footer";
// import usePurInfoData from "../hooks/api/usePurInfoData"; // usePurInfoData 훅 임포트
import useGetReviews from "../hooks/api/useGetReviews";
import { LoginContext } from "../components/LoginContext";
import axios from "axios";

const PurchaseHistory = () => {
  // 사용자 로그인 상태 및 정보 가져오기
  const { isLoggedIn, loginUser } = useContext(LoginContext);
  // 구매 내역 필터링 및 상태 저장
  const [filteredPurLists, setFilteredPurLists] = useState([]); // aucStatus가 1인(=낙찰된) 요소들만 필터링하여 새로운 배열을 생성 후 저장
  // 선택된 도서 정보 상태 저장
  const [selectedBook, setSelectedBook] = useState([]);
  // 주문한 도서 정보 상태 저장
  const [orderBookData, setOrderBookData] = useState([]);
  // const [reviews, setReview] = useState({});

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      // 사용자의 구매 내역 가져오기
      try {
        const response = await axios.get(
          `${serverURL}/buyerbook/${loginUser}`
        );
        const buyerbooks = response.data;
        // 구매 내역 중에서 aucStatus가 1인(=낙찰된) 요소들만 필터링하여 새로운 배열 생성 후 저장
        console.log("사용자의 데이터", buyerbooks);
        const filteredBuyerbooks = buyerbooks.filter(
          (request) => request.aucStatus === 1
        ); // 여기서는 aucStatus가 1인 book 정보를 가져와서 PurInfoBox에 넘겨줌
        setFilteredPurLists(filteredBuyerbooks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, loginUser]);

  // 주문한 도서 정보 가져오기
  useEffect(() => {
    orderData();
  }, []);
  console.log(filteredPurLists, "필터된 데이터");
  const navigate = useNavigate(); // 구매후기작성 버튼 클릭 시 구매후기작성 페이지로 이동

  // 주문한 도서 정보 요청
  const orderData = async () => {
    try {
      const response = await axios.get(
        `${serverURL}/orders/customer/${loginUser}`
      );
      const orderByCustomer = response.data;
      console.log("주문한 사용자 정보", orderByCustomer);
      setOrderBookData(orderByCustomer);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // 후기 작성 버튼 클릭 시 처리 함수
  const handleClick = (index) => {
    //클릭시 해당 책의 itemBuyKey를 URL에 저장해서 후기 페이지로 넘어감
    const selectedBookKey = filteredPurLists[index].itemBuyKey;
    setSelectedBook(selectedBookKey);
    navigate(`/Mypage/PurchaseReview/${selectedBookKey}`);
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
              <div className="yhw_purHistTopCont">
                <b>구매내역</b>
                <DateInquiry /> {/* 날짜 조회 컴포넌트 일단 대충 만들어둠 */}
              </div>
              <div className="yhw_purHistContentsBox">
                {/* 구매 정보 표시 */}
                <ul className="yhw_purHistLists">
                {filteredPurLists.map((filteredPurList, index) => (
                  <React.Fragment key={index}>  {/* <></>를 써도 되지만, key를 부여해야 하기 때문에 리액트에서 여러 개의 자식 요소를 감싸기 위해 사용되는 특수한 컴포넌트 사용 */}
                    {orderBookData[index] && (
                      <li>
                        <PurInfoBox
                          bookData={filteredPurList}
                          orderBookData={orderBookData[index]} // 주문한 도서 정보 전달
                        />
                        <div className="yhw_purHistBtns">
                          <button onClick={() => handleClick(index)}>
                            구매 후기 작성
                          </button>
                        </div>
                      </li>
                    )}
                  </React.Fragment>
                ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PurchaseHistory;
