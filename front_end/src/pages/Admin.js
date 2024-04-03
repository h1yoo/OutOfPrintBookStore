import BookEnroll from "../components/Admin/BookEnroll";
import Brief from "../components/Admin/Brief";
import Enquiry from "../components/Admin/Enquiry";
import UserInfo from "../components/Admin/UserInfo";
import logo from './Logo.png';
import '../styled/Admin.css';
// import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Admin() {
  return (
    <div className='jyh-container'>
      <header className='jyh-header'>
        <img src={logo} className="jyh-App-logo" alt="logo" />
        <a href='/' className='jyh-back-main'>돌아가기</a>
      </header>
      <div className='jyh-contents'>
        <p className='jyh-admintitle'>관리자 페이지</p>
        <Brief />
        <Enquiry />
        <UserInfo />
        <BookEnroll />
      </div>
    </div>
  )
}

export default Admin