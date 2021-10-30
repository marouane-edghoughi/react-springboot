import axios from 'axios';

export const getAllStudents = () => axios.get('api/students');