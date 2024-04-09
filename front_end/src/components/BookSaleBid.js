import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../components/LoginContext";
import axios from 'axios';

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;

const BidContainer = styled.div`
    width: 900px;
    height: 500px;
`;

const HopePriceContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const HopePrice = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 10px;
`;

const Label = styled.label`
    width: auto;
    margin-right: 10px;
`;

const PriceInputBox = styled.input`
    width: 256px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-left: 10px;
    text-align: right;
`;

const ConditionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ConditionItem = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-left: 10px;
`;

const SellBookButton = styled.button`
    width: 156px;
    height: 46px;
    background-color: #C87E66;
    color: #fff;
    border-radius: 10px;
`;

const AgreeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LabelTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const PStyle = styled.p`
    margin-left: 10px;
`;

function BookSaleBid() {
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [price, setsellerPrice] = useState('');
    const navigate = useNavigate();
    const { isLoggedIn, loginUser } = useContext(LoginContext);

    // 로그인 정보 가져오는 곳
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/customers/${loginUser}`);
                const users = response.data;
                console.log("사용자의 데이터", users);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (isLoggedIn && loginUser) {
            fetchData();
        }
    }, [isLoggedIn, loginUser]);

    const handleConditionChange = (event) => {
        const value = event.target.value;
        if (selectedConditions.includes(value)) {
            setSelectedConditions(selectedConditions.filter(item => item !== value));
        } else {
            setSelectedConditions([...selectedConditions, value]);
        }
    };

    const handleAgree = () => {
        setAgreedToTerms(prevState => !prevState);
    };

    // 입력한 정보 가져오는 곳
    const handleSellBookClick = async () => {
        if (agreedToTerms) {
            try {
                const sellerBookData = {
                 custKey: loginUser,
                 damage: selectedConditions.join(', '),
                 price: price
                };

                const response = await axios.post('http://localhost:3001/sellerbook',sellerBookData);
                console.log(response.sellerBookData);
                alert("판매 입찰이 성공적으로 제출되었습니다.");
                navigate('/MyPage/SalesHistory');

            } catch (error) {
                console.error("Error submitting seller bid:", error);
            }
        } else {
            alert("판매 입찰 주의사항에 동의해주세요!");
        }
    };

    return (
        <div>
            <FlexContainer>
                <BidContainer>
                    <HopePriceContainer>
                        <HopePrice>
                            <LabelTitle>판매희망가</LabelTitle>
                            <PriceInputBox
                                type="number"
                                placeholder="금액을 입력하세요"
                                name="sellerPrice"
                                value={price}
                                onChange={(e) => setsellerPrice(e.target.value)}
                            />                        
                            </HopePrice>
                        <HopePrice>
                            <LabelTitle>도서 상태</LabelTitle>
                            <ConditionContainer>
                                <ConditionItem>
                                    <input
                                        type="checkbox"
                                        id="status1"
                                        name="status"
                                        value="1"
                                        checked={selectedConditions.includes("1")}
                                        onChange={handleConditionChange}
                                    />
                                    <Label htmlFor="status1">낙서 및 필기 있음</Label>
                                </ConditionItem>
                                <ConditionItem>
                                    <input
                                        type="checkbox"
                                        id="status2"
                                        name="status"
                                        value="2"
                                        checked={selectedConditions.includes("2")}
                                        onChange={handleConditionChange}
                                    />
                                    <Label htmlFor="status2">파손 있음</Label>
                                </ConditionItem>
                                <ConditionItem>
                                    <input
                                        type="checkbox"
                                        id="status3"
                                        name="status"
                                        value="3"
                                        checked={selectedConditions.includes("3")}
                                        onChange={handleConditionChange}
                                    />
                                    <Label htmlFor="status3">액체로 인한 오염 있음</Label>
                                </ConditionItem>
                            </ConditionContainer>
                        </HopePrice>
                        <HopePrice>
                            <LabelTitle>판매 입찰 주의사항</LabelTitle>
                            <PStyle>선택한 도서의 결함 상태에 따라 도서 상태 등급이 정해집니다.<br />도서 상태 등급은 판매 입찰 후마이페이지 &gt; 판매하기 &gt; 현황보기에서 확인하실 수 있습니다.<br />구매 희망자가 설정한 입찰 마감 기한 내에 구매가 이루어지지 않으면 옥션은 기각됩니다.</PStyle>
                        </HopePrice>
                        <AgreeContainer>
                            <input type="checkbox" id="agreeTerms" checked={agreedToTerms} onChange={handleAgree} />
                            <LabelTitle htmlFor="agreeTerms">(필수)동의하기</LabelTitle>
                        </AgreeContainer>
                        <FlexContainer>
                            <SellBookButton onClick={handleSellBookClick}>판매 입찰하기</SellBookButton>
                        </FlexContainer>
                    </HopePriceContainer>
                </BidContainer>
            </FlexContainer>
        </div>
    );
}

export default BookSaleBid;
