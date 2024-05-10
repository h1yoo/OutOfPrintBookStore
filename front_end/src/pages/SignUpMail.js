import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styled/SignUp.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSignUp from "../hooks/api/useSignUp";
import useUserIdCheck from "../hooks/api/useUserIdCheck";
import useNicknameCheck from "../hooks/api/useNicknameCheck";
import useGenderSelection from "../hooks/useGenderSelection"; // useGenderSelection 훅 가져오기
import usePasswordMatch from "../hooks/usePasswordMatch"; // 패스워드 확인용 훅 usePasswordMatch

const SignUpMail = () => {
  // 커스텀 훅스
  const { userData, setUserData, signupCheck } = useSignUp();
  const { checkUserIdDuplicate, isDuplicate, setIsDuplicate } =
    useUserIdCheck();
  const { selectedGender, handleGenderButtonClick } = useGenderSelection(); // useGenderSelection 훅 사용
  const [password, setPassword] = useState(""); // password와 checkPassword가 일치하는지 확인하기 위해 사용
  const [checkPassword, setCheckPassword] = useState(""); // password와 checkPassword가 일치하는지 확인하기 위해 사용
  const [isValidEmail, setIsValidEmail] = useState(false); // 이메일 유효성 검사 확인용

  //============== 비밀번호 유효성 검사 ==============//
  const pwValidatioCheck =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  //============== 이메일 유효성 검사 =============//
  const emailValidationRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 비밀번호 일치 확인용 훅 사용
  const match = usePasswordMatch(password, checkPassword);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setCheckPassword(e.target.value);
  };

  const {
    isNicknameDuplicate,
    setIsNicknameDuplicate,
    checkNicknameDuplicate,
  } = useNicknameCheck();

  const submitBtn = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (
      !userData.userid ||
      !userData.userpwd ||
      !userData.email ||
      !userData.nickname
    ) {
      alert("아이디, 비밀번호, 이메일, 닉네임을 입력해주세요");
      return;
    }
    signupCheck();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  // 중복 확인 버튼 클릭 시 실행되는 함수
  const handleUserIdCheck = async () => {
    // 아이디 중복 여부 확인
    const isDuplicate = await checkUserIdDuplicate(userData.userid);
    // 중복 여부 상태 업데이트
    setIsDuplicate(isDuplicate);
  };

  const handleNicknameCheck = async () => {
    // 닉네임 중복 여부 확인
    const isNicknameDuplicate = await checkNicknameDuplicate(userData.nickname);
    // 중복 여부 상태 업데이트
    setIsNicknameDuplicate(isNicknameDuplicate);
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setIsValidEmail(emailValidationRegex.test(email));
    handleChange(e);
  };

  return (
    <>
      <div className="height-container">
        <Header />
        <div className="yhw_container">
          <form className="yhw_signForm">
            <h4>환영합니다! 정보를 입력해주세요.</h4>
            <div className="yhw_signInputBox">
              <span className="yhw_signInputTit">아이디</span>
              <input
                type="text"
                name="userid"
                placeholder="아이디"
                value={userData.userid}
                onChange={handleChange}
              />
              <button
                className="yhw_dupCheckBtn"
                type="button"
                onClick={handleUserIdCheck}
              >
                중복확인
              </button>
            </div>
            <div className="yhw_signInputBox">
              <span className="yhw_signInputTit yhw_signMailPWInputTit">
                비밀번호
              </span>
              <div className="yhw_signMailCheckMsgBox">
                <input
                  type="password"
                  name="userpwd"
                  placeholder="비밀번호"
                  value={userData.userpwd}
                  onChange={(e) => {
                    handleChange(e);
                    handlePasswordChange(e);
                  }}
                />
                <p
                  className="yhw_passwordCheckMsg"
                  style={{
                    color: pwValidatioCheck.test(userData.userpwd)
                      ? "green"
                      : "red",
                  }}
                >
                  {pwValidatioCheck.test(userData.userpwd)
                    ? "조건 충족"
                    : "하나 이상의 대문자, 소문자, 숫자, 특수문자 포함 8자 이상"}
                </p>
              </div>
            </div>
            <div className="yhw_signInputBox">
              <span className="yhw_signInputTit yhw_signMailPWInputTit">
                비밀번호 확인
              </span>
              <div className="yhw_signMailCheckMsgBox">
                <input
                  value={checkPassword}
                  onChange={handleConfirmPasswordChange}
                  type="password"
                  placeholder="비밀번호 확인"
                  required
                />
                <p
                  className="yhw_passwordCheckMsg"
                  style={{ color: checkPassword && match && match === true ? "green" : "red" }}
                >
                  {checkPassword && match && match === true
                    ? "비밀번호가 일치합니다."
                    : "비밀번호가 일치하지 않습니다."}
                </p>
              </div>
            </div>
            <div className="yhw_signInputBox">
              <span className="yhw_signInputTit yhw_signMailPWInputTit">
                이메일
              </span>
              <div className="yhw_signMailCheckMsgBox">
                <input
                  type="text"
                  name="email"
                  placeholder="이메일"
                  value={userData.email}
                  onChange={handleEmailChange}
                />
                <p
                  className="yhw_passwordCheckMsg"
                  style={{ color: isValidEmail ? "green" : "red" }}
                >
                  {isValidEmail
                    ? "유효한 이메일입니다."
                    : "유효하지 않은 이메일입니다."}
                </p>
              </div>
            </div>
            <div className="yhw_signInputBox">
              <span className="yhw_signInputTit">닉네임</span>
              <input
                type="text"
                name="nickname"
                placeholder="닉네임"
                value={userData.nickname}
                onChange={handleChange}
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
              <span className="yhw_signInputTit">나이</span>
              <input
                className="yhw_AgeInput"
                type="text"
                name="age"
                value={userData.age}
                onChange={handleChange}
              />
              <span>세</span>
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
              <button type="submit" onClick={submitBtn}>
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpMail;
