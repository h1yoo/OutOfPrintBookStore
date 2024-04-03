import React from 'react';
import { Link } from 'react-router-dom';
import '../styled/PurchaseRequest.css';

const PurchaseRequest = () => {
  return (
    <div className="sbk-PurchaseRequestContainer">
      <h3 className="sbk-Title">구매 희망 상품 등록</h3>
      <Link to="/Mypage/RegRequest" className="sbk-Button">상품 등록 요청</Link>
    </div>
  );
};

export default PurchaseRequest;
