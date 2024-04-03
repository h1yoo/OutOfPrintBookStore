import "./styled/App.css";
import { Routes, Route } from "react-router-dom";
import { LoginProvider } from "./components/LoginContext";
import Address from "./pages/Address";
import BuyDetail from "./pages/BuyDetail";
import CategoryBookList from "./pages/CategoryBookLIst";
import IDPWLogin from "./pages/IDPWLogin";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import Purchase from "./pages/Purchase";
import PurchaseHistory from "./pages/PurchaseHistory";
import RegRequest from "./pages/RegRequest";
import SalesHistory from "./pages/SalesHistory";
import SellerInfoPage from "./pages/SellerInfoPage";
import SignUpEasy from "./pages/SignUpEasy";
import SignUpMail from "./pages/SignUpMail";
import SNSLogin from "./pages/SNSLogin";
import Admin from "./pages/Admin";
import QuestionForm from "./pages/QuestionForm";
import AdminLogin from "./pages/AdminLogin";
import Profile from "./pages/Profile";
import PurchaseReview from "./pages/PurchaseReview";
import SellBook from "./pages/SellBook"
import XNotFound from "./pages/XNotFound";
import Rank from "./pages/Rank";
import ReviewCreate from "./pages/ReviewCreate";

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="Address" element={<Address />}></Route>
          <Route path="BuyDetail" element={<BuyDetail />}></Route>
          <Route path="CategoryBookList" element={<CategoryBookList />}></Route>
          <Route path="IDPWLogin" element={<IDPWLogin />}></Route>
          <Route path="AdminLogin" element={<AdminLogin />}></Route>
          <Route path="Mypage" element={<Mypage />}></Route>
          <Route path="Purchase" element={<Purchase />}></Route>
          <Route path="PurchaseHistory" element={<PurchaseHistory />}></Route>
          <Route path="RegRequest" element={<RegRequest />}></Route>
          <Route path="SalesHistory" element={<SalesHistory />}></Route>
          <Route path="SellerInfoPage" element={<SellerInfoPage />}></Route>
          <Route path="SignUpEasy" element={<SignUpEasy />}></Route>
          <Route path="SignUpMail" element={<SignUpMail />}></Route>
          <Route path="SNSLogin" element={<SNSLogin />}></Route>
          <Route path="Admin" element={<Admin />}></Route>
          <Route path="QuestionForm" element={<QuestionForm />}></Route>
          <Route path="Profile" element={<Profile />}></Route>
          <Route path="PurchaseReview" element={<PurchaseReview />}></Route>
          <Route path="SellBook" element={<SellBook />}></Route>
          <Route path="Rank" element={<Rank />}></Route>
          <Route path="ReviewCreate" element={<ReviewCreate />}></Route>
          <Route path="*" element={<XNotFound />}></Route>  {/* Not Found 페이지 */}          
        </Routes>
      </LoginProvider>
    </div>
  );
}

export default App;
