import React from 'react';
import '../styled/PurchaseReqList.css';

const PurchaseReqListEnd = ({ requests }) => {
  return (
    <div>
      {requests.map((request, index) => (
        <div className="sbk-purchase-req-card" key={index}>
          <img className="sbk-book-image" src={request.itemImg} alt={request.itemTitle} />
          <div className="sbk-text-container">
            <h2 className="sbk-book-title">{request.itemTitle}</h2>
            <h2 className="sbk-book-info">{`${request.author} | ${request.publisher}`}</h2>

          </div>

        </div>
      ))}
    </div>
  );
};

export default PurchaseReqListEnd;