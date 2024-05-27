import React from 'react';


class MyPage extends React.Component {
  render() {
    return (
      <div>
        <h1>마이페이지</h1>
        <p>사용자 닉네임: {this.props.username}</p>
        <button onClick={this.handleProfileEdit}>프로필 설정</button>
        <button onClick={this.handleSalesHistory}>판매 내역</button>
        <button onClick={this.handlePurchaseHistory}>구매 내역</button>
        <button onClick={this.handleWishlist}>찜한 상품</button>
      </div>
    );
  }

  handleProfileEdit = () => {
    // 프로필 설정 버튼 클릭 시 동작
    // 프로필 설정 모달 또는 페이지로 이동
  };

  handleSalesHistory = () => {
    // 판매 내역 버튼 클릭 시 동작
    // 판매 내역 페이지로 이동
  };

  handlePurchaseHistory = () => {
    // 구매 내역 버튼 클릭 시 동작
    // 구매 내역 페이지로 이동
  };

  handleWishlist = () => {
    // 찜한 상품 버튼 클릭 시 동작
    // 찜한 상품 페이지로 이동
  };
}

export default MyPage;
