import React from 'react';
import { NavLink } from 'react-router-dom'; 
import styles from '../../styles/MyPage/Bar.module.css';

const Bar = ({ activeSection, showSection }) => {
  return (
    <div>
      <div className={styles['menuBar']}>
        <NavLink to="/Products" activeClassName={styles.active} className={styles['menuItem']} onClick={() => showSection('Products')}>등록한 상품</NavLink>
        <NavLink to="/Sale" activeClassName={styles.active} className={styles['menuItem']} onClick={() => showSection('Sale')}>판매내역</NavLink>
        <NavLink to="/Purchase" activeClassName={styles.active} className={styles['menuItem']} onClick={() => showSection('Purchase')}>구매내역</NavLink>
        <NavLink to="/Like" activeClassName={styles.active} className={styles['menuItem']} onClick={() => showSection('Like')}>찜한 상품</NavLink>
      </div>
    </div>
  );
};

export default Bar;
