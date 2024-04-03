// server.js

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const { error } = require("console");
const userRoutes = require("./routes/userRoutes");
const conn = require("./database/db.js");
const port = 3001; //포트번호 설정

app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// 세션 설정
app.use(
  session({
    // name:'sid', // 세션 이름
    secret: "mySecretKey", // 세션을 암호화하기 위한 비밀키
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS를 통해서만 쿠키 전송
      maxAge: 1000 * 60 * 60 * 24, // 세션의 유효기간 (예: 1일)
    },
  })
);

// user 라우트 연결
app.use("/api", userRoutes);

// ========================= customers ================================//
// 모든 회원 조회
app.get("/customers", (req, res) => {
  const sql = "select * from customers";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

//특정 회원 조회
app.get("/customers/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = `SELECT * FROM customers WHERE custKey = ${custKey}`;
  conn.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json(results[0]); // 첫 번째 고객 정보 반환
      }
    }
  });
});
//특정 회원 업데이트
app.put("/updateCustomers/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const updatedCustomerData = req.body;

  const {
    userid,
    email,
    userpwd,
    nickname,
    age,
    gender,
    contact,
    grade,
    point,
  } = updatedCustomerData;

  const sql = `
    UPDATE customers
    SET userid = ?,
        email = ?,
        userpwd = ?,
        nickname = ?,
        age = ?,
        gender = ?,
        contact = ?,
        grade = ?,
        point = ?
    WHERE custKey = ?
  `;

  conn.query(
    sql,
    [
      userid,
      email,
      userpwd,
      nickname,
      age,
      gender,
      contact,
      grade,
      point,
      custKey,
    ],
    (error, result) => {
      if (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Customer not found" });
        } else {
          res.json({ message: "Customer updated successfully" });
        }
      }
    }
  );
});
// ========================= customers ================================//

// ========================= buyers ================================//
// 책 구매 희망 추가
app.post("/buyerbook", (req, res) => {
  const { custKey, itemTitle, author, publisher, itemImg, expiry } = req.body;
  const sql =
    "INSERT INTO buyerBook (custKey, itemTitle, author, publisher, itemImg, expiry) VALUES (?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [custKey, itemTitle, author, publisher, itemImg, expiry],
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "책 구매 희망이 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 구매 희망 도서 조회 (Read)
app.get("/buyerbook", (req, res) => {
  const sql = "select * from buyerbook";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 사용자의 구매 희망 도서 조회 (Read)
app.get("/buyerbook/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = `SELECT * FROM buyerbook WHERE custKey = ${custKey}`;
  conn.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching customer:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        res.json(results); 
      }
    }
  });
});
// 책 구매 희망 수정
app.put("/buyerbook/:itemBuyKey", (req, res) => {
  const itemBuyKey = req.params.itemBuyKey;
  const { itemTitle, author, publisher, itemImg, expiry, aucStatus } = req.body;
  const sql =
    "UPDATE buyerBook SET itemTitle = ?, author = ?, publisher = ?, itemImg = ?, expiry = ?, aucStatus = ? WHERE itemBuyKey = ?";
  conn.query(
    sql,
    [itemTitle, author, publisher, itemImg, expiry, aucStatus, itemBuyKey],
    (error, result) => {
      if (error) return res.json(error);
      if (result.affectedRows === 0) {
        return res.json({ message: "해당 책 구매 희망이 없습니다." });
      }
      return res.json({
        message: "책 구매 희망이 수정되었습니다.",
        id: itemBuyKey,
      });
    }
  );
});

// 책 구매 희망 삭제
app.delete("/buyerbook/:itemBuyKey", (req, res) => {
  const itemBuyKey = req.params.itemBuyKey;
  const sql = "DELETE FROM buyerBook WHERE itemBuyKey = ?";
  conn.query(sql, [itemBuyKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 책 구매 희망이 없습니다." });
    }
    return res.json({
      message: "책 구매 희망이 삭제되었습니다.",
      id: itemBuyKey,
    });
  });
});

// ========================= buyers ================================//

// ========================= seller ================================//
// 판매 희망 책 추가
app.post("/sellerbook", (req, res) => {
  const { itemBuyKey, custKey, sellerKey, damage, dateEnroll, price } =
    req.body;
  const sql =
    "INSERT INTO SellerBook (itemBuyKey, custKey, sellerKey, damage, dateEnroll, price) VALUES (?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [itemBuyKey, custKey, sellerKey, damage, dateEnroll, price],
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "판매 희망 책이 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 판매 희망 책 조회
app.get("/sellerbook", (req, res) => {
  const sql = "select * from Sellerbook";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 판매자의 판매 희망 책 조회
app.get("/sellerbook/seller/:sellerKey", (req, res) => {
  const sellerKey = req.params.sellerKey;
  const sql = "SELECT * FROM SellerBook WHERE sellerKey = ?";
  conn.query(sql, [sellerKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 구매자의 구매 희망 책에 대한 판매 희망 책 조회
app.get("/sellerbook/buyer/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = "SELECT * FROM SellerBook WHERE custKey = ?";
  conn.query(sql, [custKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 판매 희망 책 수정
app.put("/sellerbook/:itemSellKey", (req, res) => {
  const itemSellKey = req.params.itemSellKey;
  const { itemBuyKey, custKey, sellerKey, damage, dateEnroll, price } =
    req.body;
  const sql =
    "UPDATE SellerBook SET itemBuyKey = ?, custKey = ?, sellerKey = ?, damage = ?, dateEnroll = ?, price = ? WHERE itemSellKey = ?";
  conn.query(
    sql,
    [itemBuyKey, custKey, sellerKey, damage, dateEnroll, price, itemSellKey],
    (error, result) => {
      if (error) return res.json(error);
      if (result.affectedRows === 0) {
        return res.json({ message: "해당 판매 희망 책이 없습니다." });
      }
      return res.json({
        message: "판매 희망 책이 수정되었습니다.",
        id: itemSellKey,
      });
    }
  );
});

// 판매 희망 책 삭제
app.delete("/sellerbook/:itemSellKey", (req, res) => {
  const itemSellKey = req.params.itemSellKey;
  const sql = "DELETE FROM SellerBook WHERE itemSellKey = ?";
  conn.query(sql, [itemSellKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 판매 희망 책이 없습니다." });
    }
    return res.json({
      message: "판매 희망 책이 삭제되었습니다.",
      id: itemSellKey,
    });
  });
});

// ========================= seller ================================//

// ========================= address ================================//
// 주소 추가
app.post("/address", (req, res) => {
  const { custKey, name, tel, postcode, addr, addrDetail, defaultAddr } =
    req.body;
  const sql =
    "INSERT INTO address (custKey, name, tel, postcode, addr, addrDetail, defaultAddr) VALUES (?, ?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [custKey, name, tel, postcode, addr, addrDetail, defaultAddr],
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "주소가 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 주소 조회
app.get("/address", (req, res) => {
  const sql = "select * from address";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});
// 특정 고객의 주소 조회
app.get("/address/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = "SELECT * FROM address WHERE custKey = ?";
  conn.query(sql, [custKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 주소 수정
app.put("/address/:addrKey", (req, res) => {
  const addrKey = req.params.addrKey;
  const { custKey, name, tel, postcode, addr, addrDetail, defaultAddr } =
    req.body;
  const sql =
    "UPDATE address SET custKey = ?, name = ?, tel = ?, postcode = ?, addr = ?, addrDetail = ?, defaultAddr = ? WHERE addrKey = ?";
  conn.query(
    sql,
    [custKey, name, tel, postcode, addr, addrDetail, defaultAddr, addrKey],
    (error, result) => {
      if (error) return res.json(error);
      if (result.affectedRows === 0) {
        return res.json({ message: "해당 주소가 없습니다." });
      }
      return res.json({ message: "주소가 수정되었습니다.", id: addrKey });
    }
  );
});

// 주소 삭제
app.delete("/address/:addrKey", (req, res) => {
  const addrKey = req.params.addrKey;
  const sql = "DELETE FROM address WHERE addrKey = ?";
  conn.query(sql, [addrKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 주소가 없습니다." });
    }
    return res.json({ message: "주소가 삭제되었습니다.", id: addrKey });
  });
});

// ========================= address ================================//

// ========================= enquiry ================================//
// 문의 추가
app.post("/enquiries", (req, res) => {
  const { custKey, dateEnquiry, boardTitle, enquiry } = req.body;
  const sql =
    "INSERT INTO enquiry (custKey, dateEnquiry, boardTitle, Enquiry) VALUES (?, ?, ?, ?)";
  conn.query(
    sql,
    [custKey, dateEnquiry, boardTitle, enquiry],
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "문의가 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 문의 조회
app.get("/enquiries", (req, res) => {
  const sql = "select * from enquiry";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 문의 수정
app.put("/enquiries/:boardKey", (req, res) => {
  const boardKey = req.params.boardKey;
  const { custKey, dateEnquiry, boardTitle, enquiry } = req.body;
  const sql =
    "UPDATE enquiry SET custKey = ?, dateEnquiry = ?, boardTitle = ?, Enquiry = ? WHERE boardKey = ?";
  conn.query(
    sql,
    [custKey, dateEnquiry, boardTitle, enquiry, boardKey],
    (error, result) => {
      if (error) return res.json(error);
      if (result.affectedRows === 0) {
        return res.json({ message: "해당 문의가 없습니다." });
      }
      return res.json({ message: "문의가 수정되었습니다.", id: boardKey });
    }
  );
});

// 문의 삭제
app.delete("/enquiries/:boardKey", (req, res) => {
  const boardKey = req.params.boardKey;
  const sql = "DELETE FROM enquiry WHERE boardKey = ?";
  conn.query(sql, [boardKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 문의가 없습니다." });
    }
    return res.json({ message: "문의가 삭제되었습니다.", id: boardKey });
  });
});

// ========================= enquiry ================================//

// ========================= order ================================//
// 주문 추가
app.post("/orders", (req, res) => {
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
  } = req.body;
  const sql =
    "INSERT INTO orders (itemSellKey, custKey, sellerKey, price, name, tel, postcode, addr, addrDetail, status, dateBuy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
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
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "주문이 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 주문 조회
app.get("/orders", (req, res) => {
  const sql = "select * from orders";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 날짜별 주문 요약
app.get('/orders/summary', (req, res) => {
  const sql = `
    SELECT
      DATE_FORMAT(dateBuy, '%Y-%m-%d') AS date,
      COUNT(*) AS orderCount,
      SUM(price) AS totalSales
    FROM
      orders
    GROUP BY
      dateBuy
    ORDER BY
      dateBuy DESC
  `;

  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 구매자의 주문 조회
app.get("/orders/customer/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = "SELECT * FROM orders WHERE custKey = ?";
  conn.query(sql, [custKey], (error, data) => {
    if (error) return res.json(error);  
    return res.json(data);
  });
});

// 특정 판매자의 주문 조회
app.get("/orders/seller/:sellerKey", (req, res) => {
  const sellerKey = req.params.sellerKey;
  const sql = "SELECT * FROM orders WHERE sellerKey = ?";
  conn.query(sql, [sellerKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 주문 삭제
app.delete("/orders/:itemKey", (req, res) => {
  const itemKey = req.params.itemKey;
  const sql = "DELETE FROM orders WHERE itemKey = ?";
  conn.query(sql, [itemKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 주문이 없습니다." });
    }
    return res.json({ message: "주문이 삭제되었습니다.", id: itemKey });
  });
});

// ========================= order ================================//
// ========================= review ================================//
// 리뷰 추가
app.post("/reviews", (req, res) => {
  const { itemKey, custKey, sellerKey, satisfaction, repurchase, review } =
    req.body;
  const sql =
    "INSERT INTO review (itemKey, custKey, sellerKey, satisfaction, repurchase, review) VALUES (?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [itemKey, custKey, sellerKey, satisfaction, repurchase, review],
    (error, result) => {
      if (error) return res.json(error);
      return res.json({
        message: "리뷰가 추가되었습니다.",
        id: result.insertId,
      });
    }
  );
});

// 모든 리뷰 조회
app.get("/review", (req, res) => {
  const sql = "select * from review";
  conn.query(sql, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 상품의 리뷰 조회
app.get("/reviews/item/:itemKey", (req, res) => {
  const itemKey = req.params.itemKey;
  const sql = "SELECT * FROM review WHERE itemKey = ?";
  conn.query(sql, [itemKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});
// 특정 구매자의 리뷰 조회
app.get("/reviews/customer/:custKey", (req, res) => {
  const custKey = req.params.custKey;
  const sql = "SELECT * FROM review WHERE custKey = ?";
  conn.query(sql, [custKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 특정 판매자의 리뷰 조회
app.get("/reviews/seller/:sellerKey", (req, res) => {
  const sellerKey = req.params.sellerKey;
  const sql = "SELECT * FROM review WHERE sellerKey = ?";
  conn.query(sql, [sellerKey], (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

// 리뷰 삭제
app.delete("/reviews/:reviewKey", (req, res) => {
  const reviewKey = req.params.reviewKey;
  const sql = "DELETE FROM review WHERE reviewKey = ?";
  conn.query(sql, [reviewKey], (error, result) => {
    if (error) return res.json(error);
    if (result.affectedRows === 0) {
      return res.json({ message: "해당 리뷰가 없습니다." });
    }
    return res.json({ message: "리뷰가 삭제되었습니다.", id: reviewKey });
  });
});

// ========================= review ================================//

// ========================= reply ================================//
// enquiry.js에서 받은 문의답글 서버에 저장
app.post("/reply", (req, res) => {
  const { boardKey, reply } = req.body;
  const adminKey = 1; // 관리자키 임의로 1로 지정
  
  // reply 테이블에 새로운 답글을 추가
  const sql = `INSERT INTO reply (boardKey, adminKey, reply) VALUES (?, ?, ?)`;
  conn.query(sql, [boardKey, adminKey, reply], (error, results) => {
    if (error) {
      console.error("Error submitting reply:", error);
      res.status(500).json({ error: "server error" });
    } else {
      res.status(200).json({ message: "성공적으로 답글을 추가했습니다." });
    }
  });
});

app.delete("/reply/:replyKey", (req, res) => {
  const replyKey = req.params.replyKey;

  // replyKey에 해당하는 답글을 삭제합니다.
  const sql = "DELETE FROM reply WHERE replyKey = ?";
  conn.query(sql, [replyKey], (error, result) => {
    if (error) {
      console.error("Error deleting reply:", error);
      return res.status(500).json({ error: "서버 오류" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "해당 답글을 찾을 수 없습니다." });
    }
    return res
      .status(200)
      .json({ message: "답글이 성공적으로 삭제되었습니다." });
  });
});

// ========================= reply ================================//

app.listen(port, () => {
  console.log(` ${port}번 포트에서 서버 실행중`);
});
