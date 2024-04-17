CREATE DATABASE bookDB;

USE bookDB;

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
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `buyerBook` (
    `itemBuyKey` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'PK(구매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `itemTitle` VARCHAR(255) NOT NULL,
    `author` VARCHAR(20) NOT NULL,
    `publisher` VARCHAR(20) NOT NULL,
    `itemImg` VARCHAR(600) NULL COMMENT 'NOT NULL 값이지만 테스트를 위해 NULL로 설정 -- 추후 변경',
    `expiry` INT NOT NULL,
    `aucStatus` INT NOT NULL DEFAULT 0 COMMENT '낙찰(1)//진행중(2)/기한만료(3)/취소(삭제)',
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`) ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE `buyerBook`
ADD COLUMN `category` VARCHAR(20) NOT NULL;


ALTER TABLE `buyerbook` ADD COLUMN dateBuyerBook DATE NOT NULL;
-- date에 자동으로 오늘 날짜로 채우기
CREATE TRIGGER set_default_date_buyerBook BEFORE INSERT ON buyerBook
FOR EACH ROW
BEGIN
    IF NEW.dateBuyerBook IS NULL THEN
        SET NEW.dateBuyerBook = CURDATE();
    END IF;
END;

ALTER TABLE buyerBook
MODIFY COLUMN aucStatus INT DEFAULT 2,
MODIFY COLUMN itemImg VARCHAR(255) DEFAULT 'img/book.png';

CREATE TABLE `SellerBook` (
    `itemSellKey` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'PK(판매희망도서)',
    `itemBuyKey` INT NOT NULL COMMENT 'FK(구매희망도서)',
    `custKey` INT NOT NULL COMMENT '구매자',
    `sellerKey` INT NOT NULL COMMENT '판매자',
    `damage` INT NOT NULL COMMENT '체크리스트 갯수별 등급 (0:최상, 1:상, 2-3:중)',
    `dateEnroll` DATE NOT NULL,
    `price` INT(8) NOT NULL COMMENT '판매희망가',
    FOREIGN KEY (`itemBuyKey`) REFERENCES `buyerBook` (`itemBuyKey`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`sellerKey`) REFERENCES `customers` (`custKey`) ON DELETE CASCADE ON UPDATE CASCADE
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
    FOREIGN KEY (`itemSellKey`) REFERENCES `SellerBook` (`itemSellKey`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`sellerKey`) REFERENCES `SellerBook` (`sellerKey`) ON DELETE CASCADE ON UPDATE CASCADE
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
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`) ON DELETE CASCADE ON UPDATE CASCADE
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
    FOREIGN KEY (`itemKey`) REFERENCES `orders` (`itemKey`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`custKey`) REFERENCES `customers` (`custKey`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`sellerKey`) REFERENCES `customers` (`custKey`) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE review ADD CONSTRAINT unique_itemKey UNIQUE (itemKey);

CREATE TABLE `reply` (
    `replyKey` INT AUTO_INCREMENT PRIMARY KEY,
    `boardKey` INT NOT NULL,
    `adminKey` INT NOT NULL,
    `dateReply` DATE NOT NULL,
    `reply` TEXT NOT NULL,
    FOREIGN KEY (`boardKey`) REFERENCES `enquiry` (`boardKey`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`adminKey`) REFERENCES `admin` (`adminKey`) ON DELETE CASCADE ON UPDATE CASCADE
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


INSERT INTO
    `admin`
VALUES (
        10, 'admin10', 'adminname10', '$2b$10$e5EByu5PX1wdNqA3IgqKv.8i/3wljlSjl.ExVOi9mQ3rICQ405h/6'
    );

INSERT INTO
    `customers`
VALUES (
        4, 'user4', 'user4@ex.com', '$2b$10$e5EByu5PX1wdNqA3IgqKv.8i/3wljlSjl.ExVOi9mQ3rICQ405h/6', 'nick4', 33, 'M', '010-1234-5678', 2, 3.5
    ),
    (
        5, 'user3', 'user3@ex.com', '$2b$10$hNgWXTuuZ.XSUzwkF8U7feSPXuVTJqHX87CQZVBRAMfVxhtAdrmGK', 'nick3', 22, 'M', '010-2222-3333', 2, 4.3
    );

INSERT INTO
    `address`
VALUES (
        4, 4, '김이름', '010-1234-5678', '12345', '123길', '101', 'Y'
    ),
    (
        5, 5, '박이름', '010-9876-5432', '54321', '456길', '202', 'Y'
    );

INSERT INTO
    `enquiry`
VALUES (
        1, 4, '2024-04-05', '문의제목1', '문의내용1'
    ),
    (
        2, 5, '2024-04-05', '문의제목2', '문의내용2.'
    ),
    (
        3, 4, '2024-04-09', '상품등록문의', '상품등록문의내용\n'
    );
    
INSERT INTO
    `buyerbook`
VALUES (
        46, 5, '수박 수영장 (안녕달 그림책)', '안녕달', '창비', 'https://shopping-phinf.pstatic.net/main_3249143/32491438189.20230808084231.jpg', 20240413, 1, 'comics', '2024-04-10'
    ),
    (
        48, 4, '겨울 이불 (안녕달 그림책)', '안녕달', '창비', 'https://shopping-phinf.pstatic.net/main_3662594/36625941619.20221229072120.jpg', 20240415, 2, 'novels', '2024-04-10'
    ),
    (
        49, 4, '음악아 음악아 나 좀 도와줘 (예체능 영역)', '정수은', '삼성당', 'https://shopping-phinf.pstatic.net/main_3248935/32489353759.20230920071308.jpg', 20240508, 2, 'arts', '2024-04-10'
    ),
    (
        50, 4, '이기적 유전자 (40주년 기념판)', '리처드 도킨스', '을유문화사', 'https://shopping-phinf.pstatic.net/main_3247303/32473030836.20231003084536.jpg', 20240607, 2, 'science', '2024-04-10'
    ),
    (
        51, 4, '삶을 견디는 기쁨 (힘든 시절에 벗에게 보내는 편지)', '헤르만헤세', '문예춘추사', 'https://shopping-phinf.pstatic.net/main_4580501/45805019619.20240214090900.jpg', 20240409, 3, 'essays', '2024-04-10'
    ),
    (
        52, 4, '도시와 그 불확실한 벽 (무라카미 하루키 장편소설)', '무라카미 하루키', '문학동네', 'https://shopping-phinf.pstatic.net/main_4229259/42292599622.20231004072421.jpg', 20240508, 2, 'novels', '2024-04-10'
    ),
    (
        53, 4, '월가의 영웅 (주식투자에서 상식으로 성공하는 법)', '피터 린치^존 로스차일드', '국일증권경제연구소', 'https://shopping-phinf.pstatic.net/main_3244164/32441644686.20230926084725.jpg', 20240607, 2, 'economics', '2024-04-10'
    ),
    (
        54, 4, '달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)', '이미예', '팩토리나인', 'https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230919131741.jpg', 20240415, 2, 'novels', '2024-04-10'
    ),
    (
        55, 5, '일론 머스크', '월터 아이작슨', '21세기북스', 'https://shopping-phinf.pstatic.net/main_4218930/42189304618.20230926084740.jpg', 20240415, 2, 'economics', '2024-04-10'
    ),
    (
        56, 5, '8월에 만나요 (가브리엘 가르시아 마르케스 소설)', '가브리엘 가르시아 마르케스', '민음사', 'https://shopping-phinf.pstatic.net/main_4620194/46201948627.20240306154317.jpg', 20240415, 2, 'novels', '2024-04-10'
    ),
    (
        57, 5, '해리 포터와 저주받은 아이: 2부 (연극대본)', '조앤 K. 롤링^잭 손^존 티퍼니', '문학수첩', 'https://shopping-phinf.pstatic.net/main_4520844/45208446627.20240114070831.jpg', 20240607, 1, 'novels', '2024-04-10'
    ),
    (
        58, 5, '코스모스', '칼 세이건', '사이언스북스', 'https://shopping-phinf.pstatic.net/main_3244093/32440939630.20240113070850.jpg', 20240607, 2, 'science', '2024-04-10'
    ),
    (
        59, 5, '대학 지구과학개론', '한국지구과학회 교재편찬위원회^조규성', '북스힐', 'https://shopping-phinf.pstatic.net/main_4619779/46197799626.20240306154322.jpg', 20240607, 2, 'science', '2024-04-10'
    ),
    (
        60, 5, '김락희의 선화 드로잉 vol 1', '김락희', '성안당', 'https://shopping-phinf.pstatic.net/main_4064132/40641325638.20231004072501.jpg', 20240508, 2, 'arts', '2024-04-10'
    ),
    (
        61, 5, '최재천의 곤충사회', '최재천', '열림원', 'https://shopping-phinf.pstatic.net/main_4572252/45722522627.20240210070910.jpg', 20240409, 3, 'essays', '2024-04-10'
    ),
    (
        62, 4, '여름이 온다', '이수지', '비룡소', 'https://shopping-phinf.pstatic.net/main_3246414/32464145250.20230801120731.jpg', 20240409, 3, 'novels', '2024-04-10'
    ),
    (
        63, 4, '천자문 (초등학생이 꼭 알아야 할)', '아이템북스 편집부', '아이템북스', 'https://shopping-phinf.pstatic.net/main_3246750/32467506660.20230926084858.jpg', 20240407, 3, 'comics', '2024-04-10'
    );


INSERT INTO
    `sellerbook`
VALUES (
        8, 49, 4, 5, 0, '2024-04-05', 13000
    ),
    (
        12, 51, 4, 5, 0, '2024-04-09', 8000
    ),
    (
        13, 52, 4, 5, 0, '2024-04-05', 11000
    ),
    (
        14, 46, 5, 4, 2, '2024-04-05', 5000
    ),
    (
        15, 57, 5, 4, 2, '2024-04-08', 8500
    ),
    (
        17, 59, 4, 5, 1, '2024-04-08', 8500
    ),
    (
        18, 60, 4, 5, 1, '2024-04-08', 8500
    );

INSERT INTO
    `orders`
VALUES (
        8, 8, 4, 5, '6000', 'q', '01012345678', '2', ',', 'd', 2, '2024-04-05'
    ),
    (
        11, 12, 4, 5, '8000', 'g', '0102345678', '3', '5', '6', 2, '2024-04-05'
    ),
    (
        12, 13, 4, 5, '11000', 'g', '0102345678', '4', '5', '6', 2, '2024-04-05'
    ),
    (
        13, 14, 5, 4, '5000', 'D', '0102345678', '7', '5', '5', 2, '2024-04-05'
    ),
    (
        14, 15, 5, 4, '8500', 'D', '0102345678', '8', '5', '5', 2, '2024-04-05'
    );

