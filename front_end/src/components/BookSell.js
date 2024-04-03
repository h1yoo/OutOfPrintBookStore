import React, { useState, useEffect } from 'react';
import '../styled/BookStateCategory.css';

function BookSell({ onSelect, requests }) {
  const [selectedTab, setSelectedTab] = useState('진행중');
  const [ongoingCount, setOngoingCount] = useState(0);
  const [biddingCount, setBiddingCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);

  useEffect(() => {
    setSelectedTab('진행중'); 
    updateCounts(); 
  }, []); 
  useEffect(() => {
    updateCounts();
  }, [requests]);
  const updateCounts = () => {
    const ongoing = requests.filter(request => request.aucStatus === 2).length;
    const bidding = requests.filter(request => request.aucStatus === 1).length;
    const expired = requests.filter(request => request.aucStatus === 3).length;
    setOngoingCount(ongoing);
    setBiddingCount(bidding);
    setExpiredCount(expired);
  };

  const handleClick = (tab) => {
    setSelectedTab(tab);
    onSelect(tab);
  };

  return (
    <div className="cyj_book-category">
      <div className="tab">
        <button
          className='tabslink'
          onClick={() => {
            handleClick('진행중');
            updateCounts();
          }}
        >
          <span className={`active-count ${selectedTab === '진행중' ? 'active' : ''}`}>{ongoingCount}</span><br />
          진행중
        </button>
        <button
          className='tabslink'
          onClick={() => {
            handleClick('낙찰');
            updateCounts();
          }}
        >
          <span className={`active-count ${selectedTab === '낙찰' ? 'active' : ''}`}>{biddingCount}</span><br />
          낙찰
        </button>
        <button
          className='tabslink'
          onClick={() => {
            handleClick('기한만료');
            updateCounts();
          }}
        >
          <span className={`active-count ${selectedTab === '기한만료' ? 'active' : ''}`}>{expiredCount}</span><br />
          기한만료
        </button>
      </div>
    </div>
  );
}

export default BookSell;
