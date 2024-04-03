import React from 'react';
import {Link } from 'react-router-dom';
import '../styled/QuestSideView.css';

function QnASide() {
    return (
        <div className="cyj_qna_area">
                <h2 className="snb_main_title">고객센터</h2>
            <nav className="snb">
                <div className="snb_list">
                    <ul className="snb_menu">
                        {/* href 부분 이름 다 기획안 보고 수정하기 */}
                        <li className="menu_item">
                            <Link to="/QuestionForm" className="menu_link">QnA</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default QnASide;
