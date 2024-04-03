CREATE DATABASE bookDB;


CREATE TABLE `customers` (
    `custKey` INT AUTO_INCREMENT PRIMARY KEY,
    `userid` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `userpwd` VARCHAR(150) NOT NULL,
    `nickname` VARCHAR(15) NOT NULL,
    `age` INT(3) NULL,
    `gender` CHAR NULL,
    `contact` VARCHAR(15) NULL COMMENT '구매희망도서 등록시에 사용',
    `grade` INT(2) NULL DEFAULT NULL,
    `point` DECIMAL(3,1) NULL DEFAULT 0 COMMENT '평균값(1등급:4~5점/2등급:3~4/3등급:2~3/4등급:1~2/5등급:0~1), 소수점 한자리까지 표시'
);

CREATE TABLE `address` (
    `addrKey` INT AUTO_INCREMENT,
    `custKey` INT NOT NULL,
    `name` VARCHAR(15) NOT NULL,
    `tel` VARCHAR(15) NOT NULL,
    `postcode` VARCHAR(6) NOT NULL,
    `addr` VARCHAR(300) NOT NULL,
    `addrDetail` VARCHAR(100) NOT NULL,
    `defaultAddr` CHAR NULL DEFAULT 'N',
    PRIMARY KEY (`addrKey`, `custKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`)
);

CREATE TABLE `buyerBook` (
    `itemBuyKey` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'PK(구매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `itemTitle` VARCHAR(30) NOT NULL,
    `author` VARCHAR(20) NOT NULL,
    `publisher` VARCHAR(20) NOT NULL,
    `itemImg` VARCHAR(600) NULL COMMENT 'NOT NULL 값이지만 테스트를 위해 NULL로 설정 -- 추후 변경',
    `expiry` INT NOT NULL,
    `aucStatus` INT NOT NULL DEFAULT 0 COMMENT '낙찰(1)//진행중(2)/기한만료(3)/취소(삭제)',
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`)
);

ALTER TABLE `buyerbook` ADD COLUMN dateBuyerBook DATE NOT NULL;
-- date에 자동으로 오늘 날짜로 채우기
CREATE TRIGGER set_default_date_buyerBook BEFORE INSERT ON buyerBook
FOR EACH ROW
BEGIN
    IF NEW.dateBuyerBook IS NULL THEN
        SET NEW.dateBuyerBook = CURDATE();
    END IF;
END;

CREATE TABLE `SellerBook` (
    `itemSellKey` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'PK(판매희망도서)',
    `itemBuyKey` INT NOT NULL COMMENT 'FK(구매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `sellerKey` INT NOT NULL COMMENT '판매자',
    `damage` INT NOT NULL COMMENT '체크리스트 갯수별 등급 (0:최상, 1:상, 2-3:중)',
    `dateEnroll` DATE NOT NULL,
    `price` INT(8) NOT NULL COMMENT '판매희망가',
    FOREIGN KEY (`itemBuyKey`) REFERENCES `buyerBook` (`itemBuyKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`),
    FOREIGN KEY (`sellerKey`) REFERENCES `customers` (`custKey`)
);

-- date에 자동으로 오늘 날짜로 채우기
CREATE TRIGGER set_default_date_SellerBook BEFORE INSERT ON SellerBook
FOR EACH ROW
BEGIN
    IF NEW.dateEnroll IS NULL THEN
        SET NEW.dateEnroll = CURDATE();
    END IF;
END;

CREATE TABLE `orders` (
    `itemKey` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'PK(주문고유번호)',
    `itemSellKey` INT NOT NULL COMMENT 'FK(판매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `sellerKey` INT NOT NULL COMMENT '판매자',
    `price` VARCHAR(10) NOT NULL,
    `name` VARCHAR(15) NOT NULL,
    `tel` VARCHAR(15) NOT NULL,
    `postcode` VARCHAR(6) NOT NULL,
    `addr` VARCHAR(300) NOT NULL,
    `addrDetail` VARCHAR(100) NOT NULL,
    `status` INT NULL COMMENT '진행중:1, 낙찰:2, 입찰마감:3',
    `dateBuy` DATE NOT NULL COMMENT '구매일자',
    FOREIGN KEY (`itemSellKey`) REFERENCES `SellerBook` (`itemSellKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`),
    FOREIGN KEY (`sellerKey`) REFERENCES `SellerBook` (`sellerKey`)
);

-- date에 자동으로 오늘 날짜로 채우기
CREATE TRIGGER set_default_date_orders BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    IF NEW.dateBuy IS NULL THEN
        SET NEW.dateBuy = CURDATE();
    END IF;
END;

CREATE TABLE `enquiry` (
    `boardKey` INT AUTO_INCREMENT PRIMARY KEY,
    `custKey` INT NOT NULL,
    `dateEnquiry` DATE NOT NULL,
    `boardTitle` VARCHAR(100) NOT NULL,
    `Enquiry` TEXT NOT NULL,
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`)
);


-- date에 자동으로 오늘 날짜로 채우기
CREATE TRIGGER set_default_date_enquiry BEFORE INSERT ON enquiry
FOR EACH ROW
BEGIN
    IF NEW.dateEnquiry IS NULL THEN
        SET NEW.dateEnquiry = CURDATE();
    END IF;
END;

CREATE TABLE `admin` (
    `adminKey` INT AUTO_INCREMENT PRIMARY KEY,
    `userid` VARCHAR(15) NOT NULL,
    `username` VARCHAR(15) NOT NULL,
    `userpwd` VARCHAR(150) NOT NULL
);


CREATE TABLE `review` (
    `reviewKey` INT AUTO_INCREMENT PRIMARY KEY,
    `itemKey` INT NOT NULL COMMENT 'FK(주문)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `sellerKey` INT NOT NULL COMMENT '판매자',
    `satisfaction` INT NOT NULL COMMENT '1~5점',
    `repurchase` INT NOT NULL COMMENT 'No : 2점, Yes : 4점 택1',
    `review` TEXT NULL,
    FOREIGN KEY (`itemKey`) REFERENCES `orders` (`itemKey`),
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`),
    FOREIGN KEY (`sellerKey`) REFERENCES `customers` (`custKey`)
);

CREATE TABLE `reply` (
    `replayKey` INT AUTO_INCREMENT PRIMARY KEY,
    `boardKey` INT NOT NULL,
    `adminKey` INT NOT NULL,
    `dateReply` DATE NOT NULL,
    `reply` TEXT NOT NULL,
    FOREIGN KEY (`boardKey`) REFERENCES `enquiry` (`boardKey`),
    FOREIGN KEY (`adminKey`) REFERENCES `admin` (`adminKey`)
);

-- date에 자동으로 오늘 날짜로 채우기
CREATE TRIGGER set_default_date_reply BEFORE INSERT ON reply
FOR EACH ROW
BEGIN
    IF NEW.dateReply IS NULL THEN
        SET NEW.dateReply = CURDATE();
    END IF;
END;


/* --------------------------------------------------------------------- */
/* INSERT INTO SellerBook (itemBuyKey, custKey, sellerKey, damage, price)
VALUES (4, 4, 4, 0, 15000); */


ALTER TABLE buyerBook
MODIFY COLUMN aucStatus INT DEFAULT 2,
MODIFY COLUMN itemImg VARCHAR(255) DEFAULT 'img/book.png';

