import React, { useState } from "react";
import "../styled/FormView.css";
import "../styled/PurchaseHistory.css";
import QuestSide from "../components/QuestSide";
import Header from "../components/Header";
import Footer from "../components/Footer";

function QuestionItem({ question, index }) {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div className="question-item">
      <div className="question-header" onClick={toggleContent}>
        <span className="question-number">{index + 1}</span>
        <span className="question-title">{question.title}</span>
      </div>
      {showContent && (
        <div className="question-content">{question.content}</div>
      )}
    </div>
  );
}

function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      title: title,
      content: content,
    };
    setQuestions([...questions, newQuestion]);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <div className="height-container">
        <Header />

        <div className="yhw_container">
          <div className="yhw_purHistCont">
            <div className="yhw_MypageSideAdd">
              <div className="qna-page-sidebar">
                <QuestSide />
              </div>
            </div>
            <div className="yhw_purHistMainCont">
              <div className="Qna_home">
                {" "}
                {/* h1부터 끝까지 div로 묶어줌 */}
                <h2 className="qna_main_title">QnA</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="title">문의 제목:</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                    placeholder="제목을 입력하세요"
                  />
                  <br />
                  <label htmlFor="content">문의 내용:</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="input-field-view"
                    placeholder="내용을 입력하세요"
                  />
                  <br />
                  <button type="submit" className="submit-button">
                    등록하기
                  </button>
                </form>
                <div className="question-list">
                  <h2>등록된 문의</h2>
                  {questions.length === 0 ? (
                    <p>등록된 문의가 없습니다.</p>
                  ) : (
                    questions.map((question, index) => (
                      <QuestionItem
                        key={index}
                        question={question}
                        index={index}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default QuestionForm;
