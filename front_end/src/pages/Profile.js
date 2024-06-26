import React, { useEffect, useState, useContext } from "react";
import { serverURL } from "../config";
import { Link } from "react-router-dom";
import "../styled/Profile.css";
import "../styled/PurchaseHistory.css";
import Header from "../components/Header";
import MyPageSide from "../components/MypageSide";
import Footer from "../components/Footer";
import { LoginContext } from "../components/LoginContext";
import axios from "axios";

const Profile = () => {
  const { loginUser } = useContext(LoginContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); // 수정모드를 위한 state
  const [editAddress, setEditAddress] = useState(null); // 수정된 주소를 저장하기 위한 state
  const [user, setUser] = useState([]);
  const [userAddr, setUserAddr] = useState({
    custKey: loginUser,
    name: "",
    tel: "",
    postcode: "",
    addr: "",
    addrDetail: "",
    defaultAddr: "",
  });
  const [getAddr, setGetAddr] = useState([]);
  const [defaultAddrChanged, setDefaultAddrChanged] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserAddr({ ...userAddr, [name]: value });
  };

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        `${serverURL}/customers/${loginUser}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const getCustomerAddr = async () => {
    try {
      const response = await axios.get(
        `${serverURL}/address/${loginUser}`
      );
      setGetAddr(response.data);
    } catch (error) {
      console.error("고객의 주소를 가져올수 없습니다.", error);
    }
  };

  const deleteAddr = async (addrKey) => {
    try {
      await axios.delete(`${serverURL}/address/${addrKey}`);
      getCustomer();
    } catch (error) {
      console.error("주소를 삭제를 실패하였습니다.", error);
    }
  };

  const editAddr = (address) => {
    setEditAddress(address); // 수정하기위해 잠시 값을 저장하는 state
    setUserAddr(address); // 수정한 값을 userAddr에 저장
    setEditMode(true); // 수정모드 state true 설정
    setModalOpen(true); // 모달창 보여주기
  };
  const cancelBtn = () => {
    setModalOpen(false);
    setEditMode(false);
    setUserAddr({
      custKey: loginUser,
      name: "",
      tel: "",
      postcode: "",
      addr: "",
      addrDetail: "",
      defaultAddr: "",
    });
  };

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    getCustomerAddr();
  }, [user, userAddr]);

  const submitBtn = async (event) => {
    event.preventDefault();
    // 모든 입력창 채웠는지 확인
    if (
      !userAddr.name ||
      !userAddr.tel ||
      !userAddr.postcode ||
      !userAddr.addr ||
      !userAddr.addrDetail
    ) {
      alert("모든 입력란을 채워주세요.");
      return;
    }
    try {
      if (editMode) {
        await axios.put(
          `${serverURL}/address/${editAddress.addrKey}`,
          userAddr
        );
        setEditMode(false);
      } else {
        await axios.post(`${serverURL}/address`, userAddr);
      }
      if (defaultAddrChanged) {
        const defaultAddress = getAddr.find(
          (address) => address.defaultAddr === "Y"
        );
        if (defaultAddress) {
          const updatedAddress = { ...defaultAddress, defaultAddr: "N" };
          await axios.put(
            `${serverURL}/address/${defaultAddress.addrKey}`,
            updatedAddress
          );
        }
        setDefaultAddrChanged(false); // 업데이트 후 기본주소지 상태값 false로 설정
      }
      setUserAddr({
        custKey: loginUser,
        name: "",
        tel: "",
        postcode: "",
        addr: "",
        addrDetail: "",
        defaultAddr: "",
      });
      setModalOpen(false);
    } catch (error) {
      console.error("주소 보내기 에러남", error);
    }
  };

  const handleDefaultAddrChange = (e) => {
    const { checked } = e.target;
    setUserAddr({ ...userAddr, defaultAddr: checked ? "Y" : "N" });
    setDefaultAddrChanged(true); //기본 배송지 변경 시 defaultAddrChanged를 true로 설정
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
              <div className="lcm_purHistMainCont">
                <div className="lcm_purHistTopTitle">
                  <div>
                    <h1>로그인 정보</h1>
                    <hr style={{border: "0", height: "1px", backgroundColor: "black"}} />
                  </div>
                </div>
                <div className="lcm_purHistContentsBox">
                  <b style={{fontSize: "16px"}}>내 계정</b>
                  <ul className="lcm_purHistLists">
                    <h4>아이디</h4>
                    <li>
                      <div className="lcm_purHistListsFetchData">{user.userid}</div>
                    </li>
                  </ul>
                </div>
                <div className="lcm_purHistContentsBox">
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
                      {getAddr.length > 0 && (
                        <div className="lcm-addInfo-contarinter">
                          {getAddr.map((address, i) => (
                            <div key={i}>
                              {address.defaultAddr === "Y" && (
                                <div style={{ color: "#828282", backgroundColor: "#EDEDED", width: "fit-content", padding: "5px 15px", fontSize: "13px" }}>
                                  기본주소지
                                </div>
                              )}
                              <div>이름: {address.name}</div>
                              <div>휴대폰 번호: {address.tel}</div>
                              <div>
                                {`주소: [${address.postcode}] ${address.addr} ${address.addrDetail}`}
                              </div>
                              <div className="lcm_purHistBtns lcm_purHist2Btns">
                                <span>
                                  <button onClick={() => editAddr(address)}>
                                    수정
                                  </button>
                                  <button
                                    onClick={() => deleteAddr(address.addrKey)}
                                  >
                                    삭제
                                  </button>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="lcm_purHistBtns">
                        <button onClick={() => setModalOpen(!modalOpen)}>
                          {modalOpen ? "- 새 배송지 추가" : "+ 새 배송지 추가"}
                        </button>
                      </div>
                    </li>

                    <li style={{ borderBottom: "none" }}>
                      {modalOpen && (
                        <div className="lcm-addr-container">
                          <form>
                            <div className="lcm-addFormInputBox">
                              <label>받는 사람</label>
                              <input
                                type="text"
                                name="name"
                                placeholder="이름"
                                value={userAddr.name}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="lcm-addFormInputBox">
                              <label>연락처</label>
                              <input
                                type="text"
                                name="tel"
                                placeholder="01012345678"
                                value={userAddr.tel}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="lcm-addFormInputBox">
                              <label>우편번호</label>
                              <input
                                type="text"
                                name="postcode"
                                placeholder="우편번호"
                                value={userAddr.postcode}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="lcm-addFormInputBox">
                              <label>주소</label>
                              <input
                                type="text"
                                name="addr"
                                placeholder="주소"
                                value={userAddr.addr}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="lcm-addFormInputBox">
                              <label>상세주소</label>

                              <input
                                type="text"
                                name="addrDetail"
                                placeholder="상세주소"
                                value={userAddr.addrDetail}
                                onChange={handleChange}
                              />
                            </div>
                            <input
                              type="checkbox"
                              checked={userAddr.defaultAddr === "Y"} // 주소가 기본 주소로 설정되었는지 확인
                              onChange={handleDefaultAddrChange} // 체크박스 변경을 처리하는 함수
                            />
                            <label>기본 배송지로 설정</label>
                            <div className="lcm_purHistBtns lcm_purHist2Btns">
                              <span>
                                <button onClick={submitBtn}>저장</button>
                                <button onClick={cancelBtn}>취소</button>
                              </span>
                            </div>
                          </form>
                        </div>
                      )}
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
