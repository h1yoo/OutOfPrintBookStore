// userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user"); // 유저 컨트롤러 가져오기
const businessLogic = require("../models/userDB"); // 비지니스 로직
const admin = require("../models/adminUserDB"); // 비지니스 로직
const address = require("../models/address/addressDB");
const buyerBook = require("../models/buyerBook/buyerBookDB");
const enquiry = require("../models/enquiry/enquiryDB");
const orders = require("../models/orders/odersDB");
const review = require("../models/review/reviewDB");
const SellerBook = require("../models/SellerBook/SellerBookDB");
const customersDB = require("../models/customers/customersDB");

// ============= 회원가입 로그인 라우트 설정 =============//
router.post("/signup", userController.signup); // 회원가입 부분
router.post("/loginCheck", businessLogic.loginCheck); // 로그인 부분
router.post("/adminloginCheck", admin.adminloginCheck); // 어드민로그인 부분
router.post("/checkEmailDuplicate", businessLogic.checkEmailDuplicate); // 이메일 중복확인
router.post("/checkUserIdDuplicate", businessLogic.checkUserIdDuplicate); // 아이디 중복확인
router.post("/checkNicknameDuplicate", businessLogic.checkNicknameDuplicate); // 닉네임 중복확인
router.get("/logout", businessLogic.logout); // 로그아웃 부분
router.get("/checkSession", businessLogic.checkSession); // 세션체크 부분

// ============= 회원가입 로그인 라우트 설정 =============//

// ============= CRUD 라우트 설정 ============= //

// ======================= 주소 ==========================//
// 주소 생성
router.post("/createAddress", address.createAddress);
// 모든 주소 조회
router.get("/getAllAddresses", address.getAllAddresses);
// 특정 사용자의 모든 주소 조회
router.get("/getUserAddresses/:custKey", address.getUserAddresses);
// 주소 업데이트
router.put("/updateAddress/:addrKey", address.updateAddress);
// 주소 삭제
router.delete("/deleteAddress/:addrKey", address.deleteAddress);
// ======================= 주소 ==========================//

// ======================= 도서 희망 구매 ==========================//
// 구매 희망 도서 생성
router.post("/createBuyerBook", buyerBook.createBuyerBook);
// 모든 구매 희망 도서 조회
router.get("/getAllBuyerBooks", buyerBook.getAllBuyerBooks);
// 특정 사용자의 구매 희망 도서 조회
router.get("/getBuyerBooksByUser/:custKey", buyerBook.getBuyerBooksByUser);
// 구매 희망 도서 정보 업데이트
router.put("/updateBuyerBook/:itemBuyKey", buyerBook.updateBuyerBook);
// 구매 희망 도서 정보 삭제
router.delete("/deleteBuyerBook/:itemBuyKey", buyerBook.deleteBuyerBook);
// ======================= 도서 희망 구매 ==========================//

// ======================= 유저 ==========================//
// 모든 고객 조회
router.get("/getAllCustomers", customersDB.getAllCustomers);
// 특정 고객의 정보 조회
router.get("/getCustomerById/:custKey", customersDB.getCustomerById);
// 고객 정보 업데이트
router.put("/updateCustomer/:custKey", customersDB.updateCustomer);
// ======================= 유저 ==========================//

// ======================= 문의 ==========================//
// 문의 생성
router.post("/createEnquiry", enquiry.createEnquiry);
// 모든 문의 조회
router.get("/getAllEnquiries", enquiry.getAllEnquiries);
// 특정 사용자의 모든 문의 조회
router.get("/getUserEnquiries/:custKey", enquiry.getUserEnquiries);
// 문의 업데이트
router.put("/updateEnquiry/:boardKey", enquiry.updateEnquiry);
// 문의 삭제
router.delete("/deleteEnquiry/:boardKey", enquiry.deleteEnquiry);
// ======================= 문의 ==========================//

// ======================= 주문 ==========================//
// 주문 생성
router.post("/createOrder", orders.createOrder);
// 모든 주문 조회
router.get("/getAllOrders", orders.getAllOrders);
// 특정 사용자의 모든 주문 조회
router.get("/getUserOrders/:custKey", orders.getUserOrders);
// 날짜별 주문 조회
router.get("/getOrderSummaryByDate", orders.getOrderSummaryByDate)
// 주문 업데이트
router.put("/updateOrder/:itemKey", orders.updateOrder);
// 주문 삭제
router.delete("/deleteOrder/:itemKey", orders.deleteOrder);
// ======================= 주문 ==========================//

// ======================= 리뷰 ==========================//
// 리뷰 생성
router.post("/createReview", review.createReview);
// 모든 리뷰 조회
router.get("/getAllReviews", review.getAllReviews);
// 특정 사용자의 모든 리뷰 조회
router.get("/getUserReviews/:custKey", review.getUserReviews);
// 리뷰 업데이트
router.put("/updateReview/:reviewKey", review.updateReview);
// 리뷰 삭제
router.delete("/deleteReview/:reviewKey", review.deleteReview);
// ======================= 리뷰 ==========================//

// ======================= 판매도서 ==========================//
// 책 판매 정보 생성
router.post("/createSellerBook", SellerBook.createSellerBook);
// 모든 책 판매 정보 조회
router.get("/getAllSellerBooks", SellerBook.getAllSellerBooks);
// 특정 사용자의 판매 정보 조회
router.get("/getSellerBooksByUser/:custKey", SellerBook.getSellerBooksByUser);
// 책 판매 정보 업데이트
router.put("/updateSellerBook/:itemSellKey", SellerBook.updateSellerBook);
// 책 판매 정보 삭제
router.delete("/deleteSellerBook/:itemSellKey", SellerBook.deleteSellerBook);
// ======================= 판매도서 ==========================//

module.exports = router;
