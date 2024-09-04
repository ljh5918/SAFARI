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
//   const navigate = useNavigate();

//   const initialValues = {
//     title: '',
//     categories: '',
//     price: '',
//     description: '',
//     status: 'AVAILABLE',
//   };

//   const onSubmit = async (values) => {
//     try {
//       const imageUrls = await uploadImagesToServer(images);

//       const newProduct = {
//         id: Date.now(),
//         title: values.title,
//         categories: values.categories,
//         price: values.price,
//         description: values.description,
//         status: values.status,
//         images: imageUrls,
//       };

//       const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
//       existingProducts.push(newProduct);

//       localStorage.setItem('products', JSON.stringify(existingProducts));

//       console.log('Product saved successfully');
//       navigate('/search-results');
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
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

//   const categories = [
//     { value: "전자기기", label: "전자기기" },
//     { value: "가전제품", label: "가전제품" },
//     { value: "여성의류", label: "여성의류" },
//     { value: "남성의류", label: "남성의류" },
//     { value: "가구/인테리어", label: "가구/인테리어" },
//     { value: "액세서리", label: "액세서리" },
//     { value: "뷰티", label: "뷰티" },
//     { value: "스포츠", label: "스포츠" },
//     { value: "기타", label: "기타" },
//   ];

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
//             <br /> <br /> <br />
//             <div className={styles.radioContainer} role="group" aria-labelledby="checkbox-group">
//               {categories.map((category, index) => (
//                 <label key={index} className={styles.radioLabel}>
//                   <Field
//                     type="radio"
//                     name="categories"
//                     value={category.value}
//                     className={styles.radio}
//                   />
//                   {category.label}
//                 </label>
//               ))}
//             </div>
//             <ErrorMessage name="categories" component="div" className={styles.error} />
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
//             />
//             <ErrorMessage name="description" component="div" className={styles.error} />
//           </div>
//           <button type="submit">판매하기</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// // Placeholder function to simulate image upload
// const uploadImagesToServer = async (images) => {
//   // Replace this with actual upload logic
//   return images.map((image, index) => `https://example.com/image${index}.jpg`);
// };

// export default Sell;














import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/sell/Sell.module.css';
import cameraIcon from "../../images/camera5.png";
import xicon from "../../images/xicon.png";
import SearchResult from '../../components/header/SearchResult';

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

  const onSubmit = async (values) => {
    try {
      const imageUrls = await uploadImagesToServer(images);
      
      const newProduct = {
        id: Date.now(),
        title: values.title,
        categories: values.categories,
        price: values.price,
        description: values.description,
        status: values.status,
        images: imageUrls,
        timestamp: Date.now(), // 현재 시간을 밀리초 단위로 저장
      };


      // Get existing products from localStorage
      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      existingProducts.push(newProduct);

      // Save updated products to localStorage
      localStorage.setItem('products', JSON.stringify(existingProducts));

      console.log('Product saved successfully');
      navigate('/search-results');
    } catch (error) {
      console.error('Error saving product:', error);
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

// Placeholder function to simulate image upload
const uploadImagesToServer = async (images) => {
  // Replace this with actual upload logic
  return images.map((image, index) => `https://example.com/image${index}.jpg`);
};

export default Sell;












