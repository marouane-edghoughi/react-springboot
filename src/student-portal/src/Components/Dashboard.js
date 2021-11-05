import { useEffect, useState } from 'react';

import { getAllStudents } from '../client';

import { 
  Table,
  Spinner
} from 'react-bootstrap';

import Wrapper from './Wrapper';
import Avatar from './Avatar/Avatar';
import AddStudentModal from './Modal/AddStudentModal';
import {
  // eslint-disable-next-line
  SuccessNotification,
  // eslint-disable-next-line
  InfosNotification,
  // eslint-disable-next-line
  WarningNotification,
  // eslint-disable-next-line
  ErrorNotification
} from './Notification/Notification';
import Footer from './Footer/Footer';

function Dashboard() {

  const [students, setStudents] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const showStudentModal = () => {
    setShowModal(true);
  }

  const hideStudentModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setIsFetching(true);
    getAllStudents()
    .then(response => {
      console.log(response.data);
      setStudents(response.data);
      setIsFetching(false);
    })
    .catch(error => {
      <ErrorNotification 
        notificationMessage={error.error}
        notificationTimestamp={error.error}
        notificationDescription={error}
      />
      console.log(error);
      setIsFetching(false);
    });
  }

  if (isFetching) {
    return(
      <Wrapper>
        <Spinner animation="border" variant="primary" />
      </Wrapper>
    );
  }

  if (students && students.length) {
    return (
      <>
        <Wrapper>
          <Table striped bordered hover className="students-table">
            <thead>
              <tr>
                <th></th>
                <th>Student ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
              </tr>
            </thead>
            
            <tbody>
              {students.map((student, index) => {
                return (
                  <tr key={index}>
                    <td><Avatar firstName={student.firstName} lastName={student.lastName}/></td>
                    <td>{student.studentId}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td><a href={"mailto:" + student.email}>{student.email}</a></td>
                    <td>{student.gender}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Wrapper>
        <AddStudentModal
          show={showModal}
          onHide={() => hideStudentModal()}
          onSuccess={() => {
            hideStudentModal();
            fetchStudents();
          }}
        />
        <Footer showAddStudentModal={() => showStudentModal()} numberOfStudents={students.length} />
      </>
    );
  }
  
  return (
    <>
      <Wrapper>
        <h1>No Students Found</h1>
      </Wrapper>
      <AddStudentModal
        show={showModal}
        onHide={() => hideStudentModal()}
        onSuccess={() => {
          hideStudentModal();
          fetchStudents();
        }}
      />
      <Footer showAddStudentModal={() => showStudentModal()} numberOfStudents={students.length} />
    </>
  );
}

export default Dashboard;