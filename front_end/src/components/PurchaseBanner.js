import React from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BannerContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 70vw;
    height: 50px;
    margin: auto;
    margin-top: 20px;
`;

const StyledH3 = styled.h3`
    margin-left: 50px;
`;


function PurchaseBanner({ selectedBanner }) {
    return (
        <CenteredContainer>
            <BannerContainer>
                <StyledH3>
                    구매후기 남기기
                    {selectedBanner}
                </StyledH3>
            </BannerContainer>
        </CenteredContainer>
    );
}
export default PurchaseBanner;