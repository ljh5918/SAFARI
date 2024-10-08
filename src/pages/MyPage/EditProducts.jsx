import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/sell/Sell.module.css';
import cameraIcon from "../../images/camera5.png";
import xicon from "../../images/xicon.png";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const categories = [
    { value: "전자기기", label: "전자기기" },
    { value: "가전제품", label: "가전제품" },
    { value: "여성의류", label: "여성의류" },
    { value: "남성의류", label: "남성의류" },
    { value: "가구/인테리어", label: "가구/인테리어" },
    { value: "액세서리", label: "액세서리" },
    { value: "뷰티", label: "뷰티" },
    { value: "스포츠", label: "스포츠" },
    { value: "기타", label: "기타" },
  ];

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productToEdit = products.find((product) => product.id.toString() === id);
    if (productToEdit) {
      setProduct(productToEdit);
      setImages(productToEdit.images || []);
      setPreviews(productToEdit.images || []);
    }
  }, [id]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);

    const newPreviews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('입력하지 않았습니다.'),
    categories: Yup.string().required('카테고리를 선택하세요'),
    price: Yup.number().required('입력하지 않았습니다'),
    description: Yup.string().required('입력하지 않았습니다'),
    status: Yup.string().required('상태를 선택하세요'),
  });

  const onSubmit = (values) => {
    const updatedProduct = {
      ...product,
      title: values.title,
      categories: values.categories,
      price: values.price,
      description: values.description,
      images: previews.length > 0 ? previews : images,
    };

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.map((p) => p.id.toString() === id ? updatedProduct : p);

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    navigate('/MyPage');  
  };

  return product ? (
    <div className={styles.container}>
      <h2>상품 수정</h2>
      <hr className={styles.hr1} />
      <br />
      <Formik
        initialValues={{
          title: product.title,
          categories: product.categories,
          price: product.price,
          description: product.description,
          status: product.status,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label htmlFor="images">* 상품 이미지</label>
            <br />
            <div className={styles.imageContainer}>
              <div>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleImageChange}
                  multiple
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className={styles.imgButton}
                  onClick={() => document.getElementById('images').click()}
                >
                  <img src={cameraIcon} alt="카메라 아이콘" className={styles.imgIcon} />
                </button>
              </div>
              <div className={styles.previewsContainer}>
                {previews.map((preview, index) => (
                  <div key={index} className={styles.previewWrapper}>
                    <img src={preview} alt="미리보기" className={styles.preview} />
                    <button className={styles.xbutton} type="button" onClick={() => handleRemoveImage(index)}>
                      <img src={xicon} alt="삭제 아이콘" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className={styles.hr2} />
          <div>
            <label htmlFor="title">* 상품명</label>
            <br />
            <div>
              <Field type="text" id="title" name="title" className={styles.inputHalf} />
              <ErrorMessage name="title" component="div" className={styles.error} />
            </div>
          </div>
          <hr className={styles.hr2} />
          <div>
            <label>* 카테고리</label>
            <br />
            <div className={styles.radioContainer} role="group" aria-labelledby="checkbox-group">
              {categories.map((category, index) => (
                <label key={index} className={styles.radioLabel}>
                  <Field
                    type="radio"
                    name="categories"
                    value={category.value}
                    className={styles.radio}
                  />
                  {category.label}
                </label>
              ))}
            </div>
            <ErrorMessage name="categories" component="div" className={styles.error} />
          </div>
          <hr className={styles.hr2} />
          <div>
            <label htmlFor="price">* 가격</label>
            <br />
            <div>
              <Field type="number" id="price" name="price" className={styles.inputHalf} />
              <span>원</span>
            </div>
            <ErrorMessage name="price" component="div" className={styles.error} />
          </div>
          <hr className={styles.hr2} />
          <div>
            <label htmlFor="description">* 자세한 설명</label>
            <br />
            <Field
              as="textarea"
              id="description"
              name="description"
              className={styles.inputFull}
            />
            <ErrorMessage name="description" component="div" className={styles.error} />
          </div>
          <button type="submit">수정하기</button>
        </Form>
      </Formik>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditProduct;
