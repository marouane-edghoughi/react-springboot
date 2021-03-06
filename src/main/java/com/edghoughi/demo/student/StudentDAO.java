package com.edghoughi.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class StudentDAO {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Student> selectAllStudents() {
        String sql = "" +
                "SELECT " +
                " student_id, " +
                " first_name, " +
                " last_name, " +
                " email, " +
                " gender " +
                "FROM student " +
                "ORDER BY last_name";
        // Convert database student table to a java object
        return jdbcTemplate.query(sql, mapStudentFromDb());
    }

    Student selectStudentById(UUID studentId) {
        String sql = "" +
                "SELECT " +
                " student_id, " +
                " first_name, " +
                " last_name, " +
                " email, " +
                " gender " +
                "FROM student " +
                "WHERE student_id = ?";

        return jdbcTemplate.queryForObject(
                sql,
                mapStudentFromDb(),
                studentId
        );
    }

    int insertStudent(UUID studentId, Student student) {
        String sql = "" +
                "INSERT INTO student (" +
                " student_id, " +
                " first_name, " +
                " last_name, " +
                " email, " +
                " gender)" +
                "VALUES(?, ?, ?, ?, ?)";

        return jdbcTemplate.update(
                sql,
                studentId,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getGender().name().toUpperCase()
        );
    }

    private RowMapper<Student> mapStudentFromDb() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);

            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String genderStr = resultSet.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);

            return new Student(
                    studentId,
                    firstName,
                    lastName,
                    email,
                    gender
            );
        };
    }

    int updateStudent(UUID studentId, Student student) {
        String sql = "" +
                "UPDATE student " +
                "SET " +
                " first_name = ?, " +
                " last_name = ?, " +
                " email = ? " +
                "WHERE student_id = ?";

        return jdbcTemplate.update(
                sql,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                studentId
        );
    }

    int removeStudent(UUID studentId) {
        String sql = "" +
                "DELETE " +
                " FROM student " +
                " WHERE student_id = (?)";

        return jdbcTemplate.update(
                sql,
                studentId
        );
    }
}
