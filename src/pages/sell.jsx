import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/Sell.module.css';
import cameraIcon from "../images/camera5.png";
import xicon from "../images/xicon.png";
//yarn add yup, npm i yup, npm install formik yup
import ProductComponent from '../components/product/ProductComponent';

const Sell = () => {
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const navigate = useNavigate();

    const initialValues = {

        title: '',
        categories: '', // 카테고리를 문자열로 저장
        price: '',
        description: '',
    };


    

    //전체 데이터를 FormData 객체로 생성 FormData는 폼 데이터를 서버로 전송할 대 사용
    const onSubmit = (values) => {
        const formData = new FormData(); //폼 데이터를 key-value 저장하여 쉽게 전송가능
        images.forEach(image => {        //images 배열에 있는 모든 이미지를 ForData 객체에 추가 
            formData.append('images', image);
        });
        formData.append('title', values.title);
        formData.append('categories', values.categories); // 하나의 카테고리를 문자열로 추가
        formData.append('price', values.price);
        formData.append('description', values.description);
        
        console.log('Form data', values);
       
    };

    //파일 업로드, 미리보기
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files); // 파일을 배열로 변환
        setImages(files); // 이미지 파일 저장

        const newPreviews = [];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result);
                // 모든 파일의 미리보기를 설정한 후에 상태를 업데이트
                if (newPreviews.length === files.length) {
                    setPreviews(newPreviews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    //미리보기 이미지 삭제
    const handleRemoveImage = (index) => {
        const newImages = [...images];
         newImages.splice(index, 1);
        setImages(newImages);

        const newPreviews = [...previews];
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    //로그인 상태가 아닐 시 접근 불가
    useEffect(() => {
        // 페이지 접근 시 로그인 상태 확인
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/auth'); // 로그인 상태가 아니라면 로그인 페이지로 이동
        }
    }, [navigate]);

    
    const validationSchema = Yup.object({
        title: Yup.string().required('입력하지 않았습니다.'), //모두 필수 입력
        categories: Yup.string().required('카테고리를 선택하세요'),
        price: Yup.number().required('입력하지 않았습니다'),
        description: Yup.string().required('입력하지 않았습니다'),
    });

    const categories = [
        { value: "패션의류", label: "패션의류" },
        { value: "모바일/태블릿", label: "모바일/태블릿" },
        { value: "가전제품", label: "가전제품" },
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

                    <button type="submit" >판매하기</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Sell;
