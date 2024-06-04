import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/Sell.module.css';
import cameraIcon from "../images/camera1.png";

const Sell = () => {
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    const initialValues = {
        title: '',
        description: '',
        price: '',
        category: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('입력하지 않았습니다.'),
        description: Yup.string().required('입력하지 않았습니다'),
        price: Yup.number().required('입력하지 않았습니다'),
        category: Yup.string().required('선택하지 않았습니다'),
    });

    const onSubmit = (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('category', values.category);
        images.forEach(image => {
            formData.append('images', image);
        });
        
        // 서버에 formData를 전송하는 코드를 추가
        // ex) axios사용하여 forData 전송
        // axios.post('/api/products', formData)
        //     .then(response => console.log(response))
        //     .catch(error => console.error(error));

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

    return (
        <div className={styles.container}>
            <h2>상품 정보</h2>
            <hr></hr>
            <br />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                   <div>
                        <label htmlFor="images">상품 이미지</label>
                        <div className={styles.cameraButtonContainer}>
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
                                className={styles.cameraButton}
                                onClick={() => document.getElementById('images').click()}
                            >
                                <img src={cameraIcon} alt="카메라 아이콘" className={styles.cameraIcon} />
                            </button>
                        </div>
                        <div className={styles.previewsContainer}>
                            {previews.map((preview, index) => (
                                <div key={index} className={styles.previewWrapper}>
                                    <img src={preview} alt="미리보기" className={styles.preview} />
                                    <button type="button" onClick={() => handleRemoveImage(index)}>삭제</button>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div>
                        <label htmlFor="title">상품명</label>
                        <Field type="text" id="title" name="title" />
                        <ErrorMessage name="title" component="div" className={styles.error} />
                    </div>

                    <div>
                        <label htmlFor="category">카테고리</label>
                        <p/>
                        <Field as="select" id="category" name="category">
                            <option value="">카테고리를 선택하세요</option>
                            <option value="패션의류">패션의류</option>
                            <option value="모바일/태블릿">모바일/태블릿</option>
                            <option value="가전제품">가전제품</option>
                            <option value="가구/인테리어">가구/인테리어</option>
                            <option value="액세서리">액세서리</option>
                            <option value="뷰티">뷰티</option>
                            <option value="스포츠">스포츠</option>
                            <option value="기타">기타</option>
                        </Field>
                        <ErrorMessage name="category" component="div" className={styles.error} />
                    </div>

                    

                    <div>
                        <label htmlFor="price">가격</label>
                        <Field type="number" id="price" name="price" />
                        <ErrorMessage name="price" component="div" className={styles.error} />
                    </div>

                    <div>
                        <label htmlFor="description">자세한 설명</label>
                        <Field as="textarea" id="description" name="description" />
                        <ErrorMessage name="description" component="div" className={styles.error} />
                    </div>

                    

                    <button type="submit">판매하기</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Sell;
