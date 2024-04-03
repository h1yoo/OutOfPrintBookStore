import React from 'react';
import CategoryBanner from '../components/CategoryBanner';
import ProductList from '../components/ProductList';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PurchaseRequestContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 1251px;
    height: 115px;
    margin: auto;
`;

const PurchaseRequest = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 6vw;
  margin: 0;
`;

const Title = styled.h3`
  font-size: 22px;
  margin-right: 4rem;
`;

const Button = styled.a`
  background-color: #C87E66;
  color: white;
  width: 156px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9375rem;
  text-decoration: none;
`;

const CategoryBookList = (props) => {
    return (
        <div>
            <Header />
            <PurchaseRequestContainer>
                <PurchaseRequest>
                    <Title>구매 희망 상품 등록</Title>
                    <Button href="/RegRequest">상품 등록 요청</Button>
                </PurchaseRequest>
            </PurchaseRequestContainer>
            <CategoryBanner />
            <ProductList />
            <ProductList />
            <ProductList />
            <ProductList />
            <ProductList />
            <Footer />
        </div>
    );
}

export default CategoryBookList;
