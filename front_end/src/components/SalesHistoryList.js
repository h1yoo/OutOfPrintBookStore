
import React from 'react';
import '../styled/PurchaseReqList.css';


const SalesHistoryList = ({ requests }) => {
  return (
    <div>
      {requests.map((request, index) => (
        <div className="sbk-purchase-req-card" key={index}>
{/*           <div className='sbk-list-inner-container'>
          </div> */}
          <img className="sbk-book-image" src={request.itemImg} alt={request.itemTitle} />
          <div className="sbk-text-container">
            <div className='sbk-main-container'>
              <h2 className="sbk-book-title">{request.itemTitle}</h2>
              <h2 className="sbk-book-info">{`${request.author} | ${request.publisher}`}</h2>
            </div>


            <div className='sbk-book-status'>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>도서상태</dt>
                <dd className='sbk-book-status-dd'>{request.damage === 0 ? '최상' : request.damage === 1 ? '상' : '중'}</dd>
              </dl>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>입찰가</dt>
                <dd className='sbk-book-status-dd'>{request.price}원</dd>
              </dl>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>입찰만료기한</dt>
                <dd className='sbk-book-status-dd' style={{ color: '#EB217C' }}>{request.expiry}</dd>
              </dl>
            </div>
          </div>

          <div className="sbk-button-container">
            {request.aucStatus === 1 ? ( /* 낙찰 상태면 낙찰 버튼 */
              <button className="sbk-cancel-button">낙찰</button>
              ) : (
                <button className="sbk-status-button">판매 입찰 취소</button> 
                )}
            <button className="sbk-status-button">현황 보기</button> {/*  */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesHistoryList;