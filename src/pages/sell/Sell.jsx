import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/sell/Sell.module.css';
import cameraIcon from "../../images/camera5.png";
import xicon from "../../images/xicon.png";

const Sell = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    itemNm: '',
    itemCategory: '',
    price: '',
    itemDetail: '',
    stockNumber: '',
    itemSellStatus: 'SELL', 
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("itemNm", values.itemNm);
    formData.append("itemCategory", values.itemCategory);
    formData.append("price", values.price);
    formData.append("itemDetail", values.itemDetail);
    formData.append("stockNumber", values.stockNumber);
    formData.append("itemSellStatus", values.itemSellStatus);

    // 이미지 추가
    images.forEach(image => {
      formData.append("itemImgFile", image);
    });

    const token = localStorage.getItem('token'); // 로컬에서 토큰 가져오기
    try {
      const response = await fetch('/admin/item/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // JSON 응답 파싱
        alert(data.message); // 메시지를 알림으로 표시
        navigate('/Product'); 
        
      } else {
        const errorResponse = await response.json();
        alert(`상품 등록 중 에러가 발생하였습니다: ${errorResponse.message}`); // JSON에서 메시지를 표시
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('상품 등록 중 서버와의 연결에 문제가 발생하였습니다.'); // 서버 연결 문제에 대한 메시지
    }
  };
  

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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [navigate]);

  const validationSchema = Yup.object({
    itemNm: Yup.string().required('상품명을 입력하세요.'),
    itemCategory: Yup.string().required('카테고리를 선택하세요.'),
    price: Yup.number().required('가격을 입력하세요.'),
    itemDetail: Yup.string().required('상세 설명을 입력하세요.'),
    stockNumber: Yup.number().required('재고 수량을 입력하세요.'),
    itemSellStatus: Yup.string().required('상태를 선택하세요.'),
  });

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

  return (
    <div className={styles.container}>
      <h2>상품 정보</h2>
      <hr className={styles.hr1} />
      <br />
      <Formik
        initialValues={initialValues}
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
            <label htmlFor="itemNm">* 상품명</label>
            <br />
            <div>
              <Field type="text" id="itemNm" name="itemNm" className={styles.inputHalf} placeholder="상품명을 입력해주세요." />
              <ErrorMessage name="itemNm" component="div" className={styles.error} />
            </div>
          </div>
          <hr className={styles.hr2} />
          <div>
            <label>* 카테고리</label>
            <br />
            <br />
            <br />
            <div className={styles.radioContainer} role="group" aria-labelledby="checkbox-group">
              {categories.map((category, index) => (
                <label key={index} className={styles.radioLabel}>
                  <Field
                    type="radio"
                    name="itemCategory"
                    value={category.value}
                    className={styles.radio}
                  />
                  {category.label}
                </label>
              ))}
            </div>
            <ErrorMessage name="itemCategory" component="div" className={styles.error} />
          </div>
          <hr className={styles.hr2} />
          <div>
            <label htmlFor="price">* 가격</label>
            <br />
            <div>
              <Field type="number" id="price" name="price" placeholder="가격을 입력해 주세요." className={styles.inputHalf} />
              <span>원</span>
            </div>
            <ErrorMessage name="price" component="div" className={styles.error} />
          </div>
          <hr className={styles.hr2} />
          <div>
            <label htmlFor="itemDetail">* 자세한 설명</label>
            <br />
            <Field
              as="textarea"
              id="itemDetail"
              name="itemDetail"
              placeholder="-상품명(브랜드)
                          -구매 시기
                          -착용 기간
                          -오염 여부
                          -하자 여부
                          *실제 촬영한 사진과 함께 상세 정보를 입력해주세요."
              className={styles.inputDetail}
            />
            <ErrorMessage name="itemDetail" component="div" className={styles.error} />
          </div>
          <hr className={styles.hr2} />
          <div>
            <label htmlFor="stockNumber">* 재고 수량</label>
            <br />
            <Field type="number" id="stockNumber" name="stockNumber" className={styles.inputHalf} placeholder="재고 수량을 입력해주세요." />
            <ErrorMessage name="stockNumber" component="div" className={styles.error} />
          </div>
          <hr className={styles.hr2} />
          <div>
            <label htmlFor="itemSellStatus">* 상품 상태</label>
            <br />
            <Field as="select" name="itemSellStatus" className={styles.inputHalf}>
              <option value="SELL">판매 중</option>
              <option value="SOLD_OUT">품절</option>
            </Field>
            <ErrorMessage name="itemSellStatus" component="div" className={styles.error} />
          </div>
          <hr className={styles.hr2} />
          <button type="submit" className={styles.submitButton}>상품 등록하기</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Sell;

















