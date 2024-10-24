// // npm install react-icons --save
// import { IoIosMenu } from "react-icons/io";
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import '../../styles/AuthButton/AuthButton.css';


// const AuthButton = ({ scrollToTop }) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn');
//   const navigate = useNavigate();
//   const [isDropdownVisible, setDropdownVisible] = useState(false);

//   useEffect(() => {
//     setDropdownVisible(false);
//   }, [isLoggedIn]);

//   const handleLogout = () => {
//     // 로그아웃 처리: 로컬 스토리지에서 로그인 상태 제거
//     localStorage.removeItem('isLoggedIn');
//     navigate("/"); // 로그아웃 시 메인 페이지로
//   };

//   const GoToMyPage = () => {
//     navigate("MyPage");
//   }

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   };

//   return (
//     <div className="auth-button f_flex">
//       {isLoggedIn ? (
//         <>
//           <div>
//             <button onClick={toggleDropdown} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
//               <IoIosMenu size={35} color="black" />
//             </button>
//           </div>
//           {isDropdownVisible && (
//             <div className="dropdown-menu">
//               <button onClick={GoToMyPage}>마이 페이지</button>
//               {/* <button onClick={toggleDropdown}>내 상품</button> */}
//               {/* <button onClick={toggleDropdown}>찜 상품</button> */}
//               <button onClick={handleLogout}>로그아웃</button>
//             </div>
//           )}
//         </>
//       ) : (
//         <>
//           {/* 로그인 유지 상태가 아닐 때는 회원가입과 로그인 버튼 */}
//           <Link to="/auth">로그인/회원가입</Link>
//         </>
//       )}
//     </div>
//   );
// };

// export default AuthButton;






















//npm install react-icons --save
// import { IoIosMenu } from "react-icons/io";
// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import '../../styles/AuthButton/AuthButton.css';

// const AuthButton = ({ scrollToTop }) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn');
//   const navigate = useNavigate();
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     setDropdownVisible(false);
//   }, [isLoggedIn]);

//   useEffect(() => {
//     // Function to handle clicks outside the dropdown
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownVisible(false);
//       }
//     };

//     // If the dropdown is visible, add the event listener
//     if (isDropdownVisible) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     // Cleanup the event listener on component unmount
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isDropdownVisible]);

//   const handleLogout = () => {
//     // 로그아웃 처리: 로컬 스토리지에서 로그인 상태 제거
//     localStorage.removeItem('isLoggedIn');
//     navigate("/"); // 로그아웃 시 메인 페이지로
//   };

//   const GoToMyPage = () => {
//     navigate("/MyPage"); // Ensure the path starts with '/'
//     setDropdownVisible(false); // Optionally close the dropdown after navigation
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible((prev) => !prev);
//   };

//   return (
//     <div className="auth-button f_flex" ref={dropdownRef}>
//       {isLoggedIn ? (
//         <>
//           <div>
//             <button
//               onClick={toggleDropdown}
//               style={{ background: 'none', border: 'none', cursor: 'pointer' }}
//               aria-label="Menu"
//             >
//               <IoIosMenu size={35} color="black" />
//             </button>
//           </div>
//           {isDropdownVisible && (
//             <div className="dropdown-menu">
//               <button onClick={GoToMyPage}>마이 페이지</button>
//               <button onClick={() => { /* Implement navigation or functionality */ setDropdownVisible(false); }}>내 상품</button>
//               <button onClick={() => { /* Implement navigation or functionality */ setDropdownVisible(false); }}>찜 상품</button>
//               <button onClick={handleLogout}>로그아웃</button>
//             </div>
//           )}
//         </>
//       ) : (
//         <>
//           {/* 로그인 유지 상태가 아닐 때는 회원가입과 로그인 버튼 */}
//           <Link to="/auth">로그인/회원가입</Link>
//         </>
//       )}
//     </div>
//   );
// };

// export default AuthButton;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/AuthButton/AuthButton.css';

// const AuthButton = ({ scrollToTop }) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // 로그아웃 처리: 로컬 스토리지에서 로그인 상태 제거
//     localStorage.removeItem('isLoggedIn');
//     navigate("/"); // 로그아웃 시 메인 페이지로
//   };

//   const GoToMyPage = () => {
//     navigate("/MyPage"); // Ensure the path starts with '/MyPage'
//   };

//   return (
//     <div className="auth-button f_flex">
//       {isLoggedIn ? (
//         <>
//           {/* 로그인 상태일 때 마이페이지와 로그아웃 버튼 */}
//           <button onClick={GoToMyPage} className="btn">마이페이지</button>
//           <button onClick={handleLogout} className="btn">로그아웃</button>
//         </>
//       ) : (
//         <>
//           {/* 비로그인 상태일 때 로그인/회원가입 버튼 */}
//           <Link to="/auth" className="btn">로그인/회원가입</Link>
//         </>
//       )}
//     </div>
//   );
// };

// export default AuthButton;
