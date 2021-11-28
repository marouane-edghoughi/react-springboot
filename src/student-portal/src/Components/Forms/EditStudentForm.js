import { Formik } from 'formik';

import {
    Form,
    Button
} from 'react-bootstrap';

import { updateStudent } from '../../client';

function EditStudentForm(props) {

    return (
        <Formik
            initialValues={{ 
                firstName: props.selectedStudent.firstName,
                lastName: props.selectedStudent.lastName, 
                email: props.selectedStudent.email
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
                updateStudent(props.selectedStudent.studentId, student).then(() => {
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
                handleSubmit,
                isSubmitting,
                isValid,
                dirty
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

                    <Button className="add-std-btn" variant="primary" type="submit" disabled={!(isValid && dirty) || isSubmitting} >
                        Save
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default EditStudentForm;