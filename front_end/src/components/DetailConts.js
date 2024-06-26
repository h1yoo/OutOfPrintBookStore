import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styled/DetailConts.css";
import SellerRanking from "../components/SellerRanking";
import axios from "axios";
import { serverURL } from "../config";

const DetailConts = ({ productInfo, bookInfo }) => {
  const { price, sellerKey, damage } = productInfo; //판매자 정보 가져오기
  const [showModal, setShowModal] = useState(false); // 판매자 정보 보기 modal - useState
  const [sellerNickname, setSellerNickname] = useState();
  console.log(productInfo, "productInfo 데이터");
  const toggleModal = () => {
    // 판매자 정보 보기 버튼 클릭 시 모달창 띄우기
    setShowModal(!showModal);
  };

  const navigate = useNavigate(); // 구매후기작성 버튼 클릭 시 구매후기작성 페이지로 이동

  const convey = () => {
    navigate("/SellerInfoPage", {
      //판매자 정보 페이지로 이동
      state: {
        custKey: productInfo.sellerKey,
      },
    });
  };

  const handlePurBtnClick = () => {
    navigate(`/Purchase/${productInfo.itemSellKey}`); // itemSellKey 값 받아서 이동.
    window.scrollTo(0, 0); // 페이지 이동 후 화면의 상단으로 스크롤 이동
  };
  const getSellerNickname = async () => {
    try {
      const response = await axios.get(
        `${serverURL}/customers/${sellerKey}`
      );
      console.log(response.data.nickname);
      setSellerNickname(response.data.nickname);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSellerNickname();
  }, [sellerKey]);

  return (
    <div className="yhw_detailContsBox">
      <div className="yhw_detailContsLElts">
        <img src={bookInfo.itemImg} alt="상품이미지" />
        <div className="yhw_detailContsLTxt">
          <div className="yhw_detailContsLTop">
            <b>입찰가 {price}원</b>
            <span
              className="yhw_detailContsSeller"
              title="판매자 정보 보기"
              onClick={convey}
            >
              판매자 : {sellerNickname}
            </span>
          </div>
          <div className="yhw_detailContsLBottom">
            <span>상태 등급</span>
            <b>
              {damage === 0 && "최상"}
              {damage === 1 && "상"}
              {damage >= 2 && "중"}
            </b>
          </div>
        </div>
      </div>
      <div className="yhw_detailContsRBtns">
        <button onClick={handlePurBtnClick}>구매하기</button>
        <button onClick={toggleModal}>판매자 정보 보기</button>
        {/* 판매자 정보 보기 클릭 시 판매자 점수 정보 화면에 출력 ==> 구현중
        {showModal && (
          <div className="modal-content" style={{backgroundColor:"rgba(0, 0, 0, 0.3);"}}>
            <span className="close" onClick={toggleModal} style={{color:"white"}}>&times;</span>
            <SellerRanking style={{width:"40%"}} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DetailConts;
