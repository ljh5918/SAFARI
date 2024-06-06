import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/Sell.module.css';
import cameraIcon from "../images/camera5.png";
import xicon from "../images/xicon.png";
//yarn add yup, npm i yup, npm install formik yup

const Sell = (onProductSubmit) => {
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const navigate = useNavigate();

    const initialValues = {
        title: '',
        description: '',
        price: '',
        categories: '', // 카테고리를 문자열로 저장
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('입력하지 않았습니다.'),
        description: Yup.string().required('입력하지 않았습니다'),
        price: Yup.number().required('입력하지 않았습니다'),
        categories: Yup.string().required('카테고리를 선택하세요'), // 카테고리를 필수로 설정
    });

    const onSubmit = (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('categories', values.categories); // 하나의 카테고리를 문자열로 추가
        images.forEach(image => {
            formData.append('images', image);
        });
        values.categories.forEach(category => {
            formData.append('categories', category);
        });

        console.log('Form data', values);
       
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);

        const newPreviews = files.map(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
            return reader;
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

    //로그인 상태가 아닐 시 접근 불가
    useEffect(() => {
        // 페이지 접근 시 로그인 상태 확인
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/auth'); // 로그인 상태가 아니라면 로그인 페이지로 이동
        }
    }, [navigate]);

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

                    <button type="submit">판매하기</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Sell;
