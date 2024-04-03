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
    height: 5vw;
    margin: auto;
`;

function CategoryBanner({ selectedCategory }) {
    return (
        <CenteredContainer>
            <BannerContainer>
                <h3>
                    경영/경제
                    {selectedCategory}
                </h3>
            </BannerContainer>
        </CenteredContainer>
    );
}
export default CategoryBanner;