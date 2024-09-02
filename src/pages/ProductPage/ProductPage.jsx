import React from "react";
import Product from "../../components/product/Product";
import { useParams } from "react-router-dom";
import styles from "../../styles/product/ProductPage.module.css";

const ProductPage = () => {
  const { categoryName } = useParams();

  return (
    <div className={styles.productPage}>
      <h1>{categoryName}</h1>
      <Product />
    </div>
  );
};

export default ProductPage;
