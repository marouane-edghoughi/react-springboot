import { useEffect, useState } from 'react';

import { 
  getAllStudents, 
  deleteStudent
} from '../client';

import { 
  Table,
  Spinner
} from 'react-bootstrap';

import Wrapper from './Wrapper';
import Avatar from './Avatar/Avatar';
import AddStudentModal from './Modal/AddStudentModal';
import Action from './Action/Action';
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
import EditStudentModal from './Modal/EditStudentModal';

function Dashboard() {

  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState({});

  const [isFetching, setIsFetching] = useState(false);

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  const [showEditStudentModal, setShowEditStudentModal] = useState(false);

  const toggleAddStudentModal = () => {
    setShowAddStudentModal(true);
  }

  const hideAddStudentModal = () => {
    setShowAddStudentModal(false);
  }

  const toggleEditStudentModal = (selectedStudent) => {
    setSelectedStudent(selectedStudent);
    setShowEditStudentModal(true);
  }

  const hideEditStudentModal = () => {
    setShowEditStudentModal(false);
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
      // const message = error.response.data.message;
      // const description = error.response.data.httpStatus;
      // SuccessNotification(message, 'just now', description);
      console.log(error.response);
    })
    .finally(() => {
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
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            
            <tbody>
              {students.map((student, index) => {
                return (
                  <tr key={index}>
                    <td><Avatar firstName={student.firstName} lastName={student.lastName}/></td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td><a href={"mailto:" + student.email}>{student.email}</a></td>
                    <td>{student.gender}</td>
                    <td>
                      <Action 
                        deleteStudent={() => {
                          deleteStudent(student.studentId)
                          .then(() => {
                            fetchStudents();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                        }}
                        studentFullName={student.firstName + ' ' + student.lastName}
                        showEditStudentModal={() => toggleEditStudentModal(student)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Wrapper>
        <EditStudentModal 
          selectedStudent={selectedStudent}
          show={showEditStudentModal}
          onHide={() => hideEditStudentModal()}
          onSuccess={() => {
            hideEditStudentModal();
            fetchStudents();
          }}
        />
        <AddStudentModal
          show={showAddStudentModal}
          onHide={() => hideAddStudentModal()}
          onSuccess={() => {
            hideAddStudentModal();
            fetchStudents();
          }}
        />
        <Footer showAddStudentModal={() => toggleAddStudentModal()} numberOfStudents={students.length} />
      </>
    );
  }
  
  return (
    <>
      <Wrapper>
        <h1>No Students Found</h1>
      </Wrapper>
      <AddStudentModal
        show={showAddStudentModal}
        onHide={() => hideAddStudentModal()}
        onSuccess={() => {
          hideAddStudentModal();
          fetchStudents();
        }}
      />
      <Footer showAddStudentModal={() => toggleAddStudentModal()} numberOfStudents={students.length} />
    </>
  );
}

export default Dashboard;