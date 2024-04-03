const db = require("../../database/db");

// 답글 생성 (Create)
exports.createReply = (replyData) => {
  return new Promise((resolve, reject) => {
    const { boardKey, adminKey, reply } = replyData;
    db.query(
      "INSERT INTO reply (boardKey, adminKey, reply) VALUES (?, ?, ?)",
      [boardKey, adminKey, reply],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 모든 답글 조회 (Read)
exports.getAllReply = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM reply", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


// 답글 업데이트 (Update)
// exports.updateReply = (replyKey, updatedReplyData) => {
//   return new Promise((resolve, reject) => {
//     const { boardKey, adminKey, reply } = updatedReplyData;
//     db.query(
//       "UPDATE reply SET boardKey = ?, adminKey = ?, reply = ? WHERE replyKey = ?",
//       [boardKey, adminKey, reply],
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       }
//     );
//   });
// };

// 답글 삭제 (Delete)
exports.deleteReply = (replyKey) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM reply WHERE replyKey = ?",
      replyKey,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};