import { Formik } from 'formik';
import {
    Form,
    Button
} from 'react-bootstrap';

import { addNewStudent } from '../../client';

import './AddStudentForm.css';

function AddStudentForm(props) {

    return(
        <Formik
            initialValues={{ 
                firstName: '',
                lastName: '', 
                email: '', 
                gender: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.firstName) {
                    errors.firstName = 'First Name Required';
                }
                if (!values.lastName) {
                    errors.lastName = 'Last Name Required';
                }
                if (!values.email) {
                    errors.email = 'Email Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if (!values.gender) {
                    errors.gender = 'Gender Required';
                }
                return errors;
            }}
            onSubmit={(student, { setSubmitting }) => {
                addNewStudent(student).then(() => {
                    setSubmitting(false);
                    props.onSuccess();
                });
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                isValid,
                dirty,
                isSubmitting
                /* and other goodies */
            }) => (
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control 
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder="Enter first name" 
                        />
                    </Form.Group>
                    {errors.firstName && touched.firstName && 
                        <div className="field-error">
                            {errors.firstName}
                        </div>
                    }

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control 
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            placeholder="Enter last name" 
                        />
                    </Form.Group>
                    {errors.lastName && touched.lastName && 
                        <div className="field-error">
                            {errors.lastName}
                        </div>
                    }

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            name="email"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Enter first name" 
                        />
                    </Form.Group>
                    {errors.email && touched.email && 
                        <div className="field-error">
                            {errors.email}
                        </div>
                    }

                    <Form.Group className="mb-3" controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Check
                            name="gender"
                            id="radio-male"
                            type="radio"
                            label="Male"
                            value="MALE"
                            checked={values.gender === 'MALE'}
                            onChange={() => setFieldValue('gender', 'MALE')}
                        />
                        <Form.Check
                            name="gender"
                            id="radio-female"
                            type="radio"
                            label="Female"
                            value='FEMALE'
                            checked={values.gender === 'FEMALE'}
                            onChange={() => setFieldValue('gender', 'FEMALE')}
                        />
                    </Form.Group>
                    {errors.gender && touched.gender && 
                        <div className="field-error" >
                            {errors.gender}
                        </div>
                    }

                    <Button className="add-std-btn" variant="primary" type="submit" disabled={isSubmitting} >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default AddStudentForm;