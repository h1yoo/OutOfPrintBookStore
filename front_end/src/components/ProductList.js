import React from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProductListContainer = styled.div`
    width: 1050px;
    height: 300px;
    display: flex;
    flex-direction: row;
`;

const ProductImage = styled.div`
    width: 177px;
    height: 268px;
    background: url('/book.jpg');
    margin: 0 36px 29px;
`;

const ProductInfoContainer = styled.div`
    margin: 0px;
    display: flex;
    flex-wrap: wrap;
    width: 170px;
    height: 300px;
    text-align: left;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100px;
    justify-content: left;
    align-items: flex-start;
`;

const PriceTable = styled.table`
    width: 100%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;    
    justify-content: left;
    align-items: flex-end;
`;

const SellButton = styled.button`
    width: 160px;
    height: 50px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #C87E66;
    margin-left: auto;
    margin-right: 46px;
    margin-top: 9px;
`;


function ProductList(props) {
    return (
        <CenteredContainer>
        <ProductListContainer>
            <ProductImage></ProductImage>
            <ProductInfoContainer>
                <ProductInfo>
                <span>폴링인 폴</span>
                <span>모건하우절 | 문학동네</span>
                <span>아기 돌고래</span>
                </ProductInfo>
                <PriceTable>
                    <thead>
                        <tr>
                            <th>등급별최저가</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>최상</td>
                            <td>12000</td>
                        </tr>
                        <tr>
                            <td>상</td>
                            <td>12000</td>
                        </tr>
                        <tr>
                            <td>중</td>
                            <td>12000</td>
                        </tr>
                    </tbody>
                </PriceTable>
            </ProductInfoContainer>
            <SellButton>판매하기</SellButton>
        </ProductListContainer>
        </CenteredContainer>
    );
}

export default ProductList;