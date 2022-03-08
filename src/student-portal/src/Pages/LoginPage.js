import { Formik } from 'formik';

import {
    Button,
    Form
} from 'react-bootstrap';

import Wrapper from "../Components/Wrapper";


function LoginPage(props) {

    return(
        <>
            <Wrapper>
                <div className="auth-form">
                    <h2>Log In</h2>
                    <Formik
                        initialValues={{
                            email: '', 
                            password: ''
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

                            return errors;
                        }}
                        onSubmit={(student, { setSubmitting }) => {
                            console.log(student.stringify);
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
                            <Form onSubmit={handleSubmit} className='form' >
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Enter email address" 
                                    />
                                </Form.Group>
                                {errors.email && touched.email && 
                                    <div className="field-error">
                                        {errors.email}
                                    </div>
                                }

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        name="password"
                                        type='password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder="Enter password"
                                    />
                                </Form.Group>
                                {errors.password && touched.password && 
                                    <div className="field-error">
                                        {errors.password}
                                    </div>
                                }

                                <Button fluid={true} variant="primary" type="submit" block disabled={isSubmitting} >
                                    Log in
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Wrapper>
        </>
    );
}

export default LoginPage;