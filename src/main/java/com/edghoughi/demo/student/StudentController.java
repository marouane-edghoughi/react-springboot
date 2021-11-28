package com.edghoughi.demo.student;

import com.edghoughi.demo.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
//        throw new ApiRequestException("Oops, cannot get all students.");
        return studentService.getAllStudents();
    }

    @GetMapping(path = "{studentId}")
    public Student getStudentById(@PathVariable UUID studentId) {
        return studentService.getStudentById(studentId);
    }

    @PostMapping
    public void addNewStudent(@RequestBody Student student) {
        studentService.addNewStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public int deleteStudent(@PathVariable("studentId") UUID studentId) {
        return studentService.deleteStudent(studentId);
    }

    @PutMapping(path = "{studentId}")
    public void updateStudent(@PathVariable("studentId") UUID studentId, @RequestBody Student student) {
        studentService.updateStudent(studentId, student);
    }
}
