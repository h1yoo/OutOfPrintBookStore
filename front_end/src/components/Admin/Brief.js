import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styled/Admin.css';

function Brief() {
  const [orderSummary, setOrderSummary] = useState([]);

  useEffect(() => {
    fetchOrderSummary();
  }, []);

  const fetchOrderSummary = async () => {
    try {
      const response = await axios.get('http://localhost:3001/orders/summary');
      setOrderSummary(response.data);
    } catch (error) {
      console.error('Error fetching order summary:', error);
    }
  };

  return (
    <div className='jyh-table'>
      <p className='jyh-tb-title'>일자별 주문 요약(주문 승인건)</p>
      <table className='jyh-brief-table'>
        <thead>
          <tr>
            <th>일자</th>
            <th>주문수</th>
            <th>매출액</th>
          </tr>
        </thead>
        <tbody>
          {orderSummary.map((summary) => (
            <tr key={summary.date}>
              <td>{summary.date}</td>
              <td>{summary.orderCount}</td>
              <td>{summary.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Brief;