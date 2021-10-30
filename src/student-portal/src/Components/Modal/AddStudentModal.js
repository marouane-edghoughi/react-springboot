import {
    Modal,
    Button
} from 'react-bootstrap';

import AddStudentForm from '../Forms/AddStudentForm';

function AddStudentModal(props) {

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    Add new student
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddStudentForm />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddStudentModal;