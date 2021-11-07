import { useState } from "react";

import { 
    Toast,
    ToastContainer
} from "react-bootstrap";

import { FaRegCheckCircle } from 'react-icons/fa';
import { GoInfo } from 'react-icons/go';
import { ImWarning } from 'react-icons/im';
import { VscError } from 'react-icons/vsc';

import './Notification.css';

const Notification = (props) => {

    const [showNotification, setShowNotification] = useState(true);

    return (
        <ToastContainer 
            className="notification p-3"
            position="top-end"
        >
            <Toast
                bg="light"
                onClose={() => setShowNotification(false)}
                show={showNotification}
                delay={4000}
                autohide
            >
                <Toast.Header>
                    {props.notificationIcon}
                    <strong className="me-auto" >{props.notificationMessage}</strong>
                    <small>{props.notificationTimestamp}</small>
                </Toast.Header>
                <Toast.Body>
                    {props.notificationDescription}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export const SuccessNotification = (message, timestamp, description) => {

    const successIcon = <FaRegCheckCircle className="icon success"/>;

    return (
        <Notification
            notificationIcon={successIcon}
            notificationMessage={message}
            notificationTimestamp={timestamp}
            notificationDescription={description}
        />
    );
}

export const InfosNotification = (props) => {

    const infosIcon = 
        <GoInfo 
            className="icon infos"
        />
    ;

    return (
        <Notification
            notificationIcon={infosIcon}
            notificationMessage={props.notificationMessage}
            notificationTimestamp={props.notificationTimestamp}
            notificationDescription={props.notificationDescription}
        />
    );
}

export const WarningNotification = (props) => {

    const warningIcon = 
        <ImWarning 
            className="icon warning"
        />
    ;

    return (
        <Notification
            notificationIcon={warningIcon}
            notificationMessage={props.notificationMessage}
            notificationTimestamp={props.notificationTimestamp}
            notificationDescription={props.notificationDescription}
        />
    );
}

export const ErrorNotification = (props) => {

    const errorIcon = 
        <VscError 
            className="icon error"
        />
    ;

    return (
        <Notification
            notificationIcon={errorIcon}
            notificationMessage={props.notificationMessage}
            notificationTimestamp={props.notificationTimestamp}
            notificationDescription={props.notificationDescription}
        />
    );
}