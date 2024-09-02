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
    title: '',
    categories: '',
    price: '',
    description: '',
    status: 'AVAILABLE',
  };

  const onSubmit = (values) => {
    const formData = new FormData();
    images.forEach(image => {
      formData.append('images', image);
    });
    formData.append('title', values.title);
    formData.append('categories', values.categories);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('status', values.status);
    
    console.log('Form data', values);
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
    title: Yup.string().required('입력하지 않았습니다.'),
    categories: Yup.string().required('카테고리를 선택하세요'),
    price: Yup.number().required('입력하지 않았습니다'),
    description: Yup.string().required('입력하지 않았습니다'),
    status: Yup.string().required('상태를 선택하세요'),
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

  // const statuses = [
  //   { value: "AVAILABLE", label: "판매 중" },
  //   { value: "RESERVED", label: "예약 중" },
  //   { value: "SOLD", label: "거래 완료" },
  // ];

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
            <label htmlFor="title">* 상품명</label>
            <br />
            <div>
              <Field type="text" id="title" name="title" className={styles.inputHalf} placeholder="상품명을 입력해주세요." />
              <ErrorMessage name="title" component="div" className={styles.error} />
            </div>
          </div>
          <hr className={styles.hr2} />
          <div>
            <label>* 카테고리</label>
            <br /> <br /> <br />
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
          {/* <hr className={styles.hr2} />
          <div>
            <label>* 상태</label>
            <br /> <br /> <br />
            <div className={styles.radioContainer} role="group" aria-labelledby="checkbox-group">
              {statuses.map((status, index) => (
                <label key={index} className={styles.radioLabel}>
                  <Field
                    type="radio"
                    name="status"
                    value={status.value}
                    className={styles.radio}
                  />
                  {status.label}
                </label>
              ))}
            </div>
            <ErrorMessage name="status" component="div" className={styles.error} />
          </div> */}
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
            <label htmlFor="description">* 자세한 설명</label>
            <br />
            <Field
              as="textarea"
              id="description"
              name="description"
              placeholder="-상품명(브랜드)
                            -구매 시기
                            -착용 기간
                            -오염 여부
                            -하자 여부
                            *실제 촬영한 사진과 함께 상세 정보를 입력해주세요."
            />
            <ErrorMessage name="description" component="div" className={styles.error} />
          </div>
          <button type="submit">판매하기</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Sell;


















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import styles from '../../styles/sell/Sell.module.css';
// import cameraIcon from "../../images/camera5.png";
// import xicon from "../../images/xicon.png";

// const Sell = () => {
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [subcategories, setSubcategories] = useState([]);
//   const navigate = useNavigate();

//   const initialValues = {
//     title: '',
//     categories: '',
//     price: '',
//     description: '',
//     status: 'AVAILABLE',
//   };

//   const onSubmit = (values) => {
//     const formData = new FormData();
//     images.forEach(image => {
//       formData.append('images', image);
//     });
//     formData.append('title', values.title);
//     formData.append('categories', values.categories);
//     formData.append('price', values.price);
//     formData.append('description', values.description);
//     formData.append('status', values.status);
    
//     console.log('Form data', values);
//   };

//   const handleImageChange = (event) => {
//     const files = Array.from(event.target.files);
//     setImages(files);

//     const newPreviews = [];
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         newPreviews.push(reader.result);
//         if (newPreviews.length === files.length) {
//           setPreviews(newPreviews);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleRemoveImage = (index) => {
//     const newImages = [...images];
//     newImages.splice(index, 1);
//     setImages(newImages);

//     const newPreviews = [...previews];
//     newPreviews.splice(index, 1);
//     setPreviews(newPreviews);
//   };

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (!isLoggedIn) {
//       navigate('/auth');
//     }
//   }, [navigate]);

//   const validationSchema = Yup.object({
//     title: Yup.string().required('입력하지 않았습니다.'),
//     categories: Yup.string().required('카테고리를 선택하세요'),
//     price: Yup.number().required('입력하지 않았습니다'),
//     description: Yup.string().required('입력하지 않았습니다'),
//     status: Yup.string().required('상태를 선택하세요'),
//   });

//   const categoriesData = {
//     전자기기: [
//       { value: "스마트폰", label: "스마트폰" },
//       { value: "노트북", label: "노트북" },
//       { value: "이어폰", label: "이어폰" },
//     ],
//     가전제품: [
//       { value: "냉장고", label: "냉장고" },
//       { value: "세탁기", label: "세탁기" },
//       { value: "전자레인지", label: "전자레인지" },
//     ],
//     // 다른 대분류와 소분류 데이터 추가...
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSubcategories(categoriesData[category] || []);
//   };

//   return (
//     <div className={styles.container}>
//       <h2>상품 정보</h2>
//       <hr className={styles.hr1} />
//       <br />
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         <Form>
//           <div>
//             <label htmlFor="images">* 상품 이미지</label>
//             <br />
//             <div className={styles.imageContainer}>
//               <div>
//                 <input
//                   type="file"
//                   id="images"
//                   name="images"
//                   onChange={handleImageChange}
//                   multiple
//                   style={{ display: 'none' }}
//                 />
//                 <button
//                   type="button"
//                   className={styles.imgButton}
//                   onClick={() => document.getElementById('images').click()}
//                 >
//                   <img src={cameraIcon} alt="카메라 아이콘" className={styles.imgIcon} />
//                 </button>
//               </div>
//               <div className={styles.previewsContainer}>
//                 {previews.map((preview, index) => (
//                   <div key={index} className={styles.previewWrapper}>
//                     <img src={preview} alt="미리보기" className={styles.preview} />
//                     <button className={styles.xbutton} type="button" onClick={() => handleRemoveImage(index)}>
//                       <img src={xicon} alt="삭제 아이콘" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <hr className={styles.hr2} />
//           <div>
//             <label htmlFor="title">* 상품명</label>
//             <br />
//             <div>
//               <Field type="text" id="title" name="title" className={styles.inputHalf} placeholder="상품명을 입력해주세요." />
//               <ErrorMessage name="title" component="div" className={styles.error} />
//             </div>
//           </div>
//           <hr className={styles.hr2} />
//           <div>
//             <label>* 카테고리</label>
//             <br /> <br />
//             <div className={styles.categoryContainer}>
//               {Object.keys(categoriesData).map((category, index) => (
//                 <div
//                   key={index}
//                   className={styles.categoryItem}
//                   onClick={() => handleCategoryClick(category)}
//                 >
//                   {category}
//                 </div>
//               ))}
//             </div>
//             {selectedCategory && (
//               <div>
//                 <Field as="select" name="categories" className={styles.inputHalf}>
//                   <option value="">중분류를 선택하세요</option>
//                   {subcategories.map((subcategory, index) => (
//                     <option key={index} value={subcategory.value}>{subcategory.label}</option>
//                   ))}
//                 </Field>
//                 <ErrorMessage name="categories" component="div" className={styles.error} />
//               </div>
//             )}
//           </div>
//           <hr className={styles.hr2} />
//           <div>
//             <label htmlFor="price">* 가격</label>
//             <br />
//             <div>
//               <Field type="number" id="price" name="price" placeholder="가격을 입력해 주세요." className={styles.inputHalf} />
//               <span>원</span>
//             </div>
//             <ErrorMessage name="price" component="div" className={styles.error} />
//           </div>
//           <hr className={styles.hr2} />
//           <div>
//             <label htmlFor="description">* 자세한 설명</label>
//             <br />
//             <Field
//               as="textarea"
//               id="description"
//               name="description"
//               placeholder="-상품명(브랜드)
//                             -구매 시기
//                             -착용 기간
//                             -오염 여부
//                             -하자 여부
//                             *실제 촬영한 사진과 함께 상세 정보를 입력해주세요."
//               className={styles.textarea}
//             />
//             <ErrorMessage name="description" component="div" className={styles.error} />
//           </div>
//           <button type="submit" className={styles.submitButton}>판매하기</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default Sell;

