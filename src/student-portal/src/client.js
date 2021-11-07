import axios from 'axios';

const checkStatus = response => {
    if (response.status === 200) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        response.data.json().then((e) => {
            error.error = e;
        });
        return Promise.reject(error);
    }
}

export const getAllStudents = () => 
    axios.get('api/students')
    .then(checkStatus);

export const addNewStudent = (student) => 
    axios.post('api/students', student)
    .then(checkStatus);

export const deleteStudent = (studentId) =>
    axios.delete('api/students/' + studentId)
    .then(checkStatus);