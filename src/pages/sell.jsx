// src/ProductForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductForm = () => {
  const initialValues = {
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive('Must be positive'),
    imageUrl: Yup.string().url('Invalid URL').required('Required'),
  });

  const onSubmit = (values) => {
    console.log('Form data', values);
    // Here you would usually send the data to the server
  };

  return (
    <div>
      <h1>Product Registration</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field as="textarea" id="description" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <Field type="number" id="price" name="price" />
            <ErrorMessage name="price" component="div" />
          </div>

          <div>
            <label htmlFor="imageUrl">Image URL</label>
            <Field type="text" id="imageUrl" name="imageUrl" />
            <ErrorMessage name="imageUrl" component="div" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProductForm;
