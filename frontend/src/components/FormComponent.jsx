import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().min(8, "Too Short!").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const FormComponent = () => {
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", values);
      alert(response.data.message);
    } catch (error) {
      setErrors({ api: error.response?.data?.error || "Server Error" });
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, isSubmitting }) => (
        <div className="form-container">
          <Form className="form">
            {errors.api && <div className="error-message">{errors.api}</div>}

            <div className="form-field">
              <label className="label">Name:</label>
              <Field type="text" name="name" className="input" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-field">
              <label className="label">Email:</label>
              <Field type="email" name="email" className="input" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default FormComponent;
