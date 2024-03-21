import React from 'react';
import '../styled/pageView.css';
import MypageSide from '../components/MypageSide';
import PurchaseHistory from '../components/PurchaseHistory';

function MypageView() {
  return (
    <div className="cyj_content_area my-page-content">
      {/* 사이드바 넣는 곳 */}
       <div className="my-page-sidebar">
        <MypageSide />
      </div>
      <div className="my_home">
        <div className="user-membership">
          <div className="user-detail">
            <div className="user-info">
              <div className="info-box">
                <strong className="name">multi</strong>
                <p className="email">multi@multi.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my_home_title">
          <h3 className="title">구매내역</h3>
        </div>
        <div className="recent_purchase">
          {/* 전/입/진/종 컴포넌스 넣는 곳 */}
          <PurchaseHistory />
          <div>
            <div className="purchase_list all bid">
              <div>
                <div className="recent_purchase area">
                  {/* DB로 파일 불러오기 */}
                  <p className="desc">거래 내역이 없습니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my_home_title">
          <h3 className="title">판매 내역</h3>
        </div>
        <div className="recent_purchase">
          {/* 전/입/진/종 컴포넌스 넣는 곳 */}
          <PurchaseHistory />
          <div>
            <div className="purchase_list all ask">
              <div className="recent_purchase area">
                  {/* DB로 파일 불러오기 */}
                <p className="desc">거래 내역이 없습니다</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MypageView;
