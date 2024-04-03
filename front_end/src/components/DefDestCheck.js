import React from "react";
import "../styled/DefDestCheck.css";

const PurDefDestCheck = ({ isChecked, setIsChecked }) => {
  // 페이지파일(= Purchase.js)에 있는 isChecked와 setIsChecked를 props로 받아옴
  return (
    <div className="yhw_purDefDestCheckForm">
      <input
        type="checkbox"
        value=""
        id="flexCheckDefault"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label for="flexCheckDefault">기본 배송지로 배송</label>
    </div>
  );
};

export default PurDefDestCheck;
