const db = require("../../database/db");

// 주문 생성 (Create)
exports.createOrder = (orderData) => {
  return new Promise((resolve, reject) => {
    const {
      itemSellKey,
      custKey,
      sellerKey,
      price,
      name,
      tel,
      postcode,
      addr,
      addrDetail,
      status,
      dateBuy,
    } = orderData;
    db.query(
      "INSERT INTO orders (itemSellKey, custKey, sellerKey, price, name, tel, postcode, addr, addrDetail, status, dateBuy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        itemSellKey,
        custKey,
        sellerKey,
        price,
        name,
        tel,
        postcode,
        addr,
        addrDetail,
        status,
        dateBuy,
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 모든 주문 조회 (Read)
exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM orders", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// 특정 사용자의 모든 주문 조회 (Read)
exports.getUserOrders = (custKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM orders WHERE custKey = ?",
      custKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 주문 날짜별 주문 수와 매출액 조회 (Read)
exports.getOrderSummaryByDate = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT 
        dateBuy AS orderDate, 
        COUNT(*) AS orderCount, 
        SUM(price) AS totalSales 
      FROM 
        orders 
      GROUP BY 
        dateBuy`,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 주문 업데이트 (Update)
exports.updateOrder = (itemKey, updatedOrderData) => {
  return new Promise((resolve, reject) => {
    const { price, name, tel, postcode, addr, addrDetail, status, dateBuy } =
      updatedOrderData;
    db.query(
      "UPDATE orders SET price = ?, name = ?, tel = ?, postcode = ?, addr = ?, addrDetail = ?, status = ?, dateBuy = ? WHERE itemKey = ?",
      [price, name, tel, postcode, addr, addrDetail, status, dateBuy, itemKey],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 주문 삭제 (Delete)
exports.deleteOrder = (itemKey) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM orders WHERE itemKey = ?", itemKey, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};




