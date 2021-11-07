import {
    Modal,
    Button
} from 'react-bootstrap';

import EditStudentForm from '../Forms/EditStudentForm';

function EditStudentModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    Edit student: <strong>{props.studentFullName}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditStudentForm onSuccess={props.onSuccess} />
            </Modal.Body>
            <Modal.Footer>
                <Button style={{marginRight: '6rem'}} variant="danger" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditStudentModal;