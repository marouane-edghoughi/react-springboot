import Button from 'react-bootstrap/Button';

import './Footer.css';

function Footer(props) {

    return(
        <>
            <div className="footer-bar justify-content-center text-center" >
                {props.numberOfStudents !== undefined && 
                    <div className="students-number">
                        {props.numberOfStudents}
                    </div>
                }
                <Button
                    onClick={props.showAddStudentModal}
                >
                    Add Student +
                </Button>
            </div>
        </>
    );
}

export default Footer;