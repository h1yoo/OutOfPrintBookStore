import React from 'react';
import '../styled/PurchaseReqList.css';

const formatDate = (dateString) => {
  const dateStringAsStr = dateString.toString(); // int -> string

  const year = dateStringAsStr.slice(0, 4);
  const month = dateStringAsStr.slice(4, 6);
  const day = dateStringAsStr.slice(6, 8);

  return `${year}-${month}-${day}`;
};


const PurchaseReqListOngoing = ({ requests }) => {
  return (
    <div>
      {requests.map((request, index) => (
        <div className="sbk-purchase-req-card" key={index}>
          <img className="sbk-book-image" src={request.itemImg} alt={request.itemTitle} />
          <div className="sbk-text-container">
            <div className='sbk-main-container'>
              <h2 className="sbk-book-title">{request.itemTitle}</h2>
              <h2 className="sbk-book-info">{`${request.author} | ${request.publisher}`}</h2>

            </div>

            <div className='sbk-book-status'>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>도서상태</dt>
                <dd className='sbk-book-status-dd'>{request.damage}</dd>
              </dl>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>입찰가</dt>
                <dd className='sbk-book-status-dd'>{request.price}원</dd>
              </dl>
              <dl className='sbk-book-status-dl'>
                <dt className='sbk-book-status-dt'>입찰만료기한</dt>
                <dd className='sbk-book-status-dd' style={{ color: '#EB217C' }}>{formatDate(request.expiry)}</dd>
              </dl>
            </div>
          </div>


          <div className="sbk-button-container">
            <button className="sbk-status-button">현황 보기</button>
            <button className="sbk-cancel-button">상품등록 취소</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseReqListOngoing;