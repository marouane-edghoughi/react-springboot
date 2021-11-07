import { useState } from 'react';

import {
    Button, OverlayTrigger, Popover
} from 'react-bootstrap';

import './Action.css';

function Action(props) {

    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <>
            <OverlayTrigger
                show={showOverlay}
                trigger="click"
                placement="top-end"
                overlay={
                    <Popover className="delete-popover">
                        <p>Are you sure you want to delete <strong>{props.studentFullName}</strong>?</p>
                        <div className="action-btn">
                            <Button
                                className="action"
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => setShowOverlay(false)}
                            >
                                No
                            </Button>
                            <Button
                                className="action mx-1"
                                size="sm"
                                onClick={props.deleteStudent}       
                            >
                                Yes
                            </Button>
                        </div>
                    </Popover>
                }
            >
                    <Button 
                        onClick={() => setShowOverlay(true)}
                        className="mx-1"
                        variant="outline-danger"
                    >
                        Delete
                    </Button>
            </OverlayTrigger>
            <Button 
                variant="primary" 
                onClick={props.showEditStudentModal}
            >
                Edit
            </Button>
        </>
    );
}

export default Action;