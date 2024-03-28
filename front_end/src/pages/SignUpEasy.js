import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styled/SignUp.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSignUp from "../hooks/api/useSignUp"; // useSignUp 훅 가져오기
import useGenderSelection from "../hooks/useGenderSelection"; // useGenderSelection 훅 가져오기
import useNicknameCheck from "../hooks/api/useNicknameCheck";

const SignUpEasy = () => {
  const { userData, setUserData, signupCheck } = useSignUp(); // useSignUp 훅 사용
  const { selectedGender, handleGenderButtonClick } = useGenderSelection(); // useGenderSelection 훅 사용
  const {
    isNicknameDuplicate,
    setIsNicknameDuplicate,
    checkNicknameDuplicate,
  } = useNicknameCheck();

  // 프로필 값 받기
  const location = useLocation();
  const { profile } = location.state;

  useEffect(() => {
    if (userData.userid && userData.email) {
      signupCheck(); // userData가 업데이트되면 signupCheck() 실행
    }
  }, [userData]); // userData가 변경될 때마다 useEffect 실행

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 프로필에서 가져온 userid와 email 추가하여 userData 객체 업데이트
    const updatedUserData = {
      ...userData,
      userid: profile.id,
      email: profile.email,
      // gender: selectedGender, // 성별 눌렀을 때 값 추가
    };
    // 업데이트된 userData를 이용하여 회원가입 체크
    setUserData(updatedUserData);
  };

  const handleNicknameCheck = async () => {
    // 아이디 중복 여부 확인
    const isNicknameDuplicate = await checkNicknameDuplicate(userData.nickname);
    // 중복 여부 상태 업데이트
    setIsNicknameDuplicate(isNicknameDuplicate);
  };
  return (
    <>
      <Header />
      <div className="yhw_container">
        <form className="yhw_signForm" onSubmit={handleSubmit}>
          <h4>환영합니다! 정보를 입력해주세요.</h4>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">이메일</span>
            {profile && (
              <input
                type="email"
                name="email"
                value={profile.email} // 프로필에서 가져온 이메일 값 사용
                onChange={handleChange}
                disabled
              />
            )}
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">나이</span>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleChange}
              // required
            />
            <span>세</span>
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">닉네임</span>
            <input
              type="text"
              name="nickname"
              value={userData.nickname}
              onChange={handleChange}
              required
            />
            <button
              className="yhw_dupCheckBtn"
              type="button"
              onClick={handleNicknameCheck}
            >
              중복확인
            </button>
          </div>
          <div className="yhw_signInputBox">
            <span className="yhw_signInputTit">성별</span>
            <div className="yhw_signGenderBtns">
              <button
                name="gender"
                value="M"
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  handleGenderButtonClick("M");
                }}
                style={{
                  backgroundColor: selectedGender === "M" ? "lightgray" : "",
                }}
              >
                남자
              </button>
              <button
                name="gender"
                value="F"
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  handleGenderButtonClick("F");
                }}
                style={{
                  backgroundColor: selectedGender === "F" ? "lightgray" : "",
                }}
              >
                여자
              </button>
            </div>
          </div>
          <div className="yhw_signUpBtnBox">
            <button type="submit">회원가입</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUpEasy;
