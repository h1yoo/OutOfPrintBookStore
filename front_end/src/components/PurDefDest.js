import React, { useState, useEffect, useContext } from "react";
import "../styled/PurDefDest.css";
// import { defShippingData } from "../asset/defShippingData";  // TestData 폴더에 저장된 기본 배송지 정보를 가져옴
import { LoginContext } from "../components/LoginContext";
import axios from "axios";

const PurDefDest = () => {
  const { loginUser } = useContext(LoginContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserAddr({ ...userAddr, [name]: value });
  };
  const [user, setUser] = useState([]);
  const [userAddr, setUserAddr] = useState({
    custKey: loginUser,
    name: "",
    tel: "",
    postcode: "",
    addr: "",
    addrDetail: "",
  });
  const [getAddr, setGetAddr] = useState([]);

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

  const getCustomerAddr = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/address/${loginUser}`
      );
      setGetAddr(response.data);
    } catch (error) {
      console.error("고객의 주소를 가져올수 없습니다.", error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    getCustomerAddr();
  }, [user, userAddr]);

  // 이름을 성과 이름으로 분리하여 성만 출력하고, 이름은 **로 대체하여 반환하는 함수
  const formatName = (fullName) => {
    const lastName = fullName.substring(0, 1);  // 성
    const firstName = fullName.substring(1);  // 이름
    const maskedName = lastName + firstName.replace(/./g, "*");
    return `${maskedName}`;
  };

  // 전화번호를 -로 분리하여 앞자리와 뒷자리 사이에 ****를 넣어 반환하는 함수
  const formatPhone = (phone) => {
    const first = phone.substring(0,3); // 010
    // const second = phone.substring(3,6);   // 1234
    const third = phone.substring(7);    // 5678
    return `${first}-****-${third}`;
  };
  
  return (
    <div className="yhw_defShippingInfoBox">
      {/* 성만 출력하고, 이름은 **으로 대체하여 표시 */}
      {/* 주소 목록 출력 */}
      {getAddr.map((address, i) => (
        <div key={i}>
          <span>{formatName(address.name)}</span>
          <span>{formatPhone(address.tel)}</span>
          <span>&#40;{address.postcode}&#41; {address.addr} {address.addrDetail}</span>
        </div>
      ))}
    </div>
  );
}

export default PurDefDest;