// // // //   import React, { useState, useEffect } from 'react';
// // // //   import { useNavigate, useParams } from 'react-router-dom';
// // // //   import { Formik, Form, Field, ErrorMessage } from 'formik';
// // // //   import * as Yup from 'yup';
// // // //   import styles from '../../styles/sell/Sell.module.css';
// // // //   import cameraIcon from "../../images/camera5.png";
// // // //   import xicon from "../../images/xicon.png";

// // // //   const EditProduct = () => {
// // // //     const { id } = useParams();
// // // //     const navigate = useNavigate();
// // // //     const [product, setProduct] = useState(null);
// // // //     const [images, setImages] = useState([]);
// // // //     const [previews, setPreviews] = useState([]);

// // // //     const categories = [
// // // //       { value: "전자기기", label: "전자기기" },
// // // //       { value: "가전제품", label: "가전제품" },
// // // //       { value: "여성의류", label: "여성의류" },
// // // //       { value: "남성의류", label: "남성의류" },
// // // //       { value: "가구/인테리어", label: "가구/인테리어" },
// // // //       { value: "액세서리", label: "액세서리" },
// // // //       { value: "뷰티", label: "뷰티" },
// // // //       { value: "스포츠", label: "스포츠" },
// // // //       { value: "기타", label: "기타" },
// // // //     ];

// // // //     // useEffect(() => {
// // // //     //   const products = JSON.parse(localStorage.getItem('products')) || [];
// // // //     //   const productToEdit = products.find((product) => product.id.toString() === id);
// // // //     //   if (productToEdit) {
// // // //     //     setProduct(productToEdit);
// // // //     //     setImages(productToEdit.images || []);
// // // //     //     setPreviews(productToEdit.images || []);
// // // //     //   }
// // // //     // }, [id]);

// // // //     const handleImageChange = (event) => {
// // // //       const files = Array.from(event.target.files);
// // // //       setImages(files);

// // // //       const newPreviews = [];
// // // //       files.forEach(file => {
// // // //         const reader = new FileReader();
// // // //         reader.onloadend = () => {
// // // //           newPreviews.push(reader.result);
// // // //           if (newPreviews.length === files.length) {
// // // //             setPreviews(newPreviews);
// // // //           }
// // // //         };
// // // //         reader.readAsDataURL(file);
// // // //       });
// // // //     };

// // // //     const handleRemoveImage = (index) => {
// // // //       const newImages = [...images];
// // // //       newImages.splice(index, 1);
// // // //       setImages(newImages);

// // // //       const newPreviews = [...previews];
// // // //       newPreviews.splice(index, 1);
// // // //       setPreviews(newPreviews);
// // // //     };

// // // //     const validationSchema = Yup.object({
// // // //       title: Yup.string().required('입력하지 않았습니다.'),
// // // //       categories: Yup.string().required('카테고리를 선택하세요'),
// // // //       price: Yup.number().required('입력하지 않았습니다'),
// // // //       description: Yup.string().required('입력하지 않았습니다'),
// // // //       status: Yup.string().required('상태를 선택하세요'),
// // // //     });

// // // //     const onSubmit = (values) => {
// // // //       // const updatedProduct = {
// // // //       //   ...product,
// // // //       //   title: values.title,
// // // //       //   categories: values.categories,
// // // //       //   price: values.price,
// // // //       //   description: values.description,
// // // //       //   images: previews.length > 0 ? previews : images,
// // // //       // };

// // // //       // const products = JSON.parse(localStorage.getItem('products')) || [];
// // // //       // const updatedProducts = products.map((p) => p.id.toString() === id ? updatedProduct : p);

// // // //       // localStorage.setItem('products', JSON.stringify(updatedProducts));

// // // //       // navigate('/MyPage');  
// // // //     };

// // // //     return product ? (
// // // //       <div className={styles.container}>
// // // //         <h2>상품 수정</h2>
// // // //         <hr className={styles.hr1} />
// // // //         <br />
// // // //         <Formik
// // // //           initialValues={{
// // // //             title: product.title,
// // // //             categories: product.categories,
// // // //             price: product.price,
// // // //             description: product.description,
// // // //             status: product.status,
// // // //           }}
// // // //           validationSchema={validationSchema}
// // // //           onSubmit={onSubmit}
// // // //         >
// // // //           <Form>
// // // //             <div>
// // // //               <label htmlFor="images">* 상품 이미지</label>
// // // //               <br />
// // // //               <div className={styles.imageContainer}>
// // // //                 <div>
// // // //                   <input
// // // //                     type="file"
// // // //                     id="images"
// // // //                     name="images"
// // // //                     onChange={handleImageChange}
// // // //                     multiple
// // // //                     style={{ display: 'none' }}
// // // //                   />
// // // //                   <button
// // // //                     type="button"
// // // //                     className={styles.imgButton}
// // // //                     onClick={() => document.getElementById('images').click()}
// // // //                   >
// // // //                     <img src={cameraIcon} alt="카메라 아이콘" className={styles.imgIcon} />
// // // //                   </button>
// // // //                 </div>
// // // //                 <div className={styles.previewsContainer}>
// // // //                   {previews.map((preview, index) => (
// // // //                     <div key={index} className={styles.previewWrapper}>
// // // //                       <img src={preview} alt="미리보기" className={styles.preview} />
// // // //                       <button className={styles.xbutton} type="button" onClick={() => handleRemoveImage(index)}>
// // // //                         <img src={xicon} alt="삭제 아이콘" />
// // // //                       </button>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //             <hr className={styles.hr2} />
// // // //             <div>
// // // //               <label htmlFor="title">* 상품명</label>
// // // //               <br />
// // // //               <div>
// // // //                 <Field type="text" id="title" name="title" className={styles.inputHalf} />
// // // //                 <ErrorMessage name="title" component="div" className={styles.error} />
// // // //               </div>
// // // //             </div>
// // // //             <hr className={styles.hr2} />
// // // //             <div>
// // // //               <label>* 카테고리</label>
// // // //               <br />
// // // //               <div className={styles.radioContainer} role="group" aria-labelledby="checkbox-group">
// // // //                 {categories.map((category, index) => (
// // // //                   <label key={index} className={styles.radioLabel}>
// // // //                     <Field
// // // //                       type="radio"
// // // //                       name="categories"
// // // //                       value={category.value}
// // // //                       className={styles.radio}
// // // //                     />
// // // //                     {category.label}
// // // //                   </label>
// // // //                 ))}
// // // //               </div>
// // // //               <ErrorMessage name="categories" component="div" className={styles.error} />
// // // //             </div>
// // // //             <hr className={styles.hr2} />
// // // //             <div>
// // // //               <label htmlFor="price">* 가격</label>
// // // //               <br />
// // // //               <div>
// // // //                 <Field type="number" id="price" name="price" className={styles.inputHalf} />
// // // //                 <span>원</span>
// // // //               </div>
// // // //               <ErrorMessage name="price" component="div" className={styles.error} />
// // // //             </div>
// // // //             <hr className={styles.hr2} />
// // // //             <div>
// // // //               <label htmlFor="description">* 자세한 설명</label>
// // // //               <br />
// // // //               <Field
// // // //                 as="textarea"
// // // //                 id="description"
// // // //                 name="description"
// // // //                 className={styles.inputFull}
// // // //               />
// // // //               <ErrorMessage name="description" component="div" className={styles.error} />
// // // //             </div>
// // // //             <button type="submit">수정하기</button>
// // // //           </Form>
// // // //         </Formik>
// // // //       </div>
// // // //     ) : (
// // // //       <p>Loading...</p>
// // // //     );
// // // //   };

// // // //   export default EditProduct;




























import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/sell/Sell.module.css';
import cameraIcon from "../../images/camera5.png";
import xicon from "../../images/xicon.png";

const EditProduct = () => {
  const { id } = useParams(); // 상품 ID를 URL에서 가져옴
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // 기존 상품 정보를 저장
  const [images, setImages] = useState([]); // 이미지 파일 저장
  const [previews, setPreviews] = useState([]); // 이미지 미리보기 저장

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

  // 상품 정보 가져오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token'); // 토큰 가져오기
        const response = await fetch(`http://localhost:8080/item/${id}`, { // 상품 상세 정보 API 호출
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // 인증 헤더 추가
          },
        });

        if (response.ok) {
          const data = await response.json(); // 상품 정보 받아오기
          setProduct(data); // 상품 정보 상태 저장
          setPreviews(data.itemImgDtoList.map(img => img.imgUrl)); // 이미지 URL 저장
        } else {
          const errorData = await response.json();
          console.error('Error fetching product:', errorData);
          alert('상품을 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('상품을 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchProduct(); // 컴포넌트 마운트 시 호출
  }, [id]);

  // 이미지 파일 변경 처리
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

  // 이미지 제거
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  // 유효성 검사 스키마
  const validationSchema = Yup.object({
    title: Yup.string().required('상품명을 입력해주세요.'),
    categories: Yup.string().required('카테고리를 선택하세요'),
    price: Yup.number().required('가격을 입력해주세요').min(0, '가격은 0원 이상이어야 합니다.'),
    description: Yup.string().required('상품 설명을 입력해주세요.'),
    status: Yup.string().required('상품 상태를 선택해주세요.'),
    stockNumber: Yup.number().required('재고 수량을 입력해주세요').min(0, '재고는 0 이상이어야 합니다.')
  });

  // 폼 제출 처리
const onSubmit = async (values) => {
  const formData = new FormData();
  formData.append("itemNm", values.title);
  formData.append("itemCategory", values.categories);
  formData.append("price", values.price);
  formData.append("itemDetail", values.description);
  formData.append("itemSellStatus", values.status);
  formData.append("stockNumber", values.stockNumber);

  // Check if images are selected and append them to formData
  if (images.length > 0) {
    images.forEach((image) => {
      formData.append("itemImgFile", image);
    });
  } else {
    console.log("No images to upload");
  }
  // images.forEach(image => {
  //   formData.append("itemImgFile", image);
  // });

  // Log the FormData contents for debugging
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const response = await fetch(`http://localhost:8080/admin/item/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        // No 'Content-Type' header should be set for FormData
      },
      body: formData,
    });

    if (response.ok) {
      alert('상품이 성공적으로 업데이트되었습니다.');
      navigate('/MyPage');
    } else {
      // Attempt to parse the response as JSON
      const errorResponse = await response.text(); // Use text to get the raw response
      console.error('Error response:', errorResponse); // Log the error response
      alert(`상품 업데이트 중 오류가 발생했습니다: ${errorResponse}`);
    }
  } catch (error) {
    console.error('Error updating product:', error);
    alert('상품 업데이트 중 서버와의 연결에 문제가 발생하였습니다.');
  }
};


  return product ? (
    <div className={styles.container}>
      <h2>상품 수정</h2>
      <hr className={styles.hr1} />
      <br />
      <Formik
        initialValues={{
          title: product.itemNm,
          categories: product.itemCategory,
          price: product.price,
          description: product.itemDetail,
          status: product.itemSellStatus,
          stockNumber: product.stockNumber || 0,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          {/* 이미지 업로드 폼 */}
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
          {/* 상품명 입력 */}
          <div>
            <label htmlFor="title">* 상품명</label>
            <br />
            <div>
              <Field type="text" id="title" name="title" className={styles.inputHalf} />
              <ErrorMessage name="title" component="div" className={styles.error} />
            </div>
          </div>
          <hr className={styles.hr2} />
          {/* 카테고리 선택 */}
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
              <ErrorMessage name="categories" component="div" className={styles.error} />
            </div>
          </div>
          <hr className={styles.hr2} />
          {/* 가격 입력 */}
          <div>
            <label htmlFor="price">* 가격</label>
            <br />
            <div>
              <Field type="number" id="price" name="price" className={styles.inputHalf} />
              <ErrorMessage name="price" component="div" className={styles.error} />
            </div>
          </div>
          <hr className={styles.hr2} />
          {/* 상태 선택 */}
          <div>
            <label>* 상태</label>
            <br />
            <div className={styles.radioContainer} role="group" aria-labelledby="checkbox-group">
              <label className={styles.radioLabel}>
                <Field type="radio" name="status" value="SELL" className={styles.radio} />
                판매중
              </label>
              <label className={styles.radioLabel}>
                <Field type="radio" name="status" value="SOLD_OUT" className={styles.radio} />
                품절
              </label>
              <ErrorMessage name="status" component="div" className={styles.error} />
            </div>
          </div>
          <hr className={styles.hr2} />
          {/* 상품 설명 입력 */}
          <div>
            <label htmlFor="description">* 상품 설명</label>
            <br />
            <div>
              <Field as="textarea" id="description" name="description" className={styles.textarea} />
              <ErrorMessage name="description" component="div" className={styles.error} />
            </div>
          </div>
          <hr className={styles.hr2} />
          {/* 재고 수량 입력 */}
          <div>
            <label htmlFor="stockNumber">* 재고 수량</label>
            <br />
            <div>
              <Field type="number" id="stockNumber" name="stockNumber" className={styles.inputHalf} />
              <ErrorMessage name="stockNumber" component="div" className={styles.error} />
            </div>
          </div>
          <hr className={styles.hr2} />
          {/* 제출 버튼 */}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              수정하기
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default EditProduct;














