package com.edghoughi.demo.student;

import com.edghoughi.demo.EmailValidator;
import com.edghoughi.demo.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentDAO studentDAO;
    private final EmailValidator emailValidator = new EmailValidator();

    @Autowired
    public StudentService(StudentDAO studentDAO) {
        this.studentDAO = studentDAO;
    }

    List<Student> getAllStudents() {
        return studentDAO.selectAllStudents();
    }

    void addNewStudent(Student student) {
        addNewStudent(null, student);
    }

    void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

        // TODO: Validate Email
//        if (!emailValidator.test(student.getEmail())) {
//            throw new ApiRequestException(student.getEmail() + " is not Valid");
//        }
        // TODO: Verify that email is not taken

        studentDAO.insertStudent(newStudentId, student);
    }

    int deleteStudent(UUID studentId) {
        return studentDAO.removeStudent(studentId);
    }
}
